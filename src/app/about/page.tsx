import { WhyUsStrip } from "@/components/WhyUsStrip";
import { BrandStrip } from "@/components/BrandStrip";
import { ShieldCheck, Target, Eye, Award, CheckCircle, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | RK Steel Company — 30+ Years of Steel Excellence in Noida",
  description: "Established in 1993, RK Steel Company is an authorized dealer of Tata Steel, SAIL, JSW, and AP Apollo lines with over three decades of trusted service.",
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* Banner Header */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-red-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded border border-navy-700">
            HERITAGE & TRUST SINCE 1993
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3">
            About RK Steel Company
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mt-2 font-light">
            Over three decades of delivering high quality steel solutions, unmatched service, and long-lasting relationships across Delhi-NCR and India.
          </p>
        </div>
      </section>

      {/* Main Story & Pull Quote */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded border border-red-200">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                ESTABLISHED IN 1993 — NOIDA, UTTAR PRADESH
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl text-navy-900 font-bold tracking-tight">
                Three Decades of Unwavering Excellence in Steel Distribution
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Established in <strong>1993</strong>, RK Steel Company has emerged as one of the most trusted names in the steel industry. With over three decades of experience, we are committed to delivering premium quality steel products, unmatched service, and long-lasting relationships with engineers, contractors, and industrial builders.
              </p>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                As authorised dealers and premier stockists for <strong>Tata Steel, SAIL, JSW Steel, and AP Apollo</strong>, we bridge the gap between primary steel mills and infrastructure projects. Our stockyard in Sector-9 Noida holds extensive ready inventory spanning TMT bars, structural pipes, roofing sheets, hot/cold rolled sheets, and structural angles.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-200">
                <div className="space-y-1">
                  <div className="font-heading text-3xl font-black text-navy-900">30+</div>
                  <div className="text-xs text-gray-500 font-medium">Years in Business</div>
                </div>
                <div className="space-y-1">
                  <div className="font-heading text-3xl font-black text-red-600">4+</div>
                  <div className="text-xs text-gray-500 font-medium">Authorised Brands</div>
                </div>
                <div className="space-y-1">
                  <div className="font-heading text-3xl font-black text-gold-500">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Genuine Mill Quality</div>
                </div>
              </div>
            </div>

            {/* Pull Quote Box */}
            <div className="lg:col-span-5 bg-navy-950 text-white p-8 rounded-2xl border-2 border-gold-500/50 shadow-xl space-y-6 relative">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <blockquote className="font-heading text-2xl font-bold italic text-white leading-snug">
                "From strong foundations to iconic structures, our steel builds the future."
              </blockquote>
              <div className="text-xs text-gold-400 font-semibold tracking-wider uppercase border-t border-navy-800 pt-4">
                RK Steel Company Commitment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Commitment Cards */}
      <section className="py-16 bg-steel-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
              CORE PHILOSOPHY
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 font-bold tracking-tight mt-2 heading-accent-center">
              Mission, Vision & Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-4 hover:border-red-500 transition-all">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy-900">Our Mission</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                To provide high quality steel solutions that empower customers to build a stronger and better tomorrow.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-4 hover:border-gold-500 transition-all">
              <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy-900">Our Vision</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                To be the most preferred steel partner known for quality, reliability and dependability across every project.
              </p>
            </div>

            {/* Commitment */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-4 hover:border-navy-900 transition-all">
              <div className="w-12 h-12 bg-navy-100 text-navy-900 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy-900">Our Commitment</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Offering genuine products, competitive prices, timely delivery and customer-centric service at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RK STEEL STRIP */}
      <WhyUsStrip />

      {/* BRAND PARTNERSHIPS STRIP */}
      <BrandStrip />

      {/* Office & Visit CTA */}
      <section className="bg-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Visit Our Head Office & Yard in Noida
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            G-38, Sector-9, Noida, Uttar Pradesh — 201301. Speak directly with our technical steel specialists.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="tel:9999307984"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call 9999307984 / 9953364645
            </a>
            <Link
              href="/contact"
              className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-6 py-3 rounded-lg text-sm"
            >
              View Google Map Location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
