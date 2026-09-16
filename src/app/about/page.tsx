import { WhyUsStrip } from "@/components/WhyUsStrip";
import { BrandStrip } from "@/components/BrandStrip";
import { ShieldCheck, Users, Box, Truck, Calendar, Award, CheckCircle2, ChevronRight, ArrowRight, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | RK STEEL CO — 30+ Years of Steel Excellence in Noida",
  description: "Established in 1993, RK STEEL CO is an authorized dealer of Tata Steel, SAIL, JSW, Jindal, and APL Apollo lines with over three decades of trusted service. All steel and iron items under one roof.",
};

export default function AboutPage() {
  const stats = [
    { value: "1993", label: "Year of Establishment", icon: Calendar },
    { value: "30+", label: "Years of Experience", icon: Award, highlight: true },
    { value: "5000+", label: "Happy Customers", icon: Users },
    { value: "500+", label: "MT Stock Ready", icon: Box, highlight: true },
    { value: "Pan India", label: "Supply Network", icon: Truck },
  ];

  const values = [
    {
      title: "Integrity",
      desc: "We believe in honest dealings and transparent business.",
      icon: ShieldCheck,
    },
    {
      title: "Quality",
      desc: "We provide only premium quality steel from trusted brands.",
      icon: Award,
    },
    {
      title: "Reliability",
      desc: "Commitment to timely delivery and consistent service.",
      icon: CheckCircle2,
    },
    {
      title: "Customer First",
      desc: "Our customers are at the heart of everything we do.",
      icon: Users,
    },
    {
      title: "Growth",
      desc: "Continuous growth through innovation and strong partnerships.",
      icon: Box,
    },
  ];

  return (
    <div className="space-y-0 bg-white">
      {/* Subpage Header & Story */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-red-600">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Story */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-red-600 font-sans">
                  About RK STEEL CO
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded border border-slate-200 uppercase">
                  Est. 1993
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-sans">
                Building <span className="text-red-600">Strength.</span> <br />
                Delivering <span className="text-red-600">Trust.</span>
              </h1>

              <div className="bg-red-50 border-l-4 border-red-600 px-5 py-3.5 rounded-r-xl">
                <div className="text-base sm:text-lg font-extrabold text-red-700 font-sans tracking-wide">
                  ALL STEEL AND IRON ITEMS UNDER ONE ROOF
                </div>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Established in <strong>1993</strong>, <strong>RK STEEL CO</strong> has grown to become a trusted name in the steel industry. With 30+ years of experience, we are committed to providing premium quality steel products, competitive prices and timely delivery to our valuable customers across India.
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Our strong relationships with leading manufacturers like Tata Steel, SAIL, JSW Steel, Jindal Steel &amp; Power, and APL Apollo, along with a customer-first approach, have helped us build long-term partnerships based on trust, transparency, and reliability.
              </p>
            </div>

            {/* Right Yard Photo with Floating Highlights Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                  alt="RK STEEL CO Stockyard and Warehouse"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-[#0B192C]/30" />

                {/* Floating Highlights Glass Card */}
                <div className="absolute top-6 right-6 bg-[#0B192C]/90 text-white p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-4 max-w-[280px] backdrop-blur-md">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <ShieldCheck className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>30+ Years of Experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <Users className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>Thousands of Happy Customers</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <Box className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>Huge Inventory Ready Stock</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <Truck className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>Pan India Supply Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Stats Row Card (Matching Image 3) */}
          <div className="bg-white rounded-2xl p-6 sm:p-9 border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="flex flex-col items-center justify-center space-y-1.5">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR VALUES SECTION (Matching Image 3) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-left">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-red-600 font-sans">
              Our Values
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-500 transition-all text-center space-y-3 flex flex-col items-center justify-between"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0B192C] text-red-500 flex items-center justify-center shadow-md">
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-sans">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY PARTNER STRIP & BRAND PARTNERSHIPS */}
      <WhyUsStrip />
      <BrandStrip />

      {/* BOTTOM REQUIREMENT CTA BANNER */}
      <section className="bg-[#0B192C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-red-600/30">
              <Phone className="w-7 h-7 fill-current" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                Have a requirement?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-1">
                Call us for best rates &amp; quick support.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col text-right sm:text-left">
              <a href="tel:9999307984" className="text-lg sm:text-xl font-black text-white hover:text-red-400 transition-colors">
                +91 99993 07984
              </a>
              <div className="text-xs sm:text-sm text-slate-300 font-semibold flex gap-2 mt-0.5">
                <a href="tel:9953364645" className="hover:text-white">9953364645</a>
                <span>|</span>
                <a href="tel:9811364645" className="hover:text-white">9811364645</a>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20have%20a%20steel%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2.5 transition-all shadow-md"
              >
                <MessageSquare className="w-5 h-5 text-green-400" />
                WhatsApp Us
              </a>

              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base uppercase tracking-wider px-7 py-3.5 rounded-xl flex items-center gap-2.5 shadow-xl shadow-red-600/30 transition-all hover:bg-red-500"
              >
                Get Today's Rate
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
