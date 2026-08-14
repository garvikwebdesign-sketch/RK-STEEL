import { Award, Clock, Warehouse, Users, ThumbsUp, ShieldCheck, Truck, DollarSign } from "lucide-react";

export function WhyUsStrip() {
  const features = [
    {
      icon: Award,
      title: "Authorised Dealers",
      desc: "Direct dealer for Tata Steel, SAIL, JSW Steel & AP Apollo lines",
    },
    {
      icon: Clock,
      title: "Over 30 Years Experience",
      desc: "Serving builders & industrial clients since 1993 with total reliability",
    },
    {
      icon: Warehouse,
      title: "Huge Ready Stock",
      desc: "Extensive inventory ready for immediate dispatches from Noida yard",
    },
    {
      icon: Users,
      title: "Expert Technical Team",
      desc: "Professional guidance on structural grades & IS specification sizing",
    },
    {
      icon: ThumbsUp,
      title: "Customer Satisfaction",
      desc: "Transparent pricing, authentic test certs & priority customer service",
    },
    {
      icon: ShieldCheck,
      title: "100% Genuine Quality",
      desc: "Original factory-certified steel from India's premier integrated steel mills",
    },
    {
      icon: Truck,
      title: "Timely Pan-India Logistics",
      desc: "Prompt delivery across Delhi-NCR, UP, Haryana & All India locations",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      desc: "Direct mill distributor wholesale pricing for major structural projects",
    },
  ];

  return (
    <section className="bg-steel-100 py-12 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
            THE RK STEEL ADVANTAGE
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900 font-bold tracking-tight mt-2 heading-accent-center">
            Why Partner With RK Steel Company?
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto mt-4">
            Built on a legacy of 30+ years (Est. 1993), we empower contractors, infrastructure developers, and industrial fabricators with genuine steel and unmatched service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gold-500/50 transition-all group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-navy-900 text-gold-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all shadow-md">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy-900 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
