"use client";

import { useFooterVisibility } from "@/context/store/useFooterVisibility";
import { usePathname } from "next/navigation";

const ROUTES_WITHOUT_FOOTER = ["/admin"];

export default function Footer() {
  const pathname = usePathname();
  const { isFooterVisible } = useFooterVisibility();

  const shouldHideFooter = ROUTES_WITHOUT_FOOTER.some((route) =>
    pathname.startsWith(route)
  );

  if (!isFooterVisible || shouldHideFooter) return null;

  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-4 text-sm">
        <div>
          <h4 className="font-bold mb-2">DocuAI Pro</h4>
          <p>AI-powered PDF chat tool for professionals and teams.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Product</h4>
          <ul className="space-y-1">
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
