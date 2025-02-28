import { useState } from "react";
import { PiDatabaseLight, PiMapPinLight } from "react-icons/pi";
import { MdCheck } from "react-icons/md";

import { Collection } from "../../../types";
import { useCurrency } from "../../../contexts/Currency";
import OptionalNumberInput from "../../Common/Inputs/OptionalNumberInput";
import SelectedColumnData from "./SelectedColumnData";

const inputOptions = ["Volumn", "Price"];

export default function CollectionView({
  data,
  volumn,
  steps,
  columns,
  setVolumn,
}: {
  data: Collection;
  volumn: number;
  steps: string[];
  columns: Record<string, { value: any; stepName: string }>;
  setVolumn: (volumn: number) => void;
}) {
  const { currency } = useCurrency();
  const [calcMode, setCalcMode] = useState<string>("Volumn");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleChangeValue = (option: string, value: number) => {
    if (option === "Volumn") {
      setVolumn(value);
    } else {
      setVolumn(Math.ceil(value / (data.fee || 1)));
      setTotalPrice(value);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8] font-raleway">
      <div className="w-full p-6 flex items-center gap-4 border-b border-dashed border-light-gray-3">
        <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
          {/* <PiImageSquareLight className="text-2xl" /> */}
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${data.image?.replace(
              "uploads",
              ""
            )}`}
            alt="file image"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="font-bold text-left">{data.title}</span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              <PiDatabaseLight className="text-md" />
              <span>{data.type}</span>
            </div>
            <div className="flex items-center">
              <PiMapPinLight className="text-md" />
              <span className="text-left">
                {data.countries?.length && data.countries[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Input volumn or price */}
      <div className="w-full p-6 border-b border-dashed border-light-gray-3">
        <OptionalNumberInput
          label="Set a Limit of"
          isCurrency={true}
          value={calcMode === "Volumn" ? volumn : totalPrice}
          disabled={false}
          option={calcMode}
          options={inputOptions}
          error=""
          changeOption={(option) => setCalcMode(option)}
          changeValue={handleChangeValue}
        />
      </div>

      {/* Show canculated volumn and price */}
      <div className="w-full p-6 flex flex-col gap-2 border-b border-dashed border-light-gray-3">
        <div className="w-full flex items-end gap-1 text-dark-blue font-bold overflow-clip">
          <span className="text-xs font-semibold text-light-dark whitespace-nowrap">
            Volumn Calculate
          </span>
          <div className="flex-1 border-b border-light-gray-3"></div>
          {calcMode === "Volumn" ? (
            <span>{volumn}</span>
          ) : (
            <span>{totalPrice / (data.fee || 1)}</span>
          )}
        </div>
        <div className="w-full flex items-end gap-1 text-dark-blue font-bold overflow-clip">
          <span className="text-xs font-semibold text-light-dark whitespace-nowrap">
            Unit Price
          </span>
          <div className="flex-1 border-b border-light-gray-3"></div>
          <span>
            {currency} {data.fee}
          </span>
        </div>
        <div className="w-full flex items-end gap-1 text-dark-blue font-bold overflow-clip">
          <span className="text-xs font-semibold text-light-dark whitespace-nowrap">
            Price Calculate
          </span>
          <div className="flex-1 border-b border-light-gray-3"></div>
          {calcMode === "Volumn" ? (
            <span>
              {currency}&nbsp;
              {volumn * (data.fee || 1)}
            </span>
          ) : (
            <span>
              {currency}&nbsp;
              {totalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="w-full p-6 flex flex-col items-start gap-2 border-b border-dashed border-light-gray-3">
        <label
          htmlFor="included-fields"
          className="text-xs font-medium text-light-dark"
        >
          Included Fields
        </label>
        <div
          id="included-fields"
          className="w-full border border-light-gray-3 rounded-lg flex flex-col"
        >
          {Object.keys(columns).map((column) => (
            <div
              key={column}
              className="flex items-center gap-2 w-full p-2 border-b border-dashed border-light-gray-3 text-sm last:border-none"
            >
              <MdCheck />
              <span className="font-semibold">{column}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        {steps.map((step) => (
          <div className="w-full p-6 flex flex-col items-start gap-2 border-b border-dashed border-light-gray-3 last:border-none">
            <SelectedColumnData step={step} columns={columns} />
          </div>
        ))}
      </div>
    </div>
  );
}
