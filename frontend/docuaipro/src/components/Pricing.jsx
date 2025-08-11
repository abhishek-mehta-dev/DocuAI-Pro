"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Star, Zap, Crown, Users, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const plans = {
  monthly: [
    {
      name: "Free",
      price: 0,
      originalPrice: null,
      description: "Perfect for trying out our AI PDF chat",
      features: [
        { name: "5 PDF uploads", included: true },
        { name: "50 questions per month", included: true },
        { name: "Basic AI responses", included: true },
        { name: "Email support", included: true },
        { name: "Unlimited questions", included: false },
        { name: "Advanced AI responses", included: false },
        { name: "Chat history", included: false },
        { name: "Priority support", included: false }
      ],
      buttonText: "Start for Free",
      buttonVariant: "outline",
      popular: false,
      icon: Users,
      color: "gray"
    },
    {
      name: "Pro",
      price: 19,
      originalPrice: null,
      description: "For professionals who need unlimited access",
      features: [
        { name: "Unlimited PDF uploads", included: true },
        { name: "Unlimited questions", included: true },
        { name: "Advanced AI responses", included: true },
        { name: "Chat history", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      popular: true,
      icon: Crown,
      color: "blue"
    }
  ],
  yearly: [
    {
      name: "Free",
      price: 0,
      originalPrice: null,
      description: "Perfect for trying out our AI PDF chat",
      features: [
        { name: "5 PDF uploads", included: true },
        { name: "50 questions per month", included: true },
        { name: "Basic AI responses", included: true },
        { name: "Email support", included: true },
        { name: "Unlimited questions", included: false },
        { name: "Advanced AI responses", included: false },
        { name: "Chat history", included: false },
        { name: "Priority support", included: false }
      ],
      buttonText: "Start for Free",
      buttonVariant: "outline",
      popular: false,
      icon: Users,
      color: "gray"
    },
    {
      name: "Pro",
      price: 15,
      originalPrice: 19,
      description: "For professionals who need unlimited access",
      features: [
        { name: "Unlimited PDF uploads", included: true },
        { name: "Unlimited questions", included: true },
        { name: "Advanced AI responses", included: true },
        { name: "Chat history", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      popular: true,
      icon: Crown,
      color: "blue"
    }
  ]
};

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data is safely stored for 30 days after cancellation, giving you time to export or reactivate."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans, no questions asked."
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const currentPlans = isYearly ? plans.yearly : plans.monthly;
  const savings = isYearly ? Math.round(((19 - 15) / 19) * 100) : 0;

  const handlePlanSelect = async (planName) => {
    setLoadingPlan(planName);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingPlan(null);
    alert(`Selected ${planName} plan!`);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Pricing Plans
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works for you. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <div className="flex items-center gap-4 px-4 py-2">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Save {savings}%
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {currentPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === index;
            const isLoading = loadingPlan === plan.name;

            return (
              <Card
                key={plan.name}
                className={`
                  relative transition-all duration-300 transform hover:scale-105 cursor-pointer
                  ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border shadow-lg hover:shadow-xl'}
                  ${isHovered ? 'shadow-2xl' : ''}
                  bg-white
                `}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${plan.color === 'blue' ? 'bg-blue-100' : 'bg-gray-100'}
                      ${isHovered ? 'scale-110' : ''}
                    `}>
                      <Icon className={`w-6 h-6 ${plan.color === 'blue' ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {isYearly && plan.originalPrice && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(plan.originalPrice - plan.price) * 12}/year
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mt-3">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.buttonVariant}
                    className={`
                      w-full py-3 transition-all duration-200
                      ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => handlePlanSelect(plan.name)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        {plan.buttonText}
                        {plan.popular && <Zap className="w-4 h-4 ml-2" />}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader 
                  className="pb-3"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown 
                      className={`
                        w-5 h-5 text-gray-500 transition-transform duration-200
                        ${expandedFaq === index ? 'rotate-180' : ''}
                      `}
                    />
                  </div>
                </CardHeader>
                <div className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${expandedFaq === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <CardContent className="pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <Button variant="outline" className="px-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
