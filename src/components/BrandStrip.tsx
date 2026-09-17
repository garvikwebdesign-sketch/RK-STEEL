import Link from "next/link";
import {
  TataSteelLogo,
  TataTisconLogo,
  TataStructuraLogo,
  TataDurashineLogo,
  TataAstrumLogo,
  SailLogo,
  JswSteelLogo,
  AplApolloLogo,
  JindalSteelLogo,
} from "@/components/BrandLogo";

export function BrandStrip() {
  const brands = [
    {
      name: "Tata Steel",
      type: "Authorised Distributor",
      component: TataSteelLogo,
      href: "/brands/tata-tiscon",
      subtext: "Est. Distribution 1993",
    },
    {
      name: "Tata Tiscon",
      type: "550SD Rebars",
      component: TataTisconLogo,
      href: "/brands/tata-tiscon",
      subtext: "GreenPro 550SD",
    },
    {
      name: "Tata Structura",
      type: "Hollow Sections",
      component: TataStructuraLogo,
      href: "/brands/tata-structura",
      subtext: "SHS / RHS Pipes",
    },
    {
      name: "Tata Durashine",
      type: "Roofing Sheets",
      component: TataDurashineLogo,
      href: "/brands/tata-durashine",
      subtext: "Galvalume Sheets",
    },
    {
      name: "Tata Astrum",
      type: "HR Sheets & Coils",
      component: TataAstrumLogo,
      href: "/brands/tata-astrum",
      subtext: "HR Sheets & Plates",
    },
    {
      name: "SAIL",
      type: "Integrated Mill",
      component: SailLogo,
      href: "/brands/sail-seqr",
      subtext: "SEQR 550D Rebars",
    },
    {
      name: "JSW Steel",
      type: "Primary Grade",
      component: JswSteelLogo,
      href: "/brands/jsw-neosteel",
      subtext: "Neosteel TMT",
    },
    {
      name: "APL Apollo",
      type: "MS & GI Pipes",
      component: AplApolloLogo,
      href: "/brands/apl-apollo",
      subtext: "Pipes & Tubes",
    },
    {
      name: "Jindal Panther",
      type: "Panther TMT",
      component: JindalSteelLogo,
      href: "/brands",
      subtext: "Jindal Steel & Power",
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2 border border-red-100">
            Authorised Dealer &amp; Mill Stockist Hub
          </div>
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-slate-700 font-sans">
            Direct Primary Steel Mill Partnerships
          </h2>
        </div>

        {/* Brand Logos Row - Authentic Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 items-stretch justify-center">
          {brands.map((b, idx) => {
            const LogoComp = b.component;
            return (
              <Link
                key={idx}
                href={b.href}
                className="flex flex-col items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-red-300 hover:shadow-md transition-all group text-center"
              >
                <div className="h-14 w-full flex items-center justify-center py-1 group-hover:scale-105 transition-transform">
                  <LogoComp className="max-h-11 max-w-full" />
                </div>
                <div className="w-full pt-2 border-t border-slate-200/80 mt-1">
                  <span className="text-[11px] sm:text-xs font-bold tracking-tight text-slate-700 group-hover:text-red-600 transition-colors uppercase block truncate">
                    {b.subtext}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

