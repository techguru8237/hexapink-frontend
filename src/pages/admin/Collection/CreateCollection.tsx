import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PiCheckBold } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";

import AdminHeader from "../../../components/Dashboard/AdminHeader";
import VerticalStepBar from "../../../components/NewFile/VerticalStepbar";
import GeneralInformation from "../../../components/Collection/GeneralInformation";
import CountrySelect from "../../../components/Common/CountrySelect";

const steps = [
  { label: "General", step: 1 },
  { label: "Columns", step: 2 },
  { label: "Tables", step: 3 },
  { label: "Steps", step: 4 },
];

const types = ["Business", "Client"];

export default function CreateCollection() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(types[0]);
  const [description, setDescription] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleClickBackStep = () => {
    if (step === 1) {
      navigate("/admin/collections");
    } else {
      setStep(step - 1);
    }
  };

  const handleClickNextStep = () => {
    if (step === steps.length) {
      // Create collection
      console.log("Create collection");
    } else {
      setStep(step + 1);
    }
  };

  console.log('step', step)

  return (
    <div>
      <AdminHeader icon={<FaRegFolderOpen />} label="New Collection" />

      <div className="flex bg-light-gray">
        <div className="border-r border-light-gray1 px-12 py-8">
          <VerticalStepBar steps={steps} stepNumber={step} />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-start gap-2 px-8 py-4 border-b border-light-gray3">
            <div
              onClick={handleClickBackStep}
              className="flex items-center gap-1 border border-dark hover:border-dark-blue hover:text-dark-blue rounded-full px-4 py-2 cursor-pointer"
            >
              <HiArrowNarrowLeft />
              <span>{step === 1 ? "Back to Collections" : "Back"}</span>
            </div>
            <div
              onClick={handleClickNextStep}
              className={`flex items-center gap-1 border border-dark hover:border-dark-blue hover:text-dark-blue rounded-full px-4 py-2 cursor-pointer ${
                step === steps.length ? "flex-row-reverse" : ""
              }`}
            >
              <span>
                {step === steps.length ? "Create Collections" : "Next"}
              </span>
              {step === steps.length ? <PiCheckBold /> : <HiArrowNarrowRight />}
            </div>
          </div>

          <div className="p-8 flex flex-col gap-8">
            <GeneralInformation
              title={title}
              description={description}
              fileName={file?.name}
              type={type}
              setTitle={setTitle}
              setFile={setFile}
              setType={setType}
              setDescription={setDescription}
            />

            <CountrySelect selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
          </div>
        </div>
      </div>
    </div>
  );
}
