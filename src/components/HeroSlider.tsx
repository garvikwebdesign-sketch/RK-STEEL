"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const HERO_SLIDES = [
  {
    title: "BUILT ON TRUST.",
    subtitle: "DELIVERED IN STRENGTH.",
    desc: "Noida's premier stockist & authorised distributor of Tata Steel, SAIL, JSW Steel, and AP Apollo lines. Providing 100% genuine mill-certified steel for over 30 years.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
    badge: "TATA TISCON 550SD & SAIL SEQR REBARS",
    highlightText: "Ready Stock for Immediate Dispatch",
  },
  {
    title: "STRUCTURAL TUBES & PIPES.",
    subtitle: "PRECISION & DURABILITY.",
    desc: "Authorised stockist of Tata Structura MS hollow sections (RHS / SHS) and APL Apollo pipes for heavy infrastructure, warehouses, and industrial sheds.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    badge: "TATA STRUCTURA & APL APOLLO",
    highlightText: "Complete Range of Square & Round Sections",
  },
  {
    title: "COLOUR COATED & ROOFING.",
    subtitle: "LONG LASTING PROTECTION.",
    desc: "Genuine Tata Durashine roofing sheets, Galvalume accessories, and Tata Steelium CR/HR sheets directly from primary steel mills.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80",
    badge: "TATA DURASHINE & ASTRUM SHEETS",
    highlightText: "Custom Lengths & Mill Test Certificates",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative bg-navy-950 text-white min-h-[580px] lg:min-h-[620px] flex items-center overflow-hidden border-b-4 border-red-600">
      {/* Background Image Carousel with Overlay */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-35 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ backgroundImage: `url('${s.image}')` }}
        />
      ))}

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              {slide.badge}
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              {slide.title} <br />
              <span className="text-red-500">{slide.subtitle}</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {slide.desc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="tel:9999307984"
                className="bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-red-600/30"
              >
                <Phone className="w-5 h-5" />
                Call For Today's Rate
              </a>
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20want%20to%20get%20today%27s%20price%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#128C7E] hover:bg-[#075E54] text-white font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                WhatsApp Enquiry
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Badges Bar */}
            <div className="pt-6 border-t border-navy-800 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Tata Steel Authorised Dealer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>SAIL SEQR 550D Stockist</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Pan-NCR Immediate Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Floating Stats Box (Matching Client Screenshot) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-navy-900/90 border-2 border-navy-700 p-6 rounded-2xl shadow-2xl backdrop-blur-sm space-y-5">
              <div className="border-b border-navy-800 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">RK STEEL EXCELLENCE</span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded">EST. 1993</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center font-bold text-lg">
                    30+
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Years of Experience</div>
                    <div className="text-[11px] text-gray-400">Serving Noida & Delhi NCR since 1993</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/20 text-gold-400 rounded-lg flex items-center justify-center font-bold text-lg">
                    100%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Authorised Dealer</div>
                    <div className="text-[11px] text-gray-400">Tata Steel, SAIL, JSW, AP Apollo</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">
                    50k+
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Huge Ready Inventory</div>
                    <div className="text-[11px] text-gray-400">Wide Range of TMT & Pipes</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center font-bold text-lg">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Quick Logistics Network</div>
                    <div className="text-[11px] text-gray-400">Same-day dispatch to site</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/price-list"
                  className="w-full text-center bg-navy-800 hover:bg-navy-700 text-red-400 border border-red-500/30 py-2.5 rounded-lg text-xs font-bold block transition-all"
                >
                  View Today's Market Price List →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Nav Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy-900/60 hover:bg-navy-900 text-white p-2.5 rounded-full backdrop-blur-sm transition-all border border-navy-700"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy-900/60 hover:bg-navy-900 text-white p-2.5 rounded-full backdrop-blur-sm transition-all border border-navy-700"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentSlide ? "w-8 bg-red-600" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
