import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { PiCheckBold } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import api from "../../../actions/api";
import { useUserContext } from "../../../contexts/User";
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

import CartAddIcon from "../../../assets/icons/ShoppingCart.svg";
import { getTotalLeads } from "../../../actions/collection";
import useFileDataStore from "../../../Store/userFileDataStore";

const types = ["Business", "Client"];
const defaultStep = { id: 1, name: "Collection" };
const paymentMethods = ["Balance", "Bank Transfer", "Credit Card"];

export default function CreateFile() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCartIds = location.state;
  const { currentUser } = useUserContext();
  const { carts, setCarts, removeCarts } = useCartStore((state) => state);
  const { setFileData } = useFileDataStore((state) => state);

  const [steps, setSteps] = useState<Step[]>([defaultStep]);
  const [step, setStep] = useState(1);
  const [type, setType] = useState(types[0]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<
    Collection | undefined
  >(undefined);
  const [volume, setVolume] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedStepColumns, setSelectedStepColumns] = useState<Column[]>([]);
  const [selectedData, setSelectedData] = useState<
    Record<string, { value: any; stepName: string }>
  >({});
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0]);
  const [selectedBank, setSelectedBank] = useState<BankItem>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [loading, setLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (selectedCartIds && selectedCartIds.length && carts.length) {
      setSteps([defaultStep, { id: 2, name: "Checkout" }]);
      setStep(2);
      const selectedCarts = carts.filter((cart) =>
        selectedCartIds.includes(cart.id)
      );
      const totalPrice = selectedCarts.reduce(
        (amount, cart) => amount + cart.volume * (cart.unitPrice ?? 1),
        0
      );
      setTotalPrice(totalPrice);
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

      const fetchTotalLeads = async () => {
        const response = await getTotalLeads(selectedCollection);
        setVolume(response);
      };
      const fetchRelatedTables = async () => {
        const tableIds = selectedCollection.columns.map((col) =>
          col.tableColumns?.map((tc) => tc.tableId)
        );
        const response = await api.post("/api/table/tables", { tableIds });
        if (response.status === 200) {
          setFileData(response.data);
        }
      };
      fetchTotalLeads();
      fetchRelatedTables();
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

  const handleClickBackStep = useCallback(() => {
    if (step === 1) {
      navigate("/admin/collections");
    } else {
      setStep(step - 1);
    }
  }, [step, navigate]);

  const handleClickNextStep = useCallback(async () => {
    if (step === steps.length) {
      let files = [];
      if (selectedCartIds) {
        files = carts.map((cart) => ({
          title: cart.title,
          type: cart.type,
          countries: cart.countries,
          collectionId: cart.collectionId,
          image: cart.image,
          unitPrice: cart.unitPrice,
          volume: cart.volume,
          columns: JSON.stringify(cart.columns),
          data: JSON.stringify(cart.filteredData),
        }));
      } else {
        if (selectedCollection) {
          files.push({
            type,
            countries: selectedCountries,
            title: selectedCollection.title,
            collectionId: selectedCollection._id,
            image: selectedCollection.image,
            unitPrice: selectedCollection.fee,
            columns: JSON.stringify(selectedData),
            data: JSON.stringify(filteredData),
            volume,
          });
        }
      }

      try {
        const volume = files.reduce((amount, file) => amount + file.volume, 0);
        const prix = files.reduce(
          (amount, file) => amount + file.volume * (file.unitPrice || 1),
          0
        );

        if (paymentMethod === "Credit Card") {
          const response = await api.post("/api/order/create-intent", {
            files: JSON.stringify(files),
            volume,
            prix,
          });
          const { clientSecret } = response.data;

          if (!stripe || !elements) {
            return;
          }

          const cardElement = elements.getElement(CardElement);
          const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement!,
              billing_details: {
                name: "User Name", // Replace with actual user name
              },
            },
          });

          if (paymentResult.error) {
            console.error("Payment failed:", paymentResult.error.message);
            return;
          } else if (paymentResult.paymentIntent?.status === "succeeded") {
            await createOrder(files, volume, prix);
          }
        } else if (paymentMethod === "Balance") {
          if ((currentUser?.balance ?? 0) < prix) {
            console.error("Insufficient balance");
            return;
          }
          await createOrder(files, volume, prix);
        } else {
          await createOrder(files, volume, prix);
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      setStep(step + 1);
    }
  }, [
    step,
    steps,
    selectedCartIds,
    carts,
    selectedCollection,
    type,
    selectedCountries,
    selectedData,
    volume,
    paymentMethod,
    stripe,
    elements,
    currentUser,
    navigate,
    removeCarts,
  ]);

  const handleAddCart = useCallback(() => {
    if (selectedCollection) {
      if (volume == 0) {
        setErrors((prev) => ({ ...prev, volume: "Volume is required" }));
        return;
      }
      const id = Math.random().toString(36).slice(2, 9);
      const newCart = {
        id,
        title: selectedCollection?.title || "",
        type,
        countries: selectedCountries,
        collectionId: selectedCollection._id,
        image: selectedCollection.image || "",
        unitPrice: selectedCollection.fee || 1,
        collection: selectedCollection,
        columns: selectedData,
        filteredData,
        volume,
      };

      const updatedCarts = carts.filter(
        (cart) => cart.collectionId !== selectedCollection._id
      );
      setCarts([...updatedCarts, newCart]);
    }
  }, [
    selectedCollection,
    volume,
    type,
    selectedCountries,
    selectedData,
    carts,
    setCarts,
  ]);

  const createOrder = async (files: any[], volume: number, prix: number) => {
    const response = await api.post("/api/order/create", {
      files: JSON.stringify(files),
      volume,
      prix,
      paid: "Paid",
    });
    if (response.status == 201) {
      setStep(1);
      setSteps([defaultStep]);
      setSelectedData({});
      setSelectedCollection(undefined);
      setSelectedCountries([]);
      setType("");
      navigate("/user/orders/1");
      removeCarts(selectedCartIds);
    }
  };

  const handleColumnChange = useCallback(
    (
      columnType: string,
      columnName: string,
      selectedValue: any,
      stepName: string
    ) => {
      setSelectedData((prev) => ({
        ...prev,
        [columnName]: {
          value: selectedValue,
          stepName: stepName,
          type: columnType,
        },
      }));
    },
    []
  );

  return (
    <div className="h-full flex flex-col">
      <UserHeader icon={<FaRegFolderOpen />} label="New File" />
      <div className="h-full flex bg-light-gray overflow-y-auto">
        <div className="px-12 py-8">
          <VerticalStepBar steps={steps} stepNumber={step} />
        </div>
        <div className="min-w-min flex flex-1 flex-col border-l border-light-gray-1">
          <div className="flex items-center justify-between flex-wrap gap-2 px-8 py-4 border-b border-light-gray-3">
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
                <button
                  onClick={handleAddCart}
                  className="border border-dark-blue rounded-full p-3"
                >
                  <img src={CartAddIcon} className="w-6 h-6" />
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
                  setColumns={(columnType, columnName, selectedValue) =>
                    handleColumnChange(
                      columnType,
                      columnName,
                      selectedValue,
                      steps[step - 1].name
                    )
                  }
                  setVolume={setVolume}
                  setFilteredData={setFilteredData}
                />
              ))}
            </div>
            {step > 1 && step === steps.length && (
              <Checkout
                orderPrice={totalPrice}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
                cardElement={
                  <CardElement className="w-full mb-4 p-2 border border-light-gray-3 rounded-md" />
                }
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
              volume={volume}
              totalPrice={totalPrice}
              errors={errors}
              setVolume={setVolume}
              setTotalPrice={setTotalPrice}
              setErrors={setErrors}
            />
          </div>
        )}
      </div>
    </div>
  );
}
