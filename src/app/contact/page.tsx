import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact Us | RK STEEL CO Noida Head Office",
  description: "Contact RK STEEL CO at G-38, Sector - 9, Noida. Call 9999307984 | 9953364645 | 9811364645 or email sn_rksteel@yahoo.co.in. All steel and iron items under one roof.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const initialProduct = params.product || "";

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Banner Header */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded border border-navy-700">
              RK STEEL CO • NOIDA HEAD OFFICE &amp; STOCKYARD
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-3 py-1 rounded border border-slate-700">
              ALL STEEL AND IRON ITEMS UNDER ONE ROOF
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Let's Build Stronger <span className="text-red-500">Together.</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Have a requirement? Get in touch with our team at RK STEEL CO for the best rates, product availability and quick support across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 3-Column Structured Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Column 1: Send Us Your Requirement Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-heading text-xl font-bold text-navy-950 uppercase tracking-wide">
                Send Us Your Requirement
              </h3>
              <ContactForm initialProduct={initialProduct} />
            </div>

            {/* Column 2: Get In Touch Details */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="font-heading text-xl font-bold text-navy-950 uppercase tracking-wide">
                OUR CONTACT DETAILS
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold uppercase tracking-wider">HEAD OFFICE:</strong>
                    <span className="text-gray-700 font-medium">G-38, Sector - 9, Noida</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold uppercase tracking-wider">CONTACT US:</strong>
                    <div className="text-gray-700 space-y-0.5 font-bold">
                      <div><a href="tel:9999307984" className="hover:text-red-600">+91 99993 07984</a></div>
                      <div><a href="tel:9953364645" className="hover:text-red-600">+91 99533 64645</a></div>
                      <div><a href="tel:9811364645" className="hover:text-red-600">+91 98113 64645</a></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold">Email Us:</strong>
                    <a href="mailto:sn_rksteel@yahoo.co.in" className="text-gray-700 hover:text-red-600 font-medium">
                      sn_rksteel@yahoo.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold">Working Hours:</strong>
                    <span className="text-gray-600">Mon - Sat: 9:30 AM - 7:30 PM<br />Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Find Us Here Google Map */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col">
              <h3 className="font-heading text-xl font-bold text-navy-950 uppercase tracking-wide">
                Find Us Here
              </h3>
              <div className="flex-1 min-h-[260px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                <iframe
                  title="RK Steel Company Noida Location Map"
                  src="https://maps.google.com/maps?q=Sector-9%20Noida%20Uttar%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Bottom Trust Icons Strip (Matching Screenshot 5) */}
          <div className="bg-navy-950 text-white p-6 rounded-2xl border border-navy-800 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">100% Genuine Products</div>
              <div className="text-gray-400 text-[11px]">From trusted mill brands</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">Competitive Prices</div>
              <div className="text-gray-400 text-[11px]">Best market rates always</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">Ready Stock</div>
              <div className="text-gray-400 text-[11px]">Huge inventory ready to dispatch</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">Timely Delivery</div>
              <div className="text-gray-400 text-[11px]">On-time supply, every time</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">Expert Support</div>
              <div className="text-gray-400 text-[11px]">Professional advice & support</div>
            </div>
          </div>

          {/* Bottom Phone Strip */}
          <div className="bg-red-600 text-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-heading text-lg font-bold">
              Need today's rate? Call us now!
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
              <a href="tel:9999307984" className="hover:underline">+91 99993 07984</a>
              <span>|</span>
              <a href="tel:9953364645" className="hover:underline">+91 99533 64645</a>
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20want%20to%20get%20today%27s%20rate."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy-950 hover:bg-navy-900 text-white px-4 py-2 rounded-lg text-xs uppercase"
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
