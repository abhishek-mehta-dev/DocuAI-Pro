"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { withAuth } from "@/components/auth/withAuth";
import { useCreatePayment, useVerifyPayment } from "@/hooks/usePayment";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const planId = Number(searchParams.get("planId"));
  const planTitle = searchParams.get("title") || "Selected Plan";
  const planAmount = Number(searchParams.get("amount") || 0);
  const planPeriod = searchParams.get("period") || "month";

  // Validate numbers
  if (isNaN(planId) || isNaN(planAmount)) {
    console.error("Invalid planId or amount:", planId, planAmount);
  }

  const { trigger: createPayment } = useCreatePayment();
  const { trigger: verifyPayment } = useVerifyPayment();

  const [isPaying, setIsPaying] = useState(false);

  const handleCreateOrder = async () => {
    const payload = {
      user_id: user.id,
      plan_id: planId,
      subscription_id: null,
      currency: "USD",
      amount: planAmount,
    };

    console.log("Payment payload:", payload);

    // Ensure numbers are valid
    if (
      typeof payload.user_id !== "number" ||
      typeof payload.plan_id !== "number" ||
      typeof payload.amount !== "number"
    ) {
      throw new Error(
        "Invalid payload: user_id, plan_id, or amount is not a number"
      );
    }

    const order = await createPayment(payload);
    return order.orderId || order.id; // depending on backend response
  };

  const handleApprove = async (data) => {
    try {
      await verifyPayment(data.orderID);
      dispatch(
        showMessage({ message: "Payment successful!", type: "success" })
      );
      router.push("/dashboard");
    } catch {
      dispatch(
        showMessage({ message: "Payment verification failed", type: "error" })
      );
    }
  };

  const handleError = (err) => {
    console.error(err);
    dispatch(showMessage({ message: "Payment failed", type: "error" }));
  };

  if (!paypalClientId) return <div>PayPal client ID missing</div>;

  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalClientId,
        currency: "USD",
        components: "card-fields,buttons",
        intent: "capture",
      }}
    >
      <div className="flex justify-center mt-20 px-4">
        <Card className="w-full max-w-md shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Payment Information</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-lg text-center">
              <div className="text-lg font-medium">{planTitle}</div>
              <div className="mt-1 text-2xl font-bold">
                ${planAmount.toFixed(2)}/
                <span className="text-sm font-normal">{planPeriod}</span>
              </div>
            </div>

            <div className="my-4">
              <PayPalButtons
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={handleError}
                style={{ layout: "vertical", shape: "rect", color: "blue" }}
              />
            </div>

            <PayPalCardFieldsProvider createOrder={handleCreateOrder}>
              <PayPalCardFieldsForm className="border border-gray-300 rounded-md p-4">
                <SubmitPayment
                  isPaying={isPaying}
                  setIsPaying={setIsPaying}
                  onApprove={handleApprove}
                  onError={handleError}
                />
              </PayPalCardFieldsForm>
            </PayPalCardFieldsProvider>
          </CardContent>
        </Card>
      </div>
    </PayPalScriptProvider>
  );
};

const SubmitPayment = ({ isPaying, setIsPaying, onApprove, onError }) => {
  const { cardFieldsForm } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) throw new Error("No card form found");

    const formState = await cardFieldsForm.getState();
    if (!formState.isFormValid) return alert("The payment form is invalid");

    setIsPaying(true);
    cardFieldsForm
      .submit()
      .then(onApprove)
      .catch((err) => {
        setIsPaying(false);
        onError(err);
      });
  };

  return (
    <button
      className={`btn ${isPaying ? "btn-disabled" : "btn-primary"}`}
      onClick={handleClick}
      disabled={isPaying}
      style={{ float: "right" }}
    >
      {isPaying ? <div className="spinner tiny" /> : "Pay"}
    </button>
  );
};

export default withAuth(PaymentPage);
