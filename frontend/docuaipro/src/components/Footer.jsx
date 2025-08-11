"use client";

import { useState, useEffect } from "react";
import { useFooterVisibility } from "@/context/store/useFooterVisibility";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Mail, Twitter, Linkedin, Github, Heart, Send, CheckCircle, ExternalLink, MapPin, Phone, Clock, Zap } from 'lucide-react';

const ROUTES_WITHOUT_FOOTER = ["/admin"];

const socialLinks = [
  { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "hover:text-blue-400" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/abhishek-mehta-0724ab256", color: "hover:text-blue-600" },
  { name: "GitHub", icon: Github, url: "https://github.com/abhishek-mehta-dev", color: "hover:text-gray-900" },
];

const quickLinks = [
  { name: "Pricing", href: "#pricing", external: false },
  { name: "Features", href: "#features", external: false },
  { name: "Documentation", href: "/docs", external: false },
  { name: "API", href: "/api", external: false },
];

const companyLinks = [
  { name: "About", href: "#about", external: false },
  { name: "Contact", href: "#contact", external: false },
  { name: "Careers", href: "/careers", external: false },
  { name: "Blog", href: "/blog", external: false },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#privacy", external: false },
  { name: "Terms of Service", href: "#terms", external: false },
  { name: "Cookie Policy", href: "/cookies", external: false },
  { name: "GDPR", href: "/gdpr", external: false },
];

export default function Footer() {
  const pathname = usePathname();
  const { isFooterVisible } = useFooterVisibility();
  
  const shouldHideFooter = ROUTES_WITHOUT_FOOTER.some((route) =>
    pathname.startsWith(route)
  );

  // New interactive state
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Existing conditional return preserved
  if (!isFooterVisible || shouldHideFooter) return null;

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsSubscribing(false);
    setEmail("");
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href, external) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal navigation
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-50" />
        
        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Newsletter Section */}
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6">
                Get the latest updates on new features and AI improvements
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  disabled={isSubscribing || isSubscribed}
                />
                <Button 
                  type="submit" 
                  disabled={isSubscribing || isSubscribed || !email}
                  className="px-6"
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSubscribed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
              
              {isSubscribed && (
                <p className="text-green-600 text-sm mt-2 animate-fade-in">
                  ✨ Successfully subscribed! Welcome to our community.
                </p>
              )}
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-5 gap-8 text-sm">
            {/* Company Info - Enhanced */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-lg text-gray-900">DocuAI Pro</h4>
                <Badge variant="secondary" className="text-xs">
                  AI Powered
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                AI-powered PDF chat tool for professionals and teams. 
                Transform how you interact with documents using advanced AI technology.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Himachal Pradesh, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+91 8580615737</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Support</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      onClick={() => handleLinkClick(social.url, true)}
                      className={`
                        w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center
                        transition-all duration-200 hover:scale-110 hover:shadow-md
                        text-gray-600 ${social.color}
                      `}
                      onMouseEnter={() => setHoveredLink(social.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Product</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span>© 2025 DocuAI Pro. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>in India</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                99.9% Uptime
              </Badge>
              <Badge variant="outline" className="text-xs">
                SOC 2 Compliant
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
