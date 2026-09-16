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
        <div className="bg-[#0B192C] text-white rounded-2xl p-7 sm:p-9 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {valueProps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 ${idx !== 0 ? "pt-4 sm:pt-0 sm:pl-4" : ""}`}
                >
                  <div className="w-14 h-14 rounded-full border border-slate-700 bg-slate-900/60 flex items-center justify-center flex-shrink-0 text-red-400">
                    <IconComp className="w-7 h-7 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold tracking-wider text-white uppercase font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-snug">
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
