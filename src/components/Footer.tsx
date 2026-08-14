import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Award, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#071526] text-gray-300 border-t-4 border-red-600">
      {/* Top Banner Accent */}
      <div className="bg-[#0F2A4A] py-6 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-gold-500 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-lg text-white font-bold tracking-wide">
                Authorised Dealer & Stockist of Premium Steel Brands
              </h4>
              <p className="text-xs text-gray-400">
                Tata Steel • Tata Tiscon • Tata Structura • SAIL • JSW Steel • AP Apollo
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-md"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full overflow-hidden border border-gold-500 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="RK Steel Company Noida logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-white">RK STEEL COMPANY</span>
              <div className="text-[10px] text-gold-400">ESTABLISHED IN 1993</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            With over 30 years of excellence, RK Steel Company is Noida's premier stockist and supplier of genuine Tata Steel, SAIL, JSW, and AP Apollo product lines.
          </p>
          <div className="flex items-center gap-2 text-xs text-gold-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>30+ Years of Excellence & Trust</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-heading text-base text-white font-bold tracking-wider mb-4 border-b border-navy-800 pb-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-gold-400 transition-colors">Home Page</Link></li>
            <li><Link href="/about" className="hover:text-gold-400 transition-colors">About RK Steel Company</Link></li>
            <li><Link href="/products" className="hover:text-gold-400 transition-colors">Steel Products Catalogue</Link></li>
            <li><Link href="/industries" className="hover:text-gold-400 transition-colors">Industries & Sectors We Serve</Link></li>
            <li><Link href="/calculators" className="hover:text-gold-400 transition-colors">Online Steel Weight Calculators</Link></li>
            <li><Link href="/blog" className="hover:text-gold-400 transition-colors">Industry News & Technical Blog</Link></li>
            <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact Head Office</Link></li>
          </ul>
        </div>

        {/* Col 3: Key Product Categories */}
        <div>
          <h4 className="font-heading text-base text-white font-bold tracking-wider mb-4 border-b border-navy-800 pb-2">
            Product Lines
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/products?category=TMT+Bars" className="hover:text-gold-400">Tata Tiscon & SAIL SEQR TMT Bars</Link></li>
            <li><Link href="/products?category=Pipes+%26+Hollow+Sections" className="hover:text-gold-400">Tata Structura MS Pipes</Link></li>
            <li><Link href="/products?category=Colour+Coated+%26+Roofing+Sheets" className="hover:text-gold-400">Tata Durashine Roofing Sheets</Link></li>
            <li><Link href="/products?category=MS%2FHR%2FCR%2FGI+Sheets+%26+Plates" className="hover:text-gold-400">Tata Astrum, Kosh & Steelium Sheets</Link></li>
            <li><Link href="/products?category=Structural+Steel" className="hover:text-gold-400">SAIL NEX & MS Structural Steel</Link></li>
            <li><Link href="/products?category=Weldmesh" className="hover:text-gold-400">MS Construction Weldmesh</Link></li>
            <li><Link href="/products?category=Chain+Link+%26+Accessories" className="hover:text-gold-400">GI Chain Link Fencing</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Office */}
        <div>
          <h4 className="font-heading text-base text-white font-bold tracking-wider mb-4 border-b border-navy-800 pb-2">
            Head Office Contact
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>G-38, Sector-9, Noida, Uttar Pradesh — 201301</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <a href="tel:9999307984" className="hover:text-gold-400">9999307984</a>
                <a href="tel:9953364645" className="hover:text-gold-400">9953364645</a>
                <a href="tel:9811364645" className="hover:text-gold-400">9811364645</a>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <a href="mailto:sn_rksteel@yahoo.co.in" className="hover:text-gold-400">sn_rksteel@yahoo.co.in</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#040C17] py-4 border-t border-navy-900 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            © {new Date().getFullYear()} RK Steel Company. All Rights Reserved. Building Strength. Delivering Trust.
          </div>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-gray-200">Admin Login</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-200">Head Office Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
