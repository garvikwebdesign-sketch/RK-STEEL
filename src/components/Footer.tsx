import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Download, Award, MessageSquare } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-[#071322] text-slate-300 border-t border-slate-800">
      {/* Top Banner Accent */}
      <div className="bg-[#0B192C] py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="text-base text-white font-bold tracking-tight font-sans">
                Authorised Stockist &amp; Dealer — Tata Steel, SAIL, JSW Steel, Jindal Steel &amp; APL Apollo
              </h4>
              <p className="text-xs text-slate-400">
                Tata Tiscon • Tata Structura • Tata Durashine • SAIL SEQR • JSW Neosteel • APL Apollo • Jindal Panther
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:9999307984"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 fill-current" />
              Call +91 99993 07984
            </a>
            <Link
              href="/catalogues"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-700"
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
          <Logo variant="dark" size="md" />

          <p className="text-xs text-slate-400 leading-relaxed pr-4 mt-2">
            Established in 1993, <strong className="text-white">RK STEEL CO</strong> is Noida's premier stockist &amp; authorised distributor of genuine Tata Steel, SAIL, JSW Steel, Jindal Steel, and APL Apollo product lines with ready mill-certified inventory for construction &amp; industrial projects.
          </p>
          <div className="text-xs font-extrabold text-red-400 uppercase tracking-wide bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg inline-block font-sans">
            Har Zaroorat Ka Steel • All Steel &amp; Iron Items Under One Roof
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>30+ Years of Unwavering Excellence &amp; Trust (Est. 1993)</span>
          </div>
        </div>

        {/* Col 2: Authorised Brands Hub */}
        <div>
          <h4 className="text-xs text-white font-bold tracking-wider mb-4 uppercase font-sans border-b border-slate-800 pb-2">
            Authorised Brands
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/brands/tata-tiscon" className="hover:text-white transition-colors">Tata Tiscon TMT</Link></li>
            <li><Link href="/brands/sail-seqr" className="hover:text-white transition-colors">SAIL SEQR 550D</Link></li>
            <li><Link href="/brands/tata-structura" className="hover:text-white transition-colors">Tata Structura Pipes</Link></li>
            <li><Link href="/brands/tata-durashine" className="hover:text-white transition-colors">Tata Durashine Sheets</Link></li>
            <li><Link href="/brands/tata-astrum" className="hover:text-white transition-colors">Tata Astrum HR Sheets</Link></li>
            <li><Link href="/brands/jsw-neosteel" className="hover:text-white transition-colors">JSW Neosteel</Link></li>
            <li><Link href="/brands/apl-apollo" className="hover:text-white transition-colors">APL Apollo Tubes</Link></li>
            <li><Link href="/brands" className="hover:text-white transition-colors">Jindal Steel &amp; Power</Link></li>
          </ul>
        </div>

        {/* Col 3: Price Updates & Tools */}
        <div>
          <h4 className="text-xs text-white font-bold tracking-wider mb-4 uppercase font-sans border-b border-slate-800 pb-2">
            Price Rates &amp; Tools
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/price-list" className="hover:text-white font-semibold text-red-400">Daily Market Rates Hub</Link></li>
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
          <h4 className="text-xs text-white font-bold tracking-wider mb-4 uppercase font-sans border-b border-slate-800 pb-2">
            HEAD OFFICE
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">HEAD OFFICE</strong>
                <span>G-38, Sector - 9, Noida</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col space-y-0.5">
                <strong className="text-white font-semibold">CONTACT US</strong>
                <a href="tel:9999307984" className="hover:text-white font-bold text-white">+91 99993 07984</a>
                <div className="flex flex-wrap gap-x-2 text-slate-300">
                  <a href="tel:9953364645" className="hover:text-white">9953364645</a>
                  <span>|</span>
                  <a href="tel:9811364645" className="hover:text-white">9811364645</a>
                </div>
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
      <div className="bg-[#030914] py-4 border-t border-slate-900 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            © {new Date().getFullYear()} RK STEEL CO. All Steel and Iron Items Under One Roof. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-slate-300">Admin Portal</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300">Google Map Location</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

