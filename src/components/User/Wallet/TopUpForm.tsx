// components/Wallet/TopUpForm.tsx
import React, { useState } from "react";
import TopUpAmountInput from "./TopUpAmountInput";
import { PiArrowFatUpLight } from "react-icons/pi";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Make sure to set your public key in .env

interface TopUpFormProps {
  balance: number;
}

const TopUpForm: React.FC<TopUpFormProps> = ({ balance }) => {
  const [amount, setAmount] = useState<number>(2000);
  const [amountType, setAmountType] = useState<string>("insert")
  const [loading, setLoading] = useState(false)

  const handleTopUpClick = async () => {};

  return (
    <div className="w-full rounded-lg shadow-md bg-white border-2 border-light-gray-3 text-dark font-raleway">
      <div className="flex flex-col items-start px-6 py-4 border-b border-light-gray-3 border-dashed">
        <h2 className="text-lg font-semibold">My Balance</h2>
        <p className="text-2xl font-bold text-dark-blue">$ {balance}</p>
      </div>

      <div className="flex flex-col items-start px-6 py-4 border-b border-light-gray-3 border-dashed">
        <TopUpAmountInput
          label="Top Up Amount"
          amountType={amountType}
          amount={amount}
          setAmount={setAmount}
          setAmountType={(value) => setAmountType(value)}
        />
      </div>

      <div className="flex flex-col items-start px-6 py-4 border-b border-light-gray-3 border-dashed">
        <button
          onClick={handleTopUpClick}
          className={`w-full rounded-full px-4 py-2 flex items-center justify-center gap-2 ${
            loading ? "bg-gray-400" : "bg-dark-blue"
          } text-white`}
        >
          {loading ? (
            "Topping Up..."
          ) : (
            <>
              <PiArrowFatUpLight className="text-xl" /> <span>Top Up</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TopUpForm;
