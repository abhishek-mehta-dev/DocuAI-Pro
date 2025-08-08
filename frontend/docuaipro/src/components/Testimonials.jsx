"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight, Quote, Play, ThumbsUp, Verified, Users, TrendingUp, Award } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Martinez",
    role: "Research Specialist",
    company: "Stanford University",
    text: "DocuAI Pro has revolutionized how I work with research papers. I can now extract key insights from hundreds of documents in minutes instead of hours. The AI understands context incredibly well and provides citations that are always accurate.",
    rating: 5,
    avatar: "/professional-woman-researcher.png",
    verified: true,
    helpful: 24,
    videoUrl: null,
    industry: "Education"
  },
  {
    name: "Michael Johnson",
    role: "Legal Counsel",
    company: "Morrison & Associates",
    text: "The AI responses are incredibly accurate. It's like having a personal assistant that never sleeps. I've been able to review contracts and legal documents 3x faster while maintaining the same level of thoroughness.",
    rating: 5,
    avatar: "/professional-lawyer.png",
    verified: true,
    helpful: 31,
    videoUrl: null,
    industry: "Legal"
  },
  {
    name: "Emma Davis",
    role: "Business Analyst",
    company: "TechCorp Inc.",
    text: "Simple to use, powerful results. DocuAI Pro saves me hours every week analyzing financial reports and market research. The ability to ask follow-up questions makes it feel like a natural conversation.",
    rating: 5,
    avatar: "/professional-woman-analyst.png",
    verified: true,
    helpful: 18,
    videoUrl: null,
    industry: "Business"
  },
  {
    name: "Dr. James Wilson",
    role: "Medical Researcher",
    company: "Johns Hopkins",
    text: "As a medical researcher, accuracy is paramount. DocuAI Pro helps me quickly review medical literature and extract relevant findings. The AI's ability to understand medical terminology is impressive.",
    rating: 5,
    avatar: "/doctor-medical-researcher.png",
    verified: true,
    helpful: 42,
    videoUrl: null,
    industry: "Healthcare"
  },
  {
    name: "Lisa Chen",
    role: "Product Manager",
    company: "InnovateTech",
    text: "Game-changer for product research! I can analyze user feedback, market reports, and competitor analysis documents all in one place. The insights I get help me make better product decisions.",
    rating: 5,
    avatar: "/asian-woman-product-manager.png",
    verified: true,
    helpful: 27,
    videoUrl: null,
    industry: "Technology"
  }
];

const stats = [
  { label: "Happy Users", value: "10,000+", icon: Users },
  { label: "Documents Processed", value: "2M+", icon: TrendingUp },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "Industry Awards", value: "12", icon: Award }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedTestimonials, setLikedTestimonials] = useState(new Set());
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", ...new Set(testimonials.map(t => t.industry))];
  const filteredTestimonials = selectedIndustry === "All" 
    ? testimonials 
    : testimonials.filter(t => t.industry === selectedIndustry);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
    setIsAutoPlaying(false);
  };

  const handleLike = (index) => {
    const newLiked = new Set(likedTestimonials);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedTestimonials(newLiked);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Customer Stories
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by thousands
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users are saying about their experience with DocuAI Pro
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Industry Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedIndustry(industry);
                  setCurrentIndex(0);
                }}
                className="transition-all duration-200"
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredTestimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="max-w-4xl mx-auto bg-white shadow-xl border-0">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Quote Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Quote className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start mb-4">
                            {renderStars(testimonial.rating)}
                          </div>
                          
                          <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                            "{testimonial.text}"
                          </blockquote>

                          <div className="flex items-center justify-center md:justify-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                              <AvatarFallback>
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                {testimonial.verified && (
                                  <Verified className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                              <p className="text-sm text-gray-500">{testimonial.company}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(index)}
                              className={`transition-colors ${
                                likedTestimonials.has(index) ? 'text-blue-600' : 'text-gray-500'
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {testimonial.helpful + (likedTestimonials.has(index) ? 1 : 0)}
                            </Button>
                            
                            <Badge variant="secondary" className="text-xs">
                              {testimonial.industry}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isAutoPlaying ? (
              <>
                <Play className="w-4 h-4 mr-2 fill-current" />
                Auto-playing
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start auto-play
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
