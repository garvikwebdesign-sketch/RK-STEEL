import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award } from "lucide-react";

export const metadata = {
  title: "Contact Us | RK Steel Company Noida Head Office",
  description: "Contact RK Steel Company at G-38 Sector-9 Noida. Call 9999307984 / 9953364645 / 9811364645 or email sn_rksteel@yahoo.co.in.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const initialProduct = params.product || "";

  return (
    <div className="space-y-0 bg-steel-100 min-h-screen">
      {/* Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-navy-700">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            NOIDA HEAD OFFICE & STOCKYARD
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Get In Touch With Us
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Need urgent steel delivery or price quotation for your construction site? Reach out to our technical sales advisors today.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-navy-950 text-white p-8 rounded-2xl border-2 border-navy-800 shadow-xl space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white tracking-wide">
                    RK STEEL COMPANY
                  </h2>
                  <p className="text-xs text-gold-400 font-semibold tracking-wider uppercase mt-1">
                    Your Trusted Steel Partner • Est. 1993
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3 p-3 bg-navy-900 rounded-lg border border-navy-800">
                    <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-bold text-sm">Head Office & Yard Address:</strong>
                      <span className="text-gray-300">G-38, Sector-9, Noida, Uttar Pradesh — 201301</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-navy-900 rounded-lg border border-navy-800">
                    <Phone className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-bold text-sm">Direct Phone Numbers:</strong>
                      <div className="text-gray-300 space-y-0.5">
                        <div><a href="tel:9999307984" className="hover:text-gold-400 font-bold">9999307984</a></div>
                        <div><a href="tel:9953364645" className="hover:text-gold-400 font-bold">9953364645</a></div>
                        <div><a href="tel:9811364645" className="hover:text-gold-400 font-bold">9811364645</a></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-navy-900 rounded-lg border border-navy-800">
                    <Mail className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-bold text-sm">Official Email:</strong>
                      <a href="mailto:sn_rksteel@yahoo.co.in" className="text-gold-400 hover:underline">
                        sn_rksteel@yahoo.co.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-navy-900 rounded-lg border border-navy-800">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-bold text-sm">Working Hours:</strong>
                      <span className="text-gray-300">Monday – Saturday: 9:30 AM – 7:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 text-[11px] text-gray-300 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>Authorised stockist for Tata Steel, SAIL, JSW, and AP Apollo lines.</span>
              </div>
            </div>

            {/* Lead Request Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy-900">
                  Request Rate Quote / Tonnage Availability
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill out the form below to receive competitive mill-direct pricing and dispatch schedules.
                </p>
              </div>

              <ContactForm initialProduct={initialProduct} />
            </div>
          </div>

          {/* Embedded Google Map Section */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 space-y-4">
            <h3 className="font-heading text-xl font-bold text-navy-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              Google Map Location — G-38, Sector-9, Noida
            </h3>
            <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
              <iframe
                title="RK Steel Company Noida Map Location"
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
      </section>
    </div>
  );
}
