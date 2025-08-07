"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
        <p className="text-gray-600 mt-2">Choose the plan that works for you</p>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <p className="text-2xl font-bold">
                $0<span className="text-sm">/month</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-left">
                <li>5 PDF uploads</li>
                <li>50 questions per month</li>
                <li>Basic AI responses</li>
              </ul>
              <Button className="mt-4 w-full">Start for Free</Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <p className="text-2xl font-bold">
                $19<span className="text-sm">/month</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-left">
                <li>Unlimited PDF uploads</li>
                <li>Unlimited questions</li>
                <li>Advanced AI responses</li>
                <li>Chat history</li>
                <li>Priority support</li>
              </ul>
              <Button className="mt-4 w-full">Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
