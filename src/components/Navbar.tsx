"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, ShieldCheck, ChevronRight, Calculator } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Industries We Serve", href: "/industries" },
    { name: "Calculators", href: "/calculators" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Info Bar */}
      <div className="bg-[#071526] text-gray-300 text-xs py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
              Authorised Dealer: Tata Steel | SAIL | JSW | AP Apollo
            </span>
            <span className="hidden sm:inline text-navy-700">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              G-38, Sector-9, Noida, UP
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:9999307984" className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              9999307984 / 9953364645
            </a>
            <a href="mailto:sn_rksteel@yahoo.co.in" className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gold-500" />
              sn_rksteel@yahoo.co.in
            </a>
            <Link
              href="/admin/login"
              className="text-xs bg-navy-800 hover:bg-navy-700 text-gray-200 px-2.5 py-0.5 rounded border border-navy-700 transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="bg-[#0F2A4A] text-white border-b-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Crest */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-full overflow-hidden shadow-md border-2 border-gold-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/logo.jpg"
                  alt="RK Steel Company Noida logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-heading font-bold text-2xl tracking-wide text-white flex items-center gap-1.5">
                  RK STEEL COMPANY
                  <span className="text-[10px] bg-red-600 text-white font-sans px-1.5 py-0.5 rounded font-semibold">
                    EST. 1993
                  </span>
                </div>
                <div className="text-xs text-gold-400 tracking-wider font-light">
                  "Your Trusted Steel Partner" • 30+ Years Excellence
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded ${
                      isActive
                        ? "bg-red-600 text-white font-semibold shadow-sm"
                        : "text-gray-200 hover:text-white hover:bg-navy-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/calculators"
                className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-950 px-3.5 py-2 rounded text-xs font-bold transition-all shadow-md hover:shadow-gold-500/20"
              >
                <Calculator className="w-4 h-4" />
                Steel Calculator
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Get Quote
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-navy-800 focus:outline-none"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-navy-950 border-t border-navy-800 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "bg-red-600 text-white" : "text-gray-300 hover:bg-navy-800 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-navy-800 flex flex-col gap-2">
              <Link
                href="/calculators"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center bg-gold-500 text-navy-950 py-2 rounded text-sm font-bold"
              >
                Steel Weight Calculators
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center bg-red-600 text-white py-2 rounded text-sm font-bold"
              >
                Request Rate Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
