"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Award, Box, Truck, CheckCircle2, MessageSquare } from "lucide-react";

const HERO_SLIDES = [
  {
    title: "BUILT ON TRUST.",
    highlightWord: "STRENGTH.",
    desc: "Your trusted steel supplier for 30+ years. We deliver premium quality steel products with best rates, timely delivery & unmatched service across India.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
    badge: "RK STEEL CO | EST. 1993",
    tagline: "HAR ZAROORAT KA STEEL • ALL STEEL & IRON ITEMS UNDER ONE ROOF",
  },
  {
    title: "AUTHORISED DEALER.",
    highlightWord: "GENUINE STEEL.",
    desc: "Noida's premier stockist for Tata Tiscon TMT, Tata Structura Pipes, Tata Durashine Roofing, SAIL SEQR, JSW Neosteel, and APL Apollo pipes.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    badge: "100% MILL CERTIFIED",
    tagline: "DIRECT FROM PRIMARY MILLS",
  },
  {
    title: "READY INVENTORY.",
    highlightWord: "FAST DISPATCH.",
    desc: "Over 50,000 MT ready stock across Noida & Ghaziabad stockyards for immediate delivery to residential, commercial and industrial sites.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80",
    badge: "PAN NCR & INDIA LOGISTICS",
    tagline: "ALL SIZES & GRADES IN STOCK",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative bg-[#0B192C] text-white min-h-[580px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Images with smooth transitions */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-30 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ backgroundImage: `url('${s.image}')` }}
        />
      ))}

      {/* Clean Modern Dark Gradient Overlay for Maximum Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/95 to-[#0B192C]/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs sm:text-sm font-bold tracking-[0.16em] text-red-400 uppercase bg-red-950/80 border border-red-500/50 px-3.5 py-1.5 rounded-md shadow-sm">
                {slide.badge}
              </span>
              <span className="text-xs sm:text-xs font-bold tracking-wider text-slate-100 uppercase bg-slate-800/90 px-3.5 py-1.5 rounded-md border border-slate-700">
                {slide.tagline}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.14] tracking-tight font-sans drop-shadow-md">
              <span className="text-white">{slide.title}</span> <br />
              <span className="text-slate-100">DELIVERED IN </span>
              <span className="text-red-500">{slide.highlightWord}</span>
            </h1>

            <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-xl font-normal drop-shadow-sm">
              {slide.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="tel:9999307984"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl uppercase tracking-wide flex items-center gap-3 transition-all shadow-xl shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-5 h-5 fill-current" />
                Call For Today's Rate (+91 99993 07984)
              </a>
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20want%20to%20enquire%20about%20today%27s%20steel%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/30 font-bold text-base sm:text-lg px-7 py-4 rounded-xl tracking-wide flex items-center gap-3 transition-all backdrop-blur-sm hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 text-green-400" />
                WhatsApp Enquiry
              </a>
            </div>

            {/* Badges Line */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Ready Stock</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Best Prices</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Quick Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Dark Glass Feature Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-[#081526]/90 border border-slate-700/70 p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
              {/* Stat 1: 30+ Years */}
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-red-500 min-w-[65px]">
                  30+
                </div>
                <div>
                  <div className="text-base font-bold text-white">Years of Experience</div>
                  <div className="text-sm text-slate-300">RK STEEL CO • Since 1993</div>
                </div>
              </div>

              <div className="border-t border-slate-800" />

              {/* Stat 2: Authorised Dealer */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/15 text-red-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">Authorised Dealer &amp; Stockist</div>
                  <div className="text-sm text-slate-300">Tata Steel, SAIL, JSW Steel, Jindal Steel, APL Apollo</div>
                </div>
              </div>

              <div className="border-t border-slate-800" />

              {/* Stat 3: Wide Range */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/15 text-red-500 flex items-center justify-center flex-shrink-0">
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">Wide Range</div>
                  <div className="text-sm text-slate-300">TMT Bars, Structural, Pipes, Sheets & More</div>
                </div>
              </div>

              <div className="border-t border-slate-800" />

              {/* Stat 4: Quick Delivery */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/15 text-red-500 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">Quick Delivery</div>
                  <div className="text-sm text-slate-300">Strong logistics network across NCR & India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-7 bg-red-600" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
