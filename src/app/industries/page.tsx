import { Building2, Factory, Landmark, Cpu, Flame, Sprout, ChevronRight, ArrowRight, Phone, MessageSquare, Award, Users, Box, Truck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Industries We Serve | RK STEEL CO — Infrastructure, Construction & Manufacturing",
  description: "Steel distribution solutions for Construction, Infrastructure, Engineering, Manufacturing, Oil & Gas, and Agriculture across India. All steel and iron items under one roof by RK STEEL CO.",
};

const INDUSTRIES = [
  {
    title: "Construction",
    desc: "Supplying TMT bars, structural steel, sheets, pipes & more for residential, commercial and infrastructure projects.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    icon: Building2,
    link: "/products?category=TMT+Bars",
  },
  {
    title: "Engineering",
    desc: "High-grade steel products for engineering fabrication, machinery, and heavy engineering applications.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    icon: Factory,
    link: "/products?category=Structural+Steel",
  },
  {
    title: "Infrastructure",
    desc: "Reliable steel solutions for bridges, highways, metro, airports, and other large-scale infrastructure projects.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80",
    icon: Landmark,
    link: "/products?category=Structural+Steel",
  },
  {
    title: "Manufacturing",
    desc: "Quality steel for manufacturing units, fabrication, automotive, and industrial equipment production.",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    icon: Cpu,
    link: "/products?category=MS%2FHR%2FCR%2FGI+Sheets+%26+Plates",
  },
  {
    title: "Oil & Gas / Energy",
    desc: "Pipes, tubes and plates for oil & gas, power plants, refineries, and renewable energy projects.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    icon: Flame,
    link: "/products?category=Pipes+%26+Hollow+Sections",
  },
  {
    title: "Agriculture",
    desc: "Steel pipes, tubes and structures for irrigation, fencing, and other agricultural applications.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    icon: Sprout,
    link: "/products?category=Chain+Link+%26+Accessories",
  },
];

export default function IndustriesPage() {
  return (
    <div className="space-y-0 bg-white">
      {/* Subpage Hero Header */}
      <section className="relative bg-[#0B192C] text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#0B192C]/90 to-[#0B192C]/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-red-400 font-bold">Industries</span>
          </div>

          <div className="inline-block bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold px-3 py-1 rounded">
            TAGLINE: ALL STEEL AND IRON ITEMS UNDER ONE ROOF
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight font-sans">
            Strengthening Every Industry <span className="text-red-500">We Serve</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            At RK STEEL CO, we supply high-quality steel products to a wide range of industries. Our commitment to quality, timely delivery and competitive pricing makes us the preferred steel partner across India.
          </p>
        </div>
      </section>

      {/* Industries Grid (Matching Image 4) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 font-sans heading-accent-center pb-2">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 bg-slate-900 overflow-hidden">
                      <img
                        src={ind.image}
                        alt={ind.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      {/* Dark circle icon */}
                      <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-full bg-[#0B192C] border-2 border-white text-white flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-6 pt-9 space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors font-sans">
                        {ind.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ind.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={ind.link}
                      className="text-xs font-bold text-red-600 hover:text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats & Callout Bar (Matching Image 4 bottom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 4 Stats */}
            <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-slate-900 font-sans">30+</div>
                <div className="text-[10px] text-slate-500 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-sans">5000+</div>
                <div className="text-[10px] text-slate-500 font-medium">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-sans">50,000+</div>
                <div className="text-[10px] text-slate-500 font-medium">MT Stock Ready</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-sans">Pan India</div>
                <div className="text-[10px] text-slate-500 font-medium">Supply Network</div>
              </div>
            </div>

            {/* Right Dark Callout */}
            <div className="lg:col-span-6 bg-[#0B192C] text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white font-sans">Your Industry. Our Strength.</h3>
                <p className="text-slate-400 text-xs mt-0.5">Let's build something great together.</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg whitespace-nowrap shadow-md"
                >
                  Request A Quote
                </Link>
                <a
                  href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20have%20an%20industrial%20requirement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg whitespace-nowrap"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
