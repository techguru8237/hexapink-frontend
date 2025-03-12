import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { PiArrowFatUpLight } from "react-icons/pi";

import api from "../../../actions/api";
import { useUserContext } from "../../../contexts/User";
import TopUpAmountInput from "../../Common/Inputs/AmountInput";
import { User } from "../../../types";
import { toast } from "react-toastify";

const TopUpForm: React.FC = () => {
  const { currentUser, setCurrentUser } = useUserContext();

  const [amount, setAmount] = useState<number>(100);
  const [amountType, setAmountType] = useState<string>("insert");
  const [loading, setLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleTopUp = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/transaction/topup", {
        userId: currentUser?.id,
        amount,
      });
      const { clientSecret } = response.data;

      const cardElement = elements?.getElement(CardElement);
      if (!cardElement) {
        toast.error("Card element not found");
        return;
      }

      if (!stripe) {
        toast.error("Stripe not loaded");
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        toast.error(`Payment method creation failed: ${error.message}`);
        return;
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (paymentResult.error) {
        toast.error(`Payment failed: ${paymentResult.error.message}`);
        return;
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        const response = await api.post("/api/transaction/confirm-topup", {
          userId: currentUser?.id,
          amount,
          paymentIntentId: paymentResult.paymentIntent.id,
        });

        if (response.status === 200) {
          setCurrentUser({
            ...currentUser!,
            balance: currentUser!.balance + amount,
          } as User);
        }
      }
    } catch (error) {
      toast.error(`Top-up error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg shadow-md bg-white border-2 border-light-gray-3 text-dark font-raleway">
      <div className="flex flex-col items-start px-6 py-4 border-b border-light-gray-3 border-dashed">
        <h2 className="text-lg font-semibold">My Balance</h2>
        <p className="text-2xl font-bold text-dark-blue">
          $ {currentUser?.balance}
        </p>
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

      <div className="flex flex-col p-6 gap-6">
        <CardElement />
        <button
          onClick={handleTopUp}
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
