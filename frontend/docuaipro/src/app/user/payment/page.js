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
import routes from "@/lib/routes";

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

  const { trigger: createPayment } = useCreatePayment();
  const { trigger: verifyPayment } = useVerifyPayment();

  const [isPaying, setIsPaying] = useState(false);

  if (!paypalClientId) return <div>PayPal client ID missing</div>;

  if (isNaN(planId) || isNaN(planAmount)) {
    console.error("Invalid planId or amount:", planId, planAmount);
    return <div>Invalid plan information</div>;
  }

  // Create order for both buttons and card fields
  const handleCreateOrder = async () => {
    const payload = {
      user_id: user.id,
      plan_id: planId,
      subscription_id: null,
      currency: "USD",
      amount: planAmount,
    };

    const order = await createPayment(payload);
    if (!order?.orderId) throw new Error("No orderId returned");
    return order.orderId; // must return string
  };

  const handleApprove = async (data) => {
    try {
      const orderID = data.orderID || data.id;
      await verifyPayment(orderID);
      dispatch(
        showMessage({ message: "Payment successful!", type: "success" })
      );
      router.push(routes.dashboard);
    } catch (err) {
      console.error(err);
      dispatch(
        showMessage({ message: "Payment verification failed", type: "error" })
      );
    }
  };

  const handleError = (err) => {
    console.error(err);
    dispatch(showMessage({ message: "Payment failed", type: "error" }));
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalClientId,
        currency: "USD",
        components: "buttons,card-fields",
        intent: "capture",
      }}
    >
      <div className="flex justify-center mt-20 px-4">
        <Card className="w-full max-w-md shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Payment Information</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plan Info */}
            <div className="bg-blue-50 p-5 rounded-lg text-center">
              <div className="text-lg font-medium">{planTitle}</div>
              <div className="mt-1 text-2xl font-bold">
                ${planAmount.toFixed(2)}/
                <span className="text-sm font-normal">{planPeriod}</span>
              </div>
            </div>

            {/* PayPal Wallet Button */}
            <div className="my-4">
              <PayPalButtons
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={handleError}
                style={{ layout: "vertical", shape: "rect", color: "blue" }}
              />
            </div>

            {/* Card Fields Checkout */}
            <PayPalCardFieldsProvider
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
              onError={handleError}
            >
              <PayPalCardFieldsForm className="border border-gray-300 rounded-md p-4" />
              <SubmitPayment isPaying={isPaying} setIsPaying={setIsPaying} />
            </PayPalCardFieldsProvider>
          </CardContent>
        </Card>
      </div>
    </PayPalScriptProvider>
  );
};

const SubmitPayment = ({ isPaying, setIsPaying }) => {
  const { cardFieldsForm } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      console.error("Card form not found");
      return;
    }

    const formState = await cardFieldsForm.getState();
    if (!formState.isFormValid) {
      alert("The payment form is invalid");
      return;
    }

    setIsPaying(true);
    cardFieldsForm.submit().finally(() => setIsPaying(false));
  };

  return (
    <button
      className={`mt-4 px-4 py-2 rounded text-white ${
        isPaying ? "bg-gray-400" : "bg-blue-700"
      }`}
      onClick={handleClick}
      disabled={isPaying}
    >
      {isPaying ? "Processing..." : "Pay"}
    </button>
  );
};

export default withAuth(PaymentPage);
