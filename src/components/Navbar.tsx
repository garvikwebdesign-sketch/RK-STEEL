"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, ShieldCheck, ChevronDown, TrendingUp, Calculator } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [pricesOpen, setPricesOpen] = useState(false);
  const pathname = usePathname();

  const brandLinks = [
    { name: "Tata Tiscon", href: "/brands/tata-tiscon", desc: "TMT Rebars (550SD)" },
    { name: "SAIL SEQR", href: "/brands/sail-seqr", desc: "Integrated Mill Rebars" },
    { name: "Tata Structura", href: "/brands/tata-structura", desc: "Hollow Sections" },
    { name: "Tata Durashine", href: "/brands/tata-durashine", desc: "Roofing Sheets" },
    { name: "Tata Astrum & Steelium", href: "/brands/tata-astrum", desc: "HR/CR Sheets" },
    { name: "JSW Neosteel", href: "/brands/jsw-neosteel", desc: "Primary Grade TMT" },
    { name: "APL Apollo Pipes", href: "/brands/apl-apollo", desc: "MS & GI Pipes" },
  ];

  const priceLinks = [
    { name: "Daily Market Rates Hub", href: "/price-list", desc: "View today's live rates" },
    { name: "Tata Tiscon Today's Rate", href: "/price-list/tata-tiscon", desc: "Noida / NCR Rate Chart" },
    { name: "SAIL SEQR 550D Rate", href: "/price-list/sail-seqr", desc: "Mill Direct Pricing & Trend" },
    { name: "Tata Structura Price List", href: "/price-list/tata-structura", desc: "Hollow Section Rates" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Clean & Concise */}
      <div className="bg-[#0B1E36] text-gray-200 text-xs py-1.5 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-red-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              Est. 1993 • 30+ Years Trust
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              G-38, Sector-9, Noida, UP
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <a href="tel:9999307984" className="hover:text-red-400 transition-colors flex items-center gap-1 font-bold text-white">
              <Phone className="w-3 h-3 text-red-500" />
              +91 99993 07984
            </a>
            <span className="text-gray-600">|</span>
            <a href="mailto:sn_rksteel@yahoo.co.in" className="hover:text-red-400 transition-colors hidden sm:inline text-gray-300">
              sn_rksteel@yahoo.co.in
            </a>
            <Link
              href="/admin/login"
              className="bg-navy-900 hover:bg-navy-800 text-gray-300 px-2 py-0.5 rounded border border-navy-700 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Crest */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-white rounded border border-gray-200 flex items-center justify-center p-0.5 group-hover:border-red-600 transition-colors">
              <img
                src="/logo.jpg"
                alt="RK Steel Company logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-heading font-black text-xl tracking-tight text-navy-950 leading-none">
                RK STEEL <span className="text-red-600">COMPANY</span>
              </div>
              <div className="text-[10px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">
                Authorised Dealer • Tata Steel | SAIL | JSW | AP Apollo
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/about" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              About
            </Link>

            {/* Brands Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <button
                className={`flex items-center gap-0.5 px-2.5 py-1.5 text-xs font-bold rounded transition-all ${
                  pathname.startsWith("/brands") ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
                }`}
              >
                Brands
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {brandsOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 p-2 z-50 grid grid-cols-1 gap-0.5">
                  {brandLinks.map((b) => (
                    <Link
                      key={b.href}
                      href={b.href}
                      className="px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors group flex justify-between items-center"
                    >
                      <span className="text-xs font-bold text-navy-900 group-hover:text-red-600">
                        {b.name}
                      </span>
                      <span className="text-[10px] text-gray-400">{b.desc}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 pt-1 mt-1">
                    <Link
                      href="/brands"
                      className="block px-3 py-1 text-[11px] font-bold text-red-600 hover:bg-gray-50 rounded text-center"
                    >
                      All Brands Hub →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Price Lists Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPricesOpen(true)}
              onMouseLeave={() => setPricesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded transition-all ${
                  pathname.startsWith("/price-list") ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
                }`}
              >
                Price Lists
                <span className="bg-red-600 text-white text-[8px] font-extrabold px-1 rounded uppercase">
                  LIVE
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {pricesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 p-2 z-50 grid grid-cols-1 gap-0.5">
                  {priceLinks.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors group"
                    >
                      <div className="text-xs font-bold text-navy-900 group-hover:text-red-600">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-gray-400">{p.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/products"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/products" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Products
            </Link>

            <Link
              href="/industries"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/industries" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Industries
            </Link>

            <Link
              href="/calculators"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/calculators" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Calculators
            </Link>

            <Link
              href="/catalogues"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/catalogues" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Catalogues
            </Link>

            <Link
              href="/contact"
              className={`px-2.5 py-1.5 text-xs font-bold transition-all rounded ${
                pathname === "/contact" ? "text-red-600 bg-red-50" : "text-navy-900 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Compact Actions */}
          <div className="hidden xl:flex items-center gap-2">
            <a
              href="tel:9999307984"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              Today's Rate
            </a>
            <a
              href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20want%20today%27s%20price%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm transition-all whitespace-nowrap"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-md text-navy-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-lg max-h-[85vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            About Us
          </Link>

          <div className="border-t border-b border-gray-100 py-2 my-1 space-y-1">
            <div className="px-3 text-xs font-bold text-red-600 uppercase tracking-wider">
              Brands Hub
            </div>
            {brandLinks.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-1 text-xs text-gray-700 hover:text-red-600"
              >
                {b.name}
              </Link>
            ))}
          </div>

          <div className="border-b border-gray-100 pb-2 mb-1 space-y-1">
            <div className="px-3 text-xs font-bold text-red-600 uppercase tracking-wider">
              Price Lists & Daily Rates
            </div>
            {priceLinks.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-1 text-xs text-gray-700 hover:text-red-600"
              >
                {p.name}
              </Link>
            ))}
          </div>

          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            Products Catalogue
          </Link>

          <Link
            href="/industries"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            Industries We Serve
          </Link>

          <Link
            href="/calculators"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            Steel Calculators
          </Link>

          <Link
            href="/catalogues"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            Product Catalogues PDF
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-navy-950 hover:bg-gray-50"
          >
            Contact Head Office
          </Link>

          <div className="pt-4 space-y-2">
            <a
              href="tel:9999307984"
              className="w-full text-center bg-red-600 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider block"
            >
              Call For Today's Rate
            </a>
            <a
              href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20want%20today%27s%20steel%20price%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#25D366] text-white py-2.5 rounded-lg text-xs font-bold block"
            >
              WhatsApp Price Enquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
