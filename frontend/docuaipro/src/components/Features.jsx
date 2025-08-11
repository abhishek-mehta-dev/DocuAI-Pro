"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, MessageCircle, Brain, Shield, ChevronRight, FileText, Zap, Lock, CheckCircle } from 'lucide-react';

const features = [
  {
    title: "Upload PDFs",
    desc: "Simply drag and drop your PDF files. We support documents up to 100MB.",
    icon: Upload,
    color: "blue",
    details: [
      "Drag & drop interface",
      "Support for 100MB+ files",
      "Batch upload capability",
      "OCR for scanned documents"
    ],
    demo: "Try uploading a sample PDF"
  },
  {
    title: "Ask Anything",
    desc: "Ask questions in natural language and get precise answers from your documents.",
    icon: MessageCircle,
    color: "green",
    details: [
      "Natural language processing",
      "Context-aware responses",
      "Multi-document queries",
      "Conversation history"
    ],
    demo: "Ask: 'What is the main conclusion?'"
  },
  {
    title: "Powered by AI",
    desc: "Advanced AI understands context, and provides accurate, relevant responses.",
    icon: Brain,
    color: "purple",
    details: [
      "GPT-4 powered analysis",
      "Semantic understanding",
      "Citation tracking",
      "Confidence scoring"
    ],
    demo: "See AI analysis in action"
  },
  {
    title: "Secure & Private",
    desc: "Your documents are encrypted and never shared. Complete privacy guaranteed.",
    icon: Shield,
    color: "red",
    details: [
      "End-to-end encryption",
      "Zero data retention",
      "GDPR compliant",
      "SOC 2 certified"
    ],
    demo: "View security details"
  },
];

const colorVariants = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700"
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700"
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700"
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700"
  }
};

export default function Features() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleDemoClick = (e, feature) => {
    e.stopPropagation();
    // Here you could trigger actual demo functionality
    alert(`Demo: ${feature.demo}`);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Key Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to chat with PDFs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make document interaction seamless and intelligent
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorVariants[feature.color];
            const isExpanded = expandedCard === index;
            const isHovered = hoveredCard === index;

            return (
              <Card
                key={index}
                className={`
                  cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                  ${isHovered ? 'shadow-lg' : 'shadow-md'}
                  ${isExpanded ? 'ring-2 ring-blue-500 shadow-xl' : ''}
                  border-0 bg-white/80 backdrop-blur-sm
                `}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300
                      ${colors.bg} ${isHovered ? 'scale-110' : ''}
                    `}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <ChevronRight 
                      className={`
                        w-5 h-5 text-gray-400 transition-all duration-300
                        ${isExpanded ? 'rotate-90 text-blue-500' : ''}
                        ${isHovered ? 'text-gray-600' : ''}
                      `} 
                    />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>

                {/* Expanded content */}
                <div className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4 hover:bg-gray-50"
                        onClick={(e) => handleDemoClick(e, feature)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {feature.demo}
                      </Button>
                    </div>
                  </CardContent>
                </div>

                {/* Hover indicator */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transition-all duration-300
                  ${isHovered ? 'from-blue-500 to-purple-500 opacity-100' : 'opacity-0'}
                `} />
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8 py-3">
            Try All Features Free
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
