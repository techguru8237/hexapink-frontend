import CurrencyInput from "../Common/Inputs/CurrencyInput";

interface PricingProps {
  fee: number;
  discount: number;
  setFee: (fee: number) => void;
  setDiscount: (discount: number) => void;
  disabled?: boolean;
}

export default function Pricing({
  fee,
  setFee,
  discount,
  setDiscount,
  disabled
}: PricingProps) {
  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        Pricing
      </div>

      <div className="flex items-center gap-8 p-6">
        <CurrencyInput
          label="Base Fee Per Lead"
          type="number"
          value={fee}
          disabled={disabled ?? false}
          onChange={setFee}
          error=""
        />
        <CurrencyInput
          label="Discount Maximum"
          type="number"
          value={discount}
          disabled={disabled ?? false}
          onChange={setDiscount}
          error=""
        />
      </div>
    </div>
  );
}
