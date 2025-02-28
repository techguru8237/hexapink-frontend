import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PiCheckBold } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { BankItem, Collection, Column, Step } from "../../../types";
import VerticalStepBar from "../../../components/Collection/VerticalStepbar";
import CountrySelect from "../../../components/Common/CountrySelect";
import TypeSelect from "../../../components/Admin/User/TypeSelect";
import CollectionSelect from "../../../components/User/File/CollectionSelect";
import ColumnBuild from "../../../components/User/File/ColumnBuild";
import Checkout from "../../../components/User/File/Checkout";
import useCartStore from "../../../Store/useCartStore";
import UserHeader from "../../../components/User/UserHeader";
import CollectionView from "../../../components/User/File/CollectionView";

const types = ["Business", "Client"];
const defaultStep = { id: 1, name: "Collection" };
const paymentMethods = ["Balance", "Bank Transfer", "Credit Card"];

export default function CreateFile() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCartIds = location.state;
  const { carts, setCarts } = useCartStore((state) => state);

  const [steps, setSteps] = useState<Step[]>([defaultStep]);
  const [step, setStep] = useState(1);
  const [type, setType] = useState(types[0]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<
    Collection | undefined
  >(undefined);
  const [volumn, setVolumn] = useState<number>(0);
  const [selectedStepColumns, setSelectedStepColumns] = useState<Column[]>([]);
  const [selectedData, setSelectedData] = useState<
    Record<string, { value: any; stepName: string }>
  >({});

  // Checkout Status
  // const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  // const [email, setEmail] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0]);
  const [selectedBank, setSelectedBank] = useState<BankItem>();

  useEffect(() => {
    if (selectedCartIds && carts.length) {
      setSteps([...steps, { id: 2, name: "Checkout" }]);
      setStep(2);
      const selectedCarts = carts.filter((cart) =>
        selectedCartIds.includes(cart.id)
      );
      const totalVolum = selectedCarts.reduce(
        (amount, cart) => amount + cart.volumn,
        0
      );
      setVolumn(totalVolum);
    }
  }, [selectedCartIds, carts]);

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
    } else if (step === steps.length - 1 && selectedCollection) {
      const id = Math.random().toString(36).slice(2, 9);
      const newCart = {
        id,
        type,
        countries: selectedCountries,
        collection: selectedCollection,
        columns: selectedData,
        volumn,
      };
      setCarts(newCart);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleColumnChange = (
    columnName: string,
    selectedValue: any,
    stepName: string
  ) => {
    setSelectedData((prev) => ({
      ...prev,
      [columnName]: { value: selectedValue, stepName: stepName },
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <UserHeader icon={<FaRegFolderOpen />} label="New File" />
      <div className="h-full flex bg-light-gray overflow-y-auto">
        <div className="px-12 py-8">
          <VerticalStepBar steps={steps} stepNumber={step} />
        </div>
        <div className="min-w-min flex flex-1 flex-col border-l border-light-gray-1">
          <div className="flex items-center justify-between px-8 py-4 border-b border-light-gray-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClickBackStep}
                className="flex items-center gap-1 border border-dark hover:border-dark-blue hover:text-dark-blue rounded-full px-4 py-2 cursor-pointer"
              >
                <GoArrowLeft />
                <span>{step === 1 ? "Back to Collections" : "Back"}</span>
              </button>
              {steps.length > 1 && (
                <button
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
                </button>
              )}
            </div>
            {selectedCollection && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(steps.length)}
                  className="bg-dark-blue text-white rounded-full flex items-center justify-center gap-2"
                >
                  <span>Skip to Checkout</span> <GoArrowRight />
                </button>
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
                  setColumns={
                    (columnName, selectedValue) =>
                      handleColumnChange(
                        columnName,
                        selectedValue,
                        steps[step - 1].name
                      ) // Pass step name
                  }
                />
              ))}
            </div>
            {step > 1 && step === steps.length && (
              <Checkout
                // firstName={firstName}
                // setFirstName={setFirstName}
                // lastName={lastName}
                // setLastName={setLastName}
                // phoneNumber={phoneNumber}
                // setPhoneNumber={setPhoneNumber}
                // email={email}
                // setEmail={setEmail}
                // address={address}
                // setAddress={setAddress}
                orderPrice={1250}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
              />
            )}
          </div>
        </div>
        {selectedCollection && (
          <div className="w-80 p-4 border-l border-light-gray-1">
            <CollectionView
              data={selectedCollection}
              steps={steps.slice(1, -1).map((step) => step.name)}
              columns={selectedData}
              volumn={volumn}
              setVolumn={setVolumn}
            />
          </div>
        )}
      </div>
    </div>
  );
}
