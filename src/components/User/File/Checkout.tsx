import { useEffect, useState } from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { PiCopy } from "react-icons/pi";

import { useUserContext } from "../../../contexts/User";
import api from "../../../actions/api";
import { BankItem } from "../../../types";

import Input from "../../Common/Inputs/Input";
import Selection from "../../Common/Selection";
import PhoneNumberInput from "../../Common/Inputs/PhoneNumberInput";
import { toast } from "react-toastify";

interface CheckoutProps {
  orderPrice: number;
  firstName: string;
  lastName: string;
  phoneNumber: string | undefined;
  email: string;
  address: string;
  paymentMethod: string;
  selectedBank: BankItem | undefined;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPhoneNumber: (value: string | undefined) => void;
  setEmail: (value: string) => void;
  setAddress: (value: string) => void;
  setPaymentMethod: (value: string) => void;
  setSelectedBank: (value: BankItem | undefined) => void;
}

export default function Checkout({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  paymentMethod,
  selectedBank,
  setFirstName,
  setLastName,
  setEmail,
  setAddress,
  setPhoneNumber,
  setPaymentMethod,
  setSelectedBank,
  orderPrice,
}: CheckoutProps) {
  const { currentUser } = useUserContext();

  const paymentMethods = ["Balance", "Bank Transfer", "Credit Card"];

  const [banks, setBanks] = useState<BankItem[]>([]);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  const fetchBanks = async () => {
    try {
      const response = await api.get("/api/bank/all");
      setBanks(response.data);
      setSelectedBank(response.data[0]);
    } catch (error: any) {
      console.log("error.response.data", error.response.data);
    }
  };

  useEffect(() => {
    if (paymentMethod == "Bank Transfer") {
      fetchBanks();
    }
  }, [paymentMethod]);

  const handleChangeBank = (bankName: string) => {
    const newBank = banks.find((bank) => bank.bankName === bankName);
    if (newBank) {
      setSelectedBank(newBank);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      {/* Billing */}
      <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
        <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-bold">
          Billing
        </div>
        <div className="flex flex-col gap-4 p-6">
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
            <PhoneNumberInput
              label="Phone Number"
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              error=""
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
        <div className="flex gap-2 p-6 border-b border-dashed border-light-gray-1">
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
            <table className="no-head text-sm">
              <tbody>
                <tr>
                  <td className="w-[40%] label">Balance Before Order</td>
                  <td>{currentUser?.balance}</td>
                </tr>
                <tr>
                  <td className="label">Order Price</td>
                  <td>{orderPrice}</td>
                </tr>
                <tr>
                  <td className="label">Balance After Order</td>
                  <td>
                    {(currentUser?.balance ?? 0) > orderPrice
                      ? (currentUser?.balance ?? 0) - orderPrice
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {paymentMethod === "Bank Transfer" && banks.length > 0 && (
          <div className="p-6 border-b border-dashed border-light-gray-1">
            <Selection
              label="Bank"
              items={banks.map((bank) => bank.bankName)}
              selectedItem={selectedBank?.bankName ?? banks[0].bankName}
              disabled={false}
              onChange={handleChangeBank}
            />
          </div>
        )}

        {selectedBank && (
          <div className="flex flex-col">
            {/* Select the method to get bank information */}
            <div className="p-6 border-b border-dashed border-light-gray-1 flex flex-col gap-1">
              <label htmlFor="" className="text-dark text-sm text-left">
                To Make a transfer
              </label>
              <div className="flex items-center gap-4 divide-x-2 divide-light-gray-3">
                <button
                  className={`flex items-center gap-2 px-2 py-1 border-none bg-transparent focus:border-none focus:outline-none cursor-pointer ${
                    showQrCode ? "text-dark" : "text-dark-blue"
                  }`}
                  onClick={() => setShowQrCode(false)}
                >
                  <IoMdRadioButtonOn
                    className={`text-xl ${
                      showQrCode ? "text-light-gray-3" : "text-dark-blue"
                    }`}
                  />
                  Copy Information
                </button>
                <button
                  className={`flex items-center gap-2 px-2 py-1 border-none bg-transparent focus:border-none focus:outline-none cursor-pointer ${
                    showQrCode ? "text-dark-blue" : "text-dark"
                  }`}
                  onClick={() => setShowQrCode(true)}
                >
                  <IoMdRadioButtonOn
                    className={`text-xl ${
                      showQrCode ? "text-dark-blue" : "text-light-gray-3"
                    }`}
                  />
                  Or Scan QR Code
                </button>
              </div>
            </div>

            <div className="p-6 border-b border-dashed border-light-gray-1 flex flex-col gap-1">
              {showQrCode ? (
                <div className="flex flex-col gap-1 items-start">
                  <label htmlFor="qr-code">Code QR</label>
                  <img
                    id="qr-code"
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/${selectedBank.qrCode?.replace("uploads", "")}`}
                    alt="QR code"
                    className="border border-light-gray-3 rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <table className="w-full no-head">
                    <tbody>
                      <tr>
                        <td className="label">Bank Name</td>
                        <td>{selectedBank.bankName}</td>
                      </tr>
                      <tr>
                        <td className="label">Account Holder</td>
                        <td>{selectedBank.accountOwner}</td>
                      </tr>
                      <tr>
                        <td className="label">Account Number</td>
                        <td>{selectedBank.accountNumber}</td>
                      </tr>
                      <tr>
                        <td className="label">RIB</td>
                        <td>
                          <div className="flex items-center justify-between">
                            {selectedBank.rib}
                            {selectedBank.rib && (
                              <button
                                onClick={() => {
                                  navigator.clipboard
                                    .writeText(selectedBank.rib ?? "")
                                    .then(() => {
                                      toast.success("RIB copied to clipboard!"); // Optional: Show a success message
                                    })
                                    .catch((err) => {
                                      toast.error("Failed to copy: ", err); // Handle errors if any
                                    });
                                }}
                                className="flex items-center gap-2 rounded-full text-xs px-2 py-0.5 border border-light-gray-3 hover:border-dark-blue hover:text-dark-blue"
                              >
                                <PiCopy className="text-sm" />
                                Copy
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="label">IBAN</td>
                        <td>{selectedBank.iban}</td>
                      </tr>
                      <tr>
                        <td className="label">Code SWIFT</td>
                        <td>{selectedBank.swift}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
