import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoMdRadioButtonOn } from "react-icons/io";
import { PiCopy } from "react-icons/pi";
import { useUserContext } from "../../../contexts/User";
import api from "../../../actions/api";
import { BankItem } from "../../../types";
import Selection from "../../Common/Selection";

interface CheckoutProps {
  orderPrice: number;
  paymentMethod: string;
  selectedBank: BankItem | undefined;
  setPaymentMethod: (value: string) => void;
  setSelectedBank: (value: BankItem | undefined) => void;
}

export default function Checkout({
  paymentMethod,
  selectedBank,
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`${label} copied to clipboard!`))
      .catch(() => toast.error(`Failed to copy ${label}`));
  };

  return (
    <div className="flex flex-col gap-4 p-8">
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
        {selectedBank && (
          <div className="flex flex-col p-6">
            <table className="w-full no-head">
              <tbody>
                {[
                  "bankName",
                  "accountOwner",
                  "accountNumber",
                  "rib",
                  "iban",
                  "swift",
                ].map((key) => (
                  <tr key={key}>
                    <td className="label">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </td>
                    <td>
                      <div className="flex items-center justify-between">
                        {selectedBank[key as keyof BankItem]}
                        {selectedBank[key as keyof BankItem] && (
                          <button
                            onClick={() =>
                              copyToClipboard(
                                selectedBank[key as keyof BankItem] ?? "",
                                key
                              )
                            }
                            className="flex items-center gap-2 rounded-full text-xs px-2 py-0.5 border border-light-gray-3 hover:border-dark-blue hover:text-dark-blue"
                          >
                            <PiCopy className="text-sm" /> Copy
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
