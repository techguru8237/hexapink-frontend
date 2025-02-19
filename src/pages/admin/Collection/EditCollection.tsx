import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PiCheckBold } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import AdminHeader from "../../../components/Dashboard/AdminHeader";
import VerticalStepBar from "../../../components/Collection/VerticalStepbar";
import GeneralInformation from "../../../components/Collection/General/GeneralInformation";
import CountrySelect from "../../../components/Common/CountrySelect";
import Pricing from "../../../components/User/Pricing";
import ColumnGenerate from "../../../components/Collection/Column/ColumnGenerate";
import { CollectionCreateErrors, Column } from "../../../types";
import ColumnMapping from "../../../components/Collection/Table/ColumnMapping";
import StepSetting from "../../../components/Collection/Step/StepSetting";
import { useLoading } from "../../../contexts/Loading";
import api, { formApi } from "../../../actions/api";
import { toast } from "react-toastify";

const steps = [
  { label: "General", step: 1 },
  { label: "Columns", step: 2 },
  { label: "Tables", step: 3 },
  { label: "Steps", step: 4 },
];

const types = ["Business", "Client"];

export default function EditCollection() {
  const navigate = useNavigate();
  const params = useParams();
  const { showLoading, hideLoading } = useLoading();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(types[0]);
  const [description, setDescription] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [fee, setFee] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/collection/${
          params.collectionId
        }`
      );
      const { title, type, description, countries, fee, discount, columns } =
        response.data;

      setTitle(title);
      setDescription(description);
      setType(type);
      setSelectedCountries(countries);
      setFee(fee);
      setDiscount(discount);
      setColumns(columns);
    };

    fetchCollection();
  }, []);

  const [errors, setErrors] = useState<CollectionCreateErrors>({
    title: "",
    file: "",
    columnMapping: "",
  });

  const handleClickBackStep = () => {
    if (step === 1) {
      navigate("/admin/collections");
    } else {
      setStep(step - 1);
    }
  };

  const handleClickNextStep = async () => {
    if (step === steps.length) {
      const formData = new FormData();
      formData.append("title", title);
      if (file) {
        formData.append("file", file); // Append the file object
      }
      formData.append("type", type);
      formData.append("description", description);
      formData.append("countries", JSON.stringify(selectedCountries)); // Stringify the array
      formData.append("fee", fee.toString());
      formData.append("discount", discount.toString());
      formData.append("columns", JSON.stringify(columns)); // Stringify the array

      showLoading();
      try {
        const response = await formApi.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/collection/update/${params.collectionId}`,
          formData
        );

        if (response.status === 200) {
          toast.success("Updated Collection Correctly.");
          navigate("/admin/collections");
        }
      } catch (error: any) {
        toast.error("Error saving collection:", error.message);
      } finally {
        hideLoading();
      }
    } else {
      if (step === 1) {
        if (title === "") {
          setErrors((prev) => ({ ...prev, title: "Title is required." }));
          return;
        }
      }
      setStep(step + 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <AdminHeader icon={<FaRegFolderOpen />} label="Edit Collection" />

      <div className="h-full flex bg-light-gray">
        <div className="border-r border-light-gray-1 px-12 py-8">
          <VerticalStepBar steps={steps} stepNumber={step} />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-start gap-2 px-8 py-4 border-b border-light-gray-3">
            <div
              onClick={handleClickBackStep}
              className="flex items-center gap-1 border border-dark hover:border-dark-blue hover:text-dark-blue rounded-full px-4 py-2 cursor-pointer"
            >
              <GoArrowLeft />
              <span>{step === 1 ? "Back to Collections" : "Back"}</span>
            </div>
            <div
              onClick={handleClickNextStep}
              className={`flex items-center gap-1 border rounded-full px-4 py-2 cursor-pointer ${
                step === steps.length
                  ? "flex-row-reverse bg-dark-blue text-white"
                  : "border-dark hover:border-dark-blue hover:text-dark-blue"
              }`}
            >
              <span>
                {step === steps.length ? "Edit Collection" : "Next"}
              </span>
              {step === steps.length ? <PiCheckBold /> : <GoArrowRight />}
            </div>
          </div>

          <div className="h-full">
            {step === 1 && (
              <div className="flex flex-col gap-8 p-8">
                <GeneralInformation
                  title={title}
                  description={description}
                  fileName={file?.name}
                  type={type}
                  setTitle={setTitle}
                  setFile={setFile}
                  setType={setType}
                  setDescription={setDescription}
                  errors={errors}
                  setErrors={setErrors}
                />
                <CountrySelect
                  selectedCountries={selectedCountries}
                  setSelectedCountries={setSelectedCountries}
                />
                <Pricing
                  fee={fee}
                  discount={discount}
                  setFee={setFee}
                  setDiscount={setDiscount}
                />
              </div>
            )}

            {step === 2 && (
              <ColumnGenerate columns={columns} setColumns={setColumns} />
            )}

            {step === 3 && (
              <ColumnMapping columns={columns} setColumns={setColumns} />
            )}

            {step === 4 && (
              <StepSetting columns={columns} setColumns={setColumns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
