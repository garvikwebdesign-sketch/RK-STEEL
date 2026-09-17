"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Clock, Menu, X, ShieldCheck, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const pathname = usePathname();

  const productLinks = [
    { name: "TMT Rebars (550SD / 500D)", href: "/products?category=TMT+Bars", brand: "Tata Tiscon & SAIL SEQR" },
    { name: "Pipes & Hollow Sections", href: "/products?category=Pipes+%26+Hollow+Sections", brand: "Tata Structura & APL Apollo" },
    { name: "Colour Coated & Roofing", href: "/products?category=Colour+Coated+%26+Roofing+Sheets", brand: "Tata Durashine" },
    { name: "MS / HR / CR / GI Sheets", href: "/products?category=MS%2FHR%2FCR%2FGI+Sheets+%26+Plates", brand: "Tata Astrum & Steelium" },
    { name: "Heavy Structural Steel", href: "/products?category=Structural+Steel", brand: "Beams, Channels & Angles" },
    { name: "View All Products", href: "/products", brand: "Full Steel Inventory" },
  ];

  const calculatorLinks = [
    { name: "TMT Weight Calculator", href: "/calculators?tab=round-bar#live-calculator-widget", desc: "Weight by bar dia & count" },
    { name: "Pipe & Hollow Section Weight", href: "/calculators?tab=pipe#live-calculator-widget", desc: "MS pipes & RHS/SHS" },
    { name: "MS Plate Weight Calculator", href: "/calculators?tab=sheet#live-calculator-widget", desc: "Sheets & coils by thickness" },
    { name: "Structural Steel Weight", href: "/calculators?tab=equal-angle#live-calculator-widget", desc: "Beams, channels & angles" },
    { name: "Rebar Quantity Calculator", href: "/calculators?tab=rebar-calc#live-calculator-widget", desc: "RCC slab, beam & column bars" },
    { name: "Concrete Volume Calculator", href: "/calculators?tab=concrete#live-calculator-widget", desc: "Slab & column mix volume" },
    { name: "All 18 Steel Calculators", href: "/calculators#live-calculator-widget", desc: "IS standard calculations" },
  ];

  const knowledgeLinks = [
    { name: "Daily Market Rates Hub", href: "/price-list", desc: "Live Noida & NCR rates" },
    { name: "PDF Product Catalogues", href: "/catalogues", desc: "Download brochures & specs" },
    { name: "Authorised Brands Hub", href: "/brands", desc: "Tata, SAIL, JSW, Apollo" },
    { name: "Steel Insights & News", href: "/blog", desc: "Market trends & buyer guides" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full max-w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all">
      {/* Top Utility Bar */}
      <div className="bg-[#0B192C] text-slate-300 py-2 px-3 sm:px-5 lg:px-6 xl:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-[13px]">
          {/* Left: Trust Badge */}
          <div className="flex items-center gap-2 font-medium flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-white font-bold">Est. 1993</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">30+ Years of Trust</span>
          </div>

          {/* Center: Head Office Location (shown on xl+) */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-300 truncate max-w-md">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span title="RK STEEL COMPANY TATA TISCON TMT BARS, Park, G- 38, opp. G Block, G Block, Sector 9, Noida, Uttar Pradesh 201301" className="truncate">
              Park, G-38, opp. G Block, Sector 9, Noida - 201301
            </span>
          </div>

          {/* Right: Working Hours & Admin */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-slate-300 flex-shrink-0 ml-auto sm:ml-0 pr-0.5 sm:pr-0">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Mon – Sat: 8:30 AM - 7:00 PM</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link
              href="/admin/login"
              className="text-slate-300 hover:text-white transition-colors text-xs font-semibold whitespace-nowrap"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 min-h-[76px] lg:min-h-[82px] xl:min-h-[86px] py-2">
          {/* Clean Company Logo */}
          <div className="flex-shrink-0">
            <Logo variant="light" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-1.5">
            {/* Home */}
            <Link
              href="/"
              className={`px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                isActive("/") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
              }`}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className={`px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                isActive("/about") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
              }`}
            >
              About Us
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                  isActive("/products") || isActive("/brands") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
                }`}
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180 text-red-600" : "text-slate-400"}`} />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {productLinks.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors block group"
                    >
                      <div className="text-sm font-bold text-slate-900 group-hover:text-red-600">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{p.brand}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries */}
            <Link
              href="/industries"
              className={`px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                isActive("/industries") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
              }`}
            >
              Industries
            </Link>

            {/* Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCalculatorsOpen(true)}
              onMouseLeave={() => setCalculatorsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                  isActive("/calculators") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
                }`}
              >
                Calculators
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${calculatorsOpen ? "rotate-180 text-red-600" : "text-slate-400"}`} />
              </button>

              {calculatorsOpen && (
                <div className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {calculatorLinks.map((c) => (
                    <Link
                      key={c.name}
                      href={c.href}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors block group"
                    >
                      <div className="text-sm font-bold text-slate-900 group-hover:text-red-600">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Knowledge Center */}
            <div
              className="relative"
              onMouseEnter={() => setKnowledgeOpen(true)}
              onMouseLeave={() => setKnowledgeOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                  isActive("/price-list") || isActive("/catalogues") || isActive("/blog") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
                }`}
              >
                Knowledge Center
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${knowledgeOpen ? "rotate-180 text-red-600" : "text-slate-400"}`} />
              </button>

              {knowledgeOpen && (
                <div className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {knowledgeLinks.map((k) => (
                    <Link
                      key={k.name}
                      href={k.href}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors block group"
                    >
                      <div className="text-sm font-bold text-slate-900 group-hover:text-red-600">
                        {k.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{k.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Us */}
            <Link
              href="/contact"
              className={`px-2 xl:px-2.5 2xl:px-3 py-2 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold transition-colors whitespace-nowrap ${
                isActive("/contact") ? "text-red-600 font-bold" : "text-slate-800 hover:text-red-600"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Rate & Phone Call Widget */}
          <div className="hidden sm:flex items-center flex-shrink-0 pr-0.5 sm:pr-1">
            <a
              href="tel:9999307984"
              className="flex items-center gap-2 xl:gap-2.5 group py-1.5 px-2 xl:px-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 bg-red-600 group-hover:bg-red-700 text-white rounded-xl flex items-center justify-center shadow-md shadow-red-600/20 transition-all flex-shrink-0">
                <Phone className="w-4 h-4 xl:w-5 xl:h-5 fill-current" />
              </div>
              <div className="flex flex-col text-left whitespace-nowrap pr-0.5">
                <span className="text-[10px] xl:text-xs uppercase font-bold text-slate-500 tracking-wider leading-none mb-0.5">
                  Call for Today's Rate
                </span>
                <span className="text-sm xl:text-base font-extrabold text-slate-900 group-hover:text-red-600 leading-tight transition-colors">
                  +91 99993 07984
                </span>
                <span className="hidden 2xl:block text-[11px] font-semibold text-slate-600 group-hover:text-slate-800 leading-tight transition-colors mt-0.5">
                  9953364645 | 9811364645
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center flex-shrink-0">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl max-h-[85vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            About Us
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Products & Brands
          </Link>
          <Link
            href="/industries"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Industries We Serve
          </Link>
          <Link
            href="/calculators"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Steel Calculators
          </Link>
          <Link
            href="/price-list"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Daily Price Lists
          </Link>
          <Link
            href="/catalogues"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Product Catalogues PDF
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            Contact Us
          </Link>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href="tel:9999307984"
              className="w-full text-center bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-5 h-5 fill-current" />
              Call +91 99993 07984
            </a>
            <a
              href="https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20want%20to%20get%20today%27s%20steel%20price%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-md"
            >
              WhatsApp Price Enquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
