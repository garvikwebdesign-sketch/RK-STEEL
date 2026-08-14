import { Building2, Landmark, Home, Factory, Wrench, Shield, Fuel, Car, Train, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Industries We Serve | RK Steel Company Noida",
  description: "Steel distribution solutions for Construction, Infrastructure, Real Estate, Manufacturing, Fabrication, Roofing, and Piping.",
};

const INDUSTRIES = [
  {
    icon: Building2,
    title: "High-Rise Construction & Civil Engineering",
    desc: "Supplying Fe 550SD Super Ductile TMT rebars (Tata Tiscon & SAIL SEQR) for high-rise earthquake resistant building structures across NCR.",
    products: "Tata Tiscon 550SD, SAIL SEQR, MS Weldmesh",
  },
  {
    icon: Landmark,
    title: "Infrastructure & Heavy Engineering",
    desc: "Structural channels, parallel flange beams, and heavy HR plates for bridge spans, flyover piers, and metro rail girders.",
    products: "SAIL NEX Beams, MS Channels & Angles, HR Plates",
  },
  {
    icon: Home,
    title: "Real Estate & Residential Housing",
    desc: "Reliable distribution of primary brand steel for residential builders, villas, and group housing projects with mill test certificates.",
    products: "JSW Neosteel, Tata Tiscon, Structural Pipes",
  },
  {
    icon: Factory,
    title: "Industrial Warehousing & Roofing Sheds",
    desc: "Colour coated roofing sheets, Galvalume accessories, and hollow sections for PEB industrial sheds and logistics parks.",
    products: "Tata Durashine, Tata Structura MS Hollow Tubes",
  },
  {
    icon: Wrench,
    title: "Fabrication & Heavy Machinery",
    desc: "Hot rolled and cold rolled sheets with tight thickness tolerances and superior weldability for machine beds and enclosures.",
    products: "Tata Astrum HR Sheets, Tata Steelium CR Sheets",
  },
  {
    icon: Shield,
    title: "Perimeter Security & Agricultural Fencing",
    desc: "Heavy galvanised chain link wire mesh, stay poles, and weldmesh panels for boundary wall security across industrial plots.",
    products: "GI Chain Link Fencing, GI Stay Accessories",
  },
  {
    icon: Fuel,
    title: "Oil, Gas & Plumbing Networks",
    desc: "ERW seamless circular pipes and hot-dip GI pipes for fire safety sprinkler networks, fluid transfer, and HVAC lines.",
    products: "AP Apollo MS & GI Pipes, Seamless Tubes",
  },
  {
    icon: Car,
    title: "Automotive & Auto-Ancillary",
    desc: "High drawability CR steel coils and precision steel tubes for auto frames, brackets, and structural components.",
    products: "Tata Steelium CR Coils, Precision Tubes",
  },
  {
    icon: Train,
    title: "Railways & Government Public Works",
    desc: "Supplying government PSU projects with SAIL integrated mill certified structural steel and heavy plates.",
    products: "SAIL Certified Beams, Channels, Plates",
  },
];

export default function IndustriesPage() {
  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded border border-navy-700">
            DISTRIBUTION & SUPPLY SOLUTIONS
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3">
            Industries We Serve
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            With 30+ years of steel trading experience, RK Steel Company delivers tailor-made supply logistics for major industrial and civil infrastructure sectors.
          </p>
        </div>
      </section>

      {/* Grid of Sectors */}
      <section className="py-16 bg-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, idx) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-gold-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-navy-950 text-gold-400 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy-900 group-hover:text-red-600 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{ind.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] font-bold text-navy-900 uppercase">Primary Steel Lines Supplied:</div>
                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded border border-red-100">
                      {ind.products}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-navy-950 p-8 rounded-2xl border-2 border-gold-500/50 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold">Have Specific Industrial Specifications?</h3>
              <p className="text-gray-300 text-xs mt-1">
                Our technical team provides grade matching and standard size cutting tailored for bulk project deliveries.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
            >
              Consult Technical Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
