"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Users } from "lucide-react";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
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
            <span className="font-bold text-indigo-600">7‑day free trial</span>.
            Cancel anytime, no questions asked.
          </p>
          <p className="text-gray-500">Join over 10,000+ satisfied customers</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Basic</h2>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Perfect for individuals getting started
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">$9</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Essential features included",
                  "Up to 5 projects",
                  "Basic support",
                  "Mobile app access",
                  "1GB storage",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                Start Free Trial
              </Button>
            </div>
          </div>

          {/* Advanced Plan - Popular */}
          <div className="group relative rounded-2xl border-2 border-indigo-200 bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 text-sm font-semibold">
                <Star className="h-4 w-4 mr-1" />
                Most Popular
              </Badge>
            </div>

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Advanced</h2>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                For professionals & growing teams
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    $19
                  </span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "All Basic features included",
                  "Unlimited projects",
                  "Priority support",
                  "Advanced analytics",
                  "Team collaboration",
                  "50GB storage",
                  "Custom integrations",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">7</div>
                <div className="text-sm text-gray-600">Day Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime Guarantee</div>
              </div>
            </div>
            <p className="text-gray-600">
              All plans include a{" "}
              <span className="font-semibold">7‑day free trial</span>. No credit
              card required. Cancel anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
