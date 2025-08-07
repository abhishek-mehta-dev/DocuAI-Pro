"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    title: "Upload PDFs",
    desc: "Simply drag and drop your PDF files. We support documents up to 100MB.",
  },
  {
    title: "Ask Anything",
    desc: "Ask questions in natural language and get precise answers from your documents.",
  },
  {
    title: "Powered by AI",
    desc: "Advanced AI understands context, and provides accurate, relevant responses.",
  },
  {
    title: "Secure & Private",
    desc: "Your documents are encrypted and never shared. Complete privacy guaranteed.",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
