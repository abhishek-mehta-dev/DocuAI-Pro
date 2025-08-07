"use client";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto text-center px-4">
        <span className="text-xs font-medium bg-gray-100 px-3 py-1 rounded-full">
          Powered by Advanced AI
        </span>
        <h1 className="text-4xl font-bold mt-4">
          Chat with Your PDFs Using AI
        </h1>
        <p className="mt-4 text-gray-600">
          Upload any PDF document and start asking questions. Get instant,
          accurate answers powered by advanced AI technology.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg">Get Started For Free</Button>
          <Button size="lg" variant="outline">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
