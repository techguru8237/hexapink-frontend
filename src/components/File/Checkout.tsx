import { useState } from "react";
import { useUserContext } from "../../contexts/User";
import Input from "../Common/Inputs/Input";
import Selection from "../Common/Selection";

interface CheckoutProps {
  orderPrice: number;
}

export default function Checkout({
  orderPrice,
}: CheckoutProps) {
  const { currentUser } = useUserContext();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
  
    const paymentMethods = ["Balance", "Bank Transfer", "Credit Card"];
    const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0]);

  return (
    <div className="flex flex-col gap-4 p-8">
      {/* Billing */}
      <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
        <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-bold">
          Billing
        </div>
        <div className="fle`x flex-col gap-4 p-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              value={firstName}
              error=""
              disabled={false}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              type="text"
              value={lastName}
              error=""
              disabled={false}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              label="Phone"
              type="text"
              value={phone}
              error=""
              disabled={false}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              error=""
              disabled={false}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Input
            label="Address"
            type="text"
            value={address}
            error=""
            disabled={false}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      {/* Payment */}
      <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
        <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-bold">
          Payment
        </div>
        <div className="flex flex-col gap-2 p-6 border-b border-dashed border-light-gray-1">
          <Selection
            label="Payment Method"
            items={paymentMethods}
            selectedItem={paymentMethod}
            disabled={false}
            onChange={(value) => setPaymentMethod(value)}
          />
        </div>
        {paymentMethod === "Balance" && (
          <div className="flex flex-col gap-2 p-6">
            <table className="balance-table text-sm">
              <tr>
                <td className="w-[40%]">Balance Before Order</td>
                <td>{currentUser?.balance}</td>
              </tr>
              <tr>
                <td>Order Price</td>
                <td>{orderPrice}</td>
              </tr>
              <tr>
                <td>Balance After Order</td>
                <td>
                  {(currentUser?.balance ?? 0) > orderPrice
                    ? (currentUser?.balance ?? 0) - orderPrice
                    : 0}
                </td>
              </tr>
            </table>
          </div>
        )}

        {paymentMethod === "Bank Transfer" && (
          <div className="flex flex-col gap-2 p-6">
            <table className="balance-table text-sm">
              <tr>
                <td className="w-[40%]">Balance Before Order</td>
                <td>{currentUser?.balance}</td>
              </tr>
              <tr>
                <td>Order Price</td>
                <td>{orderPrice}</td>
              </tr>
              <tr>
                <td>Balance After Order</td>
                <td>
                  {(currentUser?.balance ?? 0) > orderPrice
                    ? (currentUser?.balance ?? 0) - orderPrice
                    : 0}
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
