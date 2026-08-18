import { Building2, Landmark, Home, Factory, Wrench, Shield, Fuel, Car, Train, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Industries We Serve | RK Steel Company Noida",
  description: "Steel distribution solutions for Construction, Infrastructure, Real Estate, Manufacturing, Fabrication, Roofing, and Piping.",
};

const INDUSTRIES = [
  {
    title: "Construction",
    desc: "Supplying TMT bars, structural steel, sheets, pipes & more for residential, commercial and infrastructure projects.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    link: "/products?category=TMT+Bars",
  },
  {
    title: "Engineering",
    desc: "High-grade steel products for engineering fabrication, machinery, and heavy engineering applications.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    link: "/products?category=Structural+Steel",
  },
  {
    title: "Infrastructure",
    desc: "Reliable steel solutions for bridges, highways, metro, airports, and other large-scale infrastructure projects.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    link: "/products?category=Structural+Steel",
  },
  {
    title: "Manufacturing",
    desc: "Quality steel for manufacturing units, fabrication, automotive, and industrial equipment production.",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    link: "/products?category=MS%2FHR%2FCR%2FGI+Sheets+%26+Plates",
  },
  {
    title: "Oil & Gas / Energy",
    desc: "Pipes, tubes and plates for oil & gas, power plants, refineries, and renewable energy projects.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    link: "/products?category=Pipes+%26+Hollow+Sections",
  },
  {
    title: "Agriculture",
    desc: "Steel pipes, tubes and structures for irrigation, fencing, and other agricultural applications.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    link: "/products?category=Chain+Link+%26+Accessories",
  },
];

export default function IndustriesPage() {
  return (
    <div className="space-y-0 bg-gray-50">
      {/* Banner (Matching Screenshot 3) */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded inline-block border border-navy-700 mb-2">
            DISTRIBUTION & SUPPLY SOLUTIONS
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Strengthening Every Industry <span className="text-red-500">We Serve</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            We supply high-quality steel products to a wide range of industries. Our commitment to quality, timely delivery and competitive pricing makes us the preferred steel partner across India.
          </p>
        </div>
      </section>

      {/* Grid of Sectors (Exact Screenshot 3 Match) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
              SECTORS & APPLICATIONS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-navy-950 font-bold tracking-tight mt-2">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-navy-950 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-navy-950 group-hover:text-red-600 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{ind.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={ind.link}
                    className="text-xs font-bold text-red-600 hover:text-navy-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner (Matching Screenshot 3 bottom banner) */}
          <div className="bg-navy-950 text-white p-8 rounded-2xl border-2 border-navy-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-heading text-2xl font-bold text-white">Your Industry. Our Strength.</h3>
              <p className="text-gray-300 text-xs">
                Let's build something great together. Get in touch with our technical steel specialists.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
              >
                Request A Quote
              </Link>
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20have%20an%20industrial%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy-900 hover:bg-navy-800 text-white border border-navy-700 font-bold text-xs px-6 py-3 rounded-lg uppercase"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
