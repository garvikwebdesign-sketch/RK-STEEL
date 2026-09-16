import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact Us | RK STEEL CO Noida Head Office",
  description: "Contact RK STEEL COMPANY TATA TISCON TMT BARS at Park, G-38, opp. G Block, Sector 9, Noida, Uttar Pradesh 201301. Call 9999307984 | 9953364645 | 9811364645 or email sn_rksteel@yahoo.co.in. All steel and iron items under one roof.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const initialProduct = params.product || "";
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RK STEEL COMPANY TATA TISCON TMT BARS",
    "image": "https://rksteel.co.in/logo.png",
    "telephone": "+919999307984",
    "email": "sn_rksteel@yahoo.co.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Park, G-38, opp. G Block",
      "addressLocality": "Sector 9, Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "19:30"
      }
    ]
  };

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      {/* Banner Header */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs sm:text-sm font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3.5 py-1.5 rounded border border-navy-700">
              RK STEEL CO • NOIDA HEAD OFFICE &amp; STOCKYARD
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-3.5 py-1.5 rounded border border-slate-700">
              ALL STEEL AND IRON ITEMS UNDER ONE ROOF
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Let's Build Stronger <span className="text-red-500">Together.</span>
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mt-3 font-normal leading-relaxed">
            Have a requirement? Get in touch with our team at RK STEEL CO for the best rates, product availability and quick support across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 3-Column Structured Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Column 1: Send Us Your Requirement Form */}
            <div className="lg:col-span-5 bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-950 uppercase tracking-wide">
                Send Us Your Requirement
              </h3>
              <ContactForm initialProduct={initialProduct} />
            </div>

            {/* Column 2: Get In Touch Details */}
            <div className="lg:col-span-3 bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-950 uppercase tracking-wide">
                OUR CONTACT DETAILS
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold uppercase tracking-wider text-xs">HEAD OFFICE &amp; STOCKYARD:</strong>
                    <span className="text-gray-800 font-medium text-sm sm:text-base leading-snug block mt-0.5">
                      Park, G-38, opp. G Block, Sector 9, Noida, Uttar Pradesh 201301
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold uppercase tracking-wider text-xs">CONTACT US:</strong>
                    <div className="text-gray-700 space-y-1 font-bold text-sm sm:text-base mt-0.5">
                      <div><a href="tel:9999307984" className="hover:text-red-600 text-red-700 font-black">+91 99993 07984</a></div>
                      <div><a href="tel:9953364645" className="hover:text-red-600">+91 99533 64645</a></div>
                      <div><a href="tel:9811364645" className="hover:text-red-600">+91 98113 64645</a></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold uppercase tracking-wider text-xs">Email Us:</strong>
                    <a href="mailto:sn_rksteel@yahoo.co.in" className="text-gray-700 hover:text-red-600 font-medium text-sm sm:text-base">
                      sn_rksteel@yahoo.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-950 font-bold uppercase tracking-wider text-xs">Working Hours:</strong>
                    <span className="text-gray-600 text-sm">Mon - Sat: 9:30 AM - 7:30 PM<br />Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Find Us Here Google Map */}
            <div className="lg:col-span-4 bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-950 uppercase tracking-wide">
                Find Us Here
              </h3>
              <div className="flex-1 min-h-[280px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                <iframe
                  title="RK STEEL COMPANY TATA TISCON TMT BARS Noida Location Map"
                  src="https://maps.google.com/maps?q=RK+STEEL+COMPANY+TATA+TISCON+TMT+BARS+Park+G-38+opp+G+Block+Sector+9+Noida+Uttar+Pradesh+201301&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=RK+STEEL+COMPANY+TATA+TISCON+TMT+BARS+Park+G-38+opp+G+Block+Sector+9+Noida+Uttar+Pradesh+201301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1.5 pt-1"
              >
                <span>Open in Google Maps →</span>
              </a>
            </div>
          </div>

          {/* Bottom Trust Icons Strip (Matching Screenshot 5) */}
          <div className="bg-navy-950 text-white p-7 rounded-2xl border border-navy-800 grid grid-cols-2 md:grid-cols-5 gap-5 text-center text-sm shadow-xl">
            <div className="space-y-1">
              <div className="font-bold text-white text-base">100% Genuine Products</div>
              <div className="text-slate-300 text-xs sm:text-sm">From trusted mill brands</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Competitive Prices</div>
              <div className="text-slate-300 text-xs sm:text-sm">Best market rates always</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Ready Stock</div>
              <div className="text-slate-300 text-xs sm:text-sm">Huge inventory ready to dispatch</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Timely Delivery</div>
              <div className="text-slate-300 text-xs sm:text-sm">On-time supply, every time</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Expert Support</div>
              <div className="text-slate-300 text-xs sm:text-sm">Professional advice &amp; support</div>
            </div>
          </div>

          {/* Bottom Phone Strip */}
          <div className="bg-red-600 text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="font-heading text-xl sm:text-2xl font-bold">
              Need today's rate? Call us now!
            </div>
            <div className="flex flex-wrap items-center gap-5 text-base sm:text-lg font-bold">
              <a href="tel:9999307984" className="hover:underline">+91 99993 07984</a>
              <span>|</span>
              <a href="tel:9953364645" className="hover:underline">+91 99533 64645</a>
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20want%20to%20get%20today%27s%20rate."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy-950 hover:bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm uppercase transition-all shadow-md"
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
