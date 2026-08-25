import { ShieldCheck, IndianRupee, Box, Truck, Headphones } from "lucide-react";

export function WhyUsStrip() {
  const valueProps = [
    {
      icon: ShieldCheck,
      title: "AUTHENTIC PRODUCTS",
      desc: "100% Genuine from Trusted Brands",
    },
    {
      icon: IndianRupee,
      title: "COMPETITIVE PRICES",
      desc: "Best Market Rates Always",
    },
    {
      icon: Box,
      title: "READY STOCK",
      desc: "Huge Inventory Available",
    },
    {
      icon: Truck,
      title: "TIMELY DELIVERY",
      desc: "On-time Supply, Every Time",
    },
    {
      icon: Headphones,
      title: "EXPERT SUPPORT",
      desc: "Professional Advice & Support",
    },
  ];

  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {valueProps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 ${idx !== 0 ? "pt-4 sm:pt-0 sm:pl-4" : ""}`}
                >
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center flex-shrink-0 text-slate-200">
                    <IconComp className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold tracking-wider text-white uppercase font-sans">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
