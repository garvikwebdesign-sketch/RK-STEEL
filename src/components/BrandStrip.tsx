import Link from "next/link";

export function BrandStrip() {
  const brands = [
    {
      name: "TATA STEEL",
      tagline: "#WeAlsoMakeTomorrow",
      type: "Authorised Distributor",
      logoClass: "text-[#005A9C] font-black",
      href: "/brands/tata-tiscon",
    },
    {
      name: "TATA TISCON",
      tagline: "JOY OF BUILDING",
      type: "550SD Rebars",
      logoClass: "text-[#1E3A8A] font-extrabold",
      href: "/brands/tata-tiscon",
    },
    {
      name: "TATA STRUCTURA",
      tagline: "STEEL HOLLOW SECTIONS",
      type: "RHS / SHS Pipes",
      logoClass: "text-[#0284C7] font-black",
      href: "/brands/tata-structura",
    },
    {
      name: "TATA DURASHINE",
      tagline: "COLOR COATED SHEETS",
      type: "Roofing Sheets",
      logoClass: "text-[#DC2626] font-black",
      href: "/brands/tata-durashine",
    },
    {
      name: "सेल SAIL",
      tagline: "STEEL AUTHORITY OF INDIA",
      type: "SEQR 550D Rebars",
      logoClass: "text-[#1E3A8A] font-black",
      href: "/brands/sail-seqr",
    },
    {
      name: "JSW Steel",
      tagline: "BETTER EVERYDAY",
      type: "Neosteel TMT",
      logoClass: "text-[#0284C7] font-black",
      href: "/brands/jsw-neosteel",
    },
    {
      name: "APOLLO",
      tagline: "STEEL PIPES",
      type: "MS & GI Pipes",
      logoClass: "text-[#DC2626] font-black",
      href: "/brands/apl-apollo",
    },
  ];

  return (
    <section className="bg-white py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 font-sans">
            Authorised Dealer & Stockist
          </h2>
        </div>

        {/* Brand Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center justify-center">
          {brands.map((b, idx) => (
            <Link
              key={idx}
              href={b.href}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50/80 transition-all group text-center"
            >
              <div className="h-10 flex items-center justify-center">
                <span className={`text-base sm:text-lg tracking-tight group-hover:scale-105 transition-transform ${b.logoClass}`}>
                  {b.name}
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                {b.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
