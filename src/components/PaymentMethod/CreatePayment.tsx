import { JSX, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Input from "../Common/Inputs/Input";
import FileUpload from "../Common/Inputs/FileUpload";
import { PiPlusCircle } from "react-icons/pi";
import HorizontalStep from "./HorizontalStep";
import { formApi } from "../../actions/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CreatePaymentProps {
  onClose: () => void;
}

const steps = [
  { label: "General", number: 1 },
  { label: "Bank", number: 2 },
  { label: "Stripe", number: 3 },
  { label: "Done", number: 4 },
];

const CreatePayment = ({ onClose }: CreatePaymentProps): JSX.Element => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [bankName, setBankName] = useState<string>("");
  const [accountOwner, setAccountOwner] = useState<string>("");
  const [bankLogo, setBankLogo] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState<File | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [rib, setRib] = useState<string>("");
  const [swift, setSwift] = useState<string>("");
  const [stripePublicKey, setStripePublicKey] = useState<string>("");
  const [stripeSecretKey, setStripeSecretKey] = useState<string>("");

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

  const handleCreatePaymentMethod = async () => {
    try {
      const formData = new FormData();
      formData.append("bankName", bankName);
      formData.append("accountOwner", accountOwner);
      formData.append("accountNumber", accountNumber);
      formData.append("rib", rib);
      formData.append("iban", iban);
      formData.append("swift", swift);
      formData.append("stripePublicKey", stripePublicKey);
      formData.append("stripeSecretKey", stripeSecretKey);
      if (bankLogo) {
        formData.append("bankLogo", bankLogo);
      }
      if (qrCode) {
        formData.append("qrCode", qrCode);
      }

      await formApi.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bank/create`,
        formData
      );
      navigate("/admin/payments?page=0");
      toast.success("Created Payment method successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setStep(4);
  };

  return (
    <div className="flex flex-col w-[350px] items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center justify-between gap-2 p-4 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray-3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Create New Payment
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
          <div className="w-full p-6 border-b border-dashed border-light-gray-3 flex flex-col gap-4">
            <Input
              label="Public Key"
              value={stripePublicKey}
              type="text"
              error=""
              onChange={(e) => setStripePublicKey(e.target.value)}
            />
            <Input
              label="Secret Key"
              value={stripeSecretKey}
              type="text"
              error=""
              onChange={(e) => setStripeSecretKey(e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="w-full p-6 border-b border-dashed border-light-gray-3">
            <div className="w-full bg-light-green-2 border border-light-green-1 text-green p-2 rounded-lg text-sm">
              Your Payment Method Was Created Successfully
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-2 p-6 text-sm text-dark-blue">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="border border-dark-blue rounded-full flex items-center justify-center gap-2"
            >
              <GoArrowLeft />
              Back
            </button>
          )}

          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full border border-dark-blue rounded-full flex items-center justify-center gap-2 p-2"
            >
              Next
              <GoArrowRight />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleCreatePaymentMethod}
              className="flex-1 bg-dark-blue text-white rounded-full flex items-center justify-center gap-2"
            >
              <PiPlusCircle className="text-xl" />
              Create Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;
