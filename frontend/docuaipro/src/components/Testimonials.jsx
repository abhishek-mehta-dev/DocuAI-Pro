"use client";

import { Card, CardHeader, CardDescription } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Martinez",
    role: "Research Specialist",
    text: "DocuAI Pro has revolutionized how I work with research papers...",
  },
  {
    name: "Michael Johnson",
    role: "Legal Counsel",
    text: "The AI responses are incredibly accurate. It's like having a personal assistant...",
  },
  {
    name: "Emma Davis",
    role: "Business Analyst",
    text: "Simple to use, powerful results. DocuAI Pro saves me hours every week...",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold">Trusted by thousands</h2>
        <p className="text-gray-600 mt-2">See what our users are saying</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i}>
              <CardHeader>
                <CardDescription>{t.text}</CardDescription>
                <p className="font-semibold mt-4">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
