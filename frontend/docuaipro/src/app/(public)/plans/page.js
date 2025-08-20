"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Users } from "lucide-react";
import { usePlans } from "@/hooks/usePlan";
import DocuAILoader from "@/components/Loader";
import { withAuth } from "@/components/auth/withAuth";
import { useRouter } from "next/navigation";

const PlansPage = () => {
  const { plan, isLoading } = usePlans();
  const data = plan?.data || [];
  const router = useRouter();

  const [billingPeriod, setBillingPeriod] = useState("monthly");

  if (isLoading) {
    return <DocuAILoader />;
  }

  // Group by title + period
  const groupedPlans = data.reduce((acc, p) => {
    if (!acc[p.title]) acc[p.title] = {};
    acc[p.title][p.period] = p;
    return acc;
  }, {});

  const standardPlan = groupedPlans["Standard"]?.[billingPeriod];
  const proPlan = groupedPlans["Pro"]?.[billingPeriod];

  const plansToShow = [standardPlan, proPlan].filter(Boolean);
  const trialDays = plansToShow[0]?.freeTrialDays ?? 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <Badge
            variant="secondary"
            className="mb-4 px-4 py-2 text-sm font-medium"
          >
            🚀 Limited Time Offer
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 bg-clip-text text-transparent mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Start with a{" "}
            <span className="font-bold text-indigo-600">
              {trialDays} Days free trial
            </span>
            . Cancel anytime, no questions asked.
          </p>
          <p className="text-gray-500">Join over 10,000+ satisfied customers</p>

          {/* Billing Period Selector */}
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant={billingPeriod === "monthly" ? "default" : "outline"}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingPeriod === "yearly" ? "default" : "outline"}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plansToShow.map((p) => (
            <div
              key={p.id}
              className={`group relative rounded-2xl border ${
                p.title === "Pro"
                  ? "border-2 border-indigo-200 shadow-xl"
                  : "border-gray-200 shadow-lg"
              } bg-white p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              {p.title === "Pro" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 text-sm font-semibold">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        p.title === "Pro"
                          ? "bg-gradient-to-r from-indigo-100 to-purple-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {p.title === "Pro" ? (
                        <Users className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <Zap className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {p.title}
                    </h2>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {p.title === "Pro"
                    ? "For professionals & growing teams"
                    : "Perfect for individuals getting started"}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-5xl font-bold ${
                        p.title === "Pro"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                          : "text-gray-900"
                      }`}
                    >
                      ${p.amount}
                    </span>
                    <span className="text-xl text-gray-500">
                      /{billingPeriod}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Billed {billingPeriod}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 mt-4">
                  {[
                    `PDF Upload limit: ${p.limits.pdfUpload ?? "Unlimited"}`,
                    `Questions limit: ${p.limits.questions ?? "Unlimited"}`,
                    p.features.chatHistory
                      ? "Chat history included"
                      : "No chat history",
                    p.features.prioritySupport
                      ? "Priority support"
                      : "Standard support",
                    p.aiResponseType === "Advanced AI responses"
                      ? "Advanced AI responses"
                      : "Basic AI responses",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 text-lg font-semibold ${
                    p.title === "Pro"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  } transition-all duration-200`}
                  onClick={() =>
                    router.push(
                      `/user/payment?planId=${p.id}&title=${p.title}&amount=${p.amount}&period=${billingPeriod}`
                    )
                  }
                >
                  Start {p.freeTrialDays} day
                  {p.freeTrialDays > 1 ? "s" : ""} Free Trial
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(PlansPage);
