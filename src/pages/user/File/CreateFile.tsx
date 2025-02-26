import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiCheckBold } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Collection, Column, Step } from "../../../types";
import AdminHeader from "../../../components/Admin/AdminHeader";
import VerticalStepBar from "../../../components/Collection/VerticalStepbar";
import CountrySelect from "../../../components/Common/CountrySelect";
import TypeSelect from "../../../components/User/TypeSelect";
import CollectionSelect from "../../../components/File/CollectionSelect";
import ColumnBuild from "../../../components/File/ColumnBuild";
import Checkout from "../../../components/File/Checkout";

const types = ["Business", "Client"];
const defaultStep = { id: 1, name: "Collection" };

export default function CreateFile() {
  const navigate = useNavigate();

  const [steps, setSteps] = useState<Step[]>([defaultStep]);
  const [step, setStep] = useState(1);
  const [type, setType] = useState(types[0]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<
    Collection | undefined
  >(undefined);
  const [selectedStepColumns, setSelectedStepColumns] = useState<Column[]>([]);
  const [selectedData, setSelectedData] = useState<Record<string, any>>({}); // Modified type

  useEffect(() => {
    if (selectedCollection && Array.isArray(selectedCollection.columns)) {
      const stepItems = Array.from(
        new Set(selectedCollection.columns.map((col) => col.stepName))
      ).map((name, index) => ({ id: index + 2, name: name || "" }));

      setSteps([
        defaultStep,
        ...stepItems,
        { id: stepItems.length + 2, name: "Checkout" },
      ]);
    }
  }, [selectedCollection]);

  useEffect(() => {
    if (selectedCollection) {
      const relatedColumns = selectedCollection.columns.filter(
        (col) => col.stepName === steps[step - 1].name
      );
      setSelectedStepColumns(relatedColumns);
    }
  }, [step, selectedCollection, steps]);

  const handleClickBackStep = () => {
    if (step === 1) {
      navigate("/admin/collections");
    } else {
      setStep(step - 1);
    }
  };

  const handleClickNextStep = async () => {
    if (step === steps.length) {
      // Handle final step logic here
      console.log("Final step reached. Saving data:", selectedData);
    } else {
      setStep(step + 1);
    }
  };

  const handleColumnChange = (columnName: string, selectedValue: any) => {
    // modified function
    setSelectedData((prev) => ({ ...prev, [columnName]: selectedValue }));
  };

  return (
    <div className="h-full flex flex-col">
      <AdminHeader icon={<FaRegFolderOpen />} label="New Collection" />
      <div className="h-full flex bg-light-gray overflow-y-auto">
        <div className="px-12 py-8">
          <VerticalStepBar steps={steps} stepNumber={step} />
        </div>
        <div className="min-w-min flex flex-1 flex-col border-l border-light-gray-1">
          <div className="flex items-center justify-start gap-2 px-8 py-4 border-b border-light-gray-3">
            <div
              onClick={handleClickBackStep}
              className="flex items-center gap-1 border border-dark hover:border-dark-blue hover:text-dark-blue rounded-full px-4 py-2 cursor-pointer"
            >
              <GoArrowLeft />
              <span>{step === 1 ? "Back to Collections" : "Back"}</span>
            </div>
            {steps.length > 1 && (
              <div
                onClick={handleClickNextStep}
                className={`flex items-center gap-1 border rounded-full px-4 py-2 cursor-pointer ${
                  step === steps.length
                    ? "flex-row-reverse bg-dark-blue text-white"
                    : "border-dark hover:border-dark-blue hover:text-dark-blue"
                }`}
              >
                <span>
                  {step === steps.length
                    ? "Confirm Orders"
                    : step === steps.length - 1
                    ? "Go to Checkout"
                    : "Next"}
                </span>
                {step === steps.length ? <PiCheckBold /> : <GoArrowRight />}
              </div>
            )}
          </div>
          <div className="p-4">
            {step === 1 && (
              <div className="flex flex-col gap-8 p-8">
                <TypeSelect
                  selectedItem={type}
                  onChange={setType}
                  disabled={false}
                  items={["Particular", "Business"]}
                />
                <CountrySelect
                  selectedCountries={selectedCountries}
                  setSelectedCountries={setSelectedCountries}
                />
                <CollectionSelect
                  type={type}
                  countries={selectedCountries}
                  selectedCollection={selectedCollection}
                  setSelectedCollection={setSelectedCollection}
                />
              </div>
            )}
            <div className="flex flex-col gap-4">
              {selectedStepColumns.map((column, index) => (
                <ColumnBuild
                  key={column.name}
                  step={step}
                  index={index}
                  column={column}
                  selectedData={selectedData}
                  setColumns={(selectedValue) =>
                    handleColumnChange(column.name, selectedValue)
                  }
                />
              ))}
            </div>
            {step > 1 && step === steps.length && (
              <Checkout
                orderPrice={1250}
                // data={selectedData} // Pass the collected data to Checkout
              />
            )}
          </div>
        </div>
        {selectedCollection && (
          <div className="w-96 p-4 border-l border-light-gray-1">
            {/* <CollectionView data={selectedCollection} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
