import { JSX, useEffect, useState } from "react";

import { IoCloseCircleOutline } from "react-icons/io5";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import Input from "../Common/Inputs/Input";
import FileUpload from "../Common/Inputs/FileUpload";
import { PiPlusCircle } from "react-icons/pi";
import HorizontalStep from "./HorizontalStep";
import { formApi } from "../../actions/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PaymentItem } from "../../types";

interface EditPaymentProps {
  paymentData: PaymentItem;
  payments: PaymentItem[];
  setPayments: (updatedPayments: PaymentItem[]) => void;
  onClose: () => void;
}

const steps = [
  { label: "General", number: 1 },
  { label: "Details", number: 2 },
  { label: "Done", number: 3 },
];

const EditPayment = ({
  paymentData,
  // payments,
  // setPayments,
  onClose,
}: EditPaymentProps): JSX.Element => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);

  const [bankName, setBankName] = useState<string>("");
  const [accountOwner, setAccountOwner] = useState<string | undefined>("");
  const [bankLogo, setBankLogo] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState<File | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | undefined>("");
  const [iban, setIban] = useState<string | undefined>("");
  const [rib, setRib] = useState<string | undefined>("");
  const [swift, setSwift] = useState<string | undefined>("");

  useEffect(() => {
    if (paymentData) {
      setBankName(paymentData.bankName);
      setAccountOwner(paymentData.accountOwner);
      setAccountNumber(paymentData.accountNumber);
      setIban(paymentData.iban);
      setRib(paymentData.rib);
      setSwift(paymentData.swift);
    }
  }, [paymentData]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0] || null;
    if (type === "Bank Logo") {
      setBankLogo(file);
    } else if (type === "QR Code") {
      setQrCode(file);
    }
  };

  const handleCloseFile = (type: string) => {
    if (type === "Bank Logo") {
      setBankLogo(null);
    } else if (type === "QR Code") {
      setQrCode(null);
    }
  };

  const handleEditPayment = async () => {
    try {
      const formData = new FormData();
      formData.append("bankName", bankName);
      formData.append("accountOwner", accountOwner ?? "");
      formData.append("accountNumber", accountNumber ?? "");
      formData.append("rib", rib ?? "");
      formData.append("iban", iban ?? "");
      formData.append("swift", swift ?? "");
      if (bankLogo) {
        formData.append("bankLogo", bankLogo);
      }
      if (qrCode) {
        formData.append("qrCode", qrCode);
      }

      await formApi.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/edit/${paymentData._id}`,
        formData
      );
      navigate("/admin/payments?page=0");

      //   toast.success("Created Payment method successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setStep(3);
  };

  return (
    <div className="flex flex-col w-[350px] items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center justify-between gap-2 p-4 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray-3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Edit Payment
          </div>
          <IoCloseCircleOutline
            onClick={onClose}
            className="text-2xl cursor-pointer"
          />
        </div>

        <HorizontalStep steps={steps} currentStep={step} />

        {step === 1 && (
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col items-start gap-4 p-6 border-b border-dashed border-light-gray-3">
              <Input
                label="Bank Name"
                value={bankName}
                type="text"
                error=""
                onChange={(e) => setBankName(e.target.value)}
              />
              <Input
                label="Account Owner"
                value={accountOwner}
                type="text"
                error=""
                onChange={(e) => setAccountOwner(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start gap-4 p-6 border-b border-dashed border-light-gray-3">
              <FileUpload
                label="Bank Logo"
                fileName={bankLogo?.name}
                accept="image/*"
                onChange={(e) => handleFileChange(e, "Bank Logo")}
                handleClose={() => handleCloseFile("Bank Logo")}
                error=""
              />
              <FileUpload
                label="QR Code"
                fileName={qrCode?.name}
                accept="image/*"
                error=""
                onChange={(e) => handleFileChange(e, "QR Code")}
                handleClose={() => handleCloseFile("QR Code")}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full p-6 border-b border-dashed border-light-gray-3 flex flex-col gap-4">
            <Input
              label="Account Number"
              value={accountNumber}
              type="text"
              error=""
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <Input
              label="RIB"
              value={rib}
              type="text"
              error=""
              onChange={(e) => setRib(e.target.value)}
            />
            <Input
              label="IBAN"
              value={iban}
              type="text"
              error=""
              onChange={(e) => setIban(e.target.value)}
            />
            <Input
              label="SWIFT"
              value={swift}
              type="text"
              error=""
              onChange={(e) => setSwift(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="w-full p-6 border-b border-dashed border-light-gray-3">
            <div className="w-full bg-light-green-2 border border-light-green-1 text-green p-2 rounded-lg text-sm">
              Your Payment Method Edited Successfully
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full p-6 text-sm text-dark-blue">
          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="w-full border border-dark-blue rounded-full flex items-center justify-center gap-2"
            >
              Next
              <GoArrowRight />
            </button>
          )}

          {step === 2 && (
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="border border-dark-blue rounded-full flex items-center justify-center gap-2"
              >
                <GoArrowLeft />
                Back
              </button>
              <button
                onClick={handleEditPayment}
                className="flex-1 bg-dark-blue text-white rounded-full flex items-center justify-center gap-2"
              >
                <PiPlusCircle className="text-xl" />
                Edit payment
              </button>
            </div>
          )}

          {step === 3 && (
            <button
              onClick={() => setStep(1)}
              className="w-full bg-dark-blue text-white rounded-full flex items-center justify-center gap-2"
            >
              <PiPlusCircle className="text-xl" />
              Edit Another Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPayment;
