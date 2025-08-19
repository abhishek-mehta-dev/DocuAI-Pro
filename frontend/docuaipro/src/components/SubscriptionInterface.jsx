"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Zap,
  Shield,
  Download,
  Clock,
} from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    period: "month",
    features: [
      "100 documents/month",
      "Basic AI processing",
      "Email support",
      "5GB storage",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    period: "month",
    features: [
      "500 documents/month",
      "Advanced AI processing",
      "Priority support",
      "50GB storage",
      "API access",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "Unlimited documents",
      "Premium AI processing",
      "24/7 phone support",
      "500GB storage",
      "Full API access",
      "Custom integrations",
    ],
    popular: false,
  },
];

const billingHistory = [
  {
    id: 1,
    date: "2024-01-15",
    amount: 79,
    status: "paid",
    invoice: "INV-2024-001",
  },
  {
    id: 2,
    date: "2023-12-15",
    amount: 79,
    status: "paid",
    invoice: "INV-2023-012",
  },
  {
    id: 3,
    date: "2023-11-15",
    amount: 79,
    status: "paid",
    invoice: "INV-2023-011",
  },
];

export default function SubscriptionInterface() {
  const [currentPlan, setCurrentPlan] = useState("professional");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const getCurrentPlanDetails = () => {
    return plans.find((plan) => plan.id === currentPlan);
  };

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
    // Here you would typically make an API call to change the subscription
    console.log(`[v0] Changing plan to: ${planId}`);
  };

  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    // Here you would typically make an API call to cancel the subscription
    console.log(`[v0] Cancelling subscription. Reason: ${cancelReason}`);
    setShowCancelModal(false);
  };

  const currentPlanDetails = getCurrentPlanDetails();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground font-serif">
            Subscription Management
          </h1>
          <p className="text-muted-foreground">
            Manage your DocuAI Pro subscription and billing
          </p>
        </div>

        {/* Current Subscription Overview */}
        <Card className="border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-xl font-serif">
                    Current Plan: {currentPlanDetails?.name}
                  </CardTitle>
                  <CardDescription>Active subscription details</CardDescription>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-accent text-accent-foreground"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Monthly Cost</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ${currentPlanDetails?.price}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Next Billing</span>
                </div>
                <p className="text-lg font-semibold">Feb 15, 2024</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Usage This Month</span>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">342 / 500 documents</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary/90">
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plan Options */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground font-serif">
            Available Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative transition-all duration-200 ${
                  plan.id === currentPlan
                    ? "border-primary shadow-lg scale-105"
                    : "border-border hover:border-primary/50"
                } ${plan.popular ? "ring-2 ring-accent/20" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-serif">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">
                      ${plan.price}
                      <span className="text-sm text-muted-foreground font-normal">
                        /{plan.period}
                      </span>
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.id === currentPlan
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                    onClick={() => handlePlanChange(plan.id)}
                    disabled={plan.id === currentPlan}
                  >
                    {plan.id === currentPlan ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Billing History</CardTitle>
            <CardDescription>Your recent invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-full">
                      <CreditCard className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{bill.invoice}</p>
                      <p className="text-sm text-muted-foreground">
                        {bill.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">${bill.amount}</p>
                    <Badge
                      variant={
                        bill.status === "paid" ? "secondary" : "destructive"
                      }
                    >
                      {bill.status === "paid" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {bill.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Section */}
        <Card className="border-destructive/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <CardTitle className="font-serif">
                  Subscription Management
                </CardTitle>
                <CardDescription>
                  Cancel or modify your subscription
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Cancellation Policy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You can cancel your subscription at any time. Your access will
                continue until the end of your current billing period (Feb 15,
                2024).
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Pause Subscription
              </Button>
              <Button variant="destructive" onClick={handleCancelSubscription}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="font-serif">
                  Cancel Subscription
                </CardTitle>
                <CardDescription>
                  We're sorry to see you go. Please let us know why you're
                  cancelling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Reason for cancellation (optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg resize-none"
                    rows={3}
                    placeholder="Help us improve by sharing your feedback..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowCancelModal(false)}
                  >
                    Keep Subscription
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={confirmCancellation}
                  >
                    Confirm Cancellation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
