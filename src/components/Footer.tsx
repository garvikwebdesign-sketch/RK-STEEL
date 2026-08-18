import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Award, ArrowRight, FileText, Download } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#071526] text-gray-300 border-t-4 border-red-600">
      {/* Top Banner Accent */}
      <div className="bg-[#0F2A4A] py-6 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-lg text-white font-bold tracking-wide">
                Authorised Stockist & Dealer — Tata Steel, SAIL, JSW & AP Apollo
              </h4>
              <p className="text-xs text-gray-300">
                Tata Tiscon • Tata Structura • Tata Durashine • SAIL SEQR • JSW Neosteel • APL Apollo
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:9999307984"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call 9999307984
            </a>
            <Link
              href="/catalogues"
              className="bg-navy-800 hover:bg-navy-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 border border-navy-700"
            >
              <Download className="w-4 h-4 text-red-400" />
              Download Catalogues
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: About */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center p-0.5">
              <img
                src="/logo.jpg"
                alt="RK Steel Company logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-white">RK STEEL COMPANY</span>
              <div className="text-[10px] text-red-400 font-semibold tracking-wider uppercase">ESTABLISHED IN 1993 • NOIDA, UP</div>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed pr-4">
            Established in 1993, RK Steel Company is Noida's premier stockist & authorised distributor of genuine Tata Steel, SAIL, JSW Steel, and AP Apollo product lines with ready mill-certified inventory for construction & industrial projects.
          </p>
          <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>30+ Years of Unwavering Excellence & Trust</span>
          </div>
        </div>

        {/* Col 2: Authorised Brands Hub */}
        <div>
          <h4 className="font-heading text-sm text-white font-bold tracking-wider mb-4 border-b border-navy-800 pb-2 uppercase text-red-400">
            Authorised Brands
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/brands/tata-tiscon" className="hover:text-white transition-colors">Tata Tiscon TMT</Link></li>
            <li><Link href="/brands/sail-seqr" className="hover:text-white transition-colors">SAIL SEQR 550D</Link></li>
            <li><Link href="/brands/tata-structura" className="hover:text-white transition-colors">Tata Structura Pipes</Link></li>
            <li><Link href="/brands/tata-durashine" className="hover:text-white transition-colors">Tata Durashine Sheets</Link></li>
            <li><Link href="/brands/tata-astrum" className="hover:text-white transition-colors">Tata Astrum HR Sheets</Link></li>
            <li><Link href="/brands/jsw-neosteel" className="hover:text-white transition-colors">JSW Neosteel</Link></li>
            <li><Link href="/brands/apl-apollo" className="hover:text-white transition-colors">APL Apollo Tubes</Link></li>
          </ul>
        </div>

        {/* Col 3: Price Updates & Tools */}
        <div>
          <h4 className="font-heading text-sm text-white font-bold tracking-wider mb-4 border-b border-navy-800 pb-2 uppercase text-red-400">
            Price Rates & Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/price-list" className="hover:text-white font-semibold text-red-300">Daily Market Rates Hub</Link></li>
            <li><Link href="/price-list/tata-tiscon" className="hover:text-white">Tata Tiscon Today's Rate</Link></li>
            <li><Link href="/price-list/sail-seqr" className="hover:text-white">SAIL SEQR TMT Price</Link></li>
            <li><Link href="/price-list/tata-structura" className="hover:text-white">Tata Structura Price List</Link></li>
            <li><Link href="/calculators" className="hover:text-white">Steel Weight Calculators</Link></li>
            <li><Link href="/catalogues" className="hover:text-white">Product Catalogues 2026</Link></li>
            <li><Link href="/industries" className="hover:text-white">Industries We Serve</Link></li>
          </ul>
        </div>

        {/* Col 4: Head Office Contact */}
        <div>
          <h4 className="font-heading text-sm text-white font-bold tracking-wider mb-4 border-b border-navy-800 pb-2 uppercase text-red-400">
            Head Office
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>G-38, Sector-9, Noida, Uttar Pradesh — 201301</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <a href="tel:9999307984" className="hover:text-white font-bold text-white">+91 99993 07984</a>
                <a href="tel:9953364645" className="hover:text-white font-bold text-white">+91 99533 64645</a>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
              <a href="mailto:sn_rksteel@yahoo.co.in" className="hover:text-white">sn_rksteel@yahoo.co.in</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-[#040C17] py-4 border-t border-navy-900 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            © {new Date().getFullYear()} RK Steel Company. All Rights Reserved. Building Strength. Delivering Trust.
          </div>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-gray-200">Admin Portal</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-200">Google Map Location</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
