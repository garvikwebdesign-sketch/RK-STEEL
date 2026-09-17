import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Download, Phone, Calculator, FileText, TrendingUp, PackageCheck, Award } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

const BRAND_DETAILS: Record<string, any> = {
  "tata-tiscon": {
    name: "Tata Tiscon TMT Rebars",
    parentCompany: "Tata Steel Ltd.",
    tagline: "India's First GreenPro Certified Super Ductile TMT Rebars",
    overview: "Tata Tiscon 550SD is India's leading high-strength TMT rebar manufactured using virgin iron ore and state-of-the-art automated rolling technology. Designed specifically for earthquake-prone zones across Delhi NCR, Tata Tiscon provides superior ductility, corrosion resistance, and rib pattern bonding with concrete.",
    availableSizes: ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm", "28mm", "32mm"],
    grades: ["Fe 500D", "Fe 550D", "Super Ductile (SD)"],
    bundleDetails: "Supplied in standard 12-meter straight lengths bundled with mill tags, hologram seal, and test certificate.",
    todayPricePerMT: "54,500",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "8 mm", weightPerMeterKg: 0.395, standardLengthM: 12.0, pieceWeightKg: 4.74 },
      { size: "10 mm", weightPerMeterKg: 0.617, standardLengthM: 12.0, pieceWeightKg: 7.40 },
      { size: "12 mm", weightPerMeterKg: 0.888, standardLengthM: 12.0, pieceWeightKg: 10.66 },
      { size: "16 mm", weightPerMeterKg: 1.580, standardLengthM: 12.0, pieceWeightKg: 18.96 },
      { size: "20 mm", weightPerMeterKg: 2.470, standardLengthM: 12.0, pieceWeightKg: 29.64 },
      { size: "25 mm", weightPerMeterKg: 3.850, standardLengthM: 12.0, pieceWeightKg: 46.20 },
      { size: "32 mm", weightPerMeterKg: 6.310, standardLengthM: 12.0, pieceWeightKg: 75.72 },
    ],
    features: [
      "100% Virgin Iron Ore Steel",
      "GreenPro Certified Eco-friendly TMT",
      "Superior Bendability & Fatigue Resistance",
      "Advanced Rib Pattern for Concrete Grip",
      "Mill Test Certificate Provided with Every Truckload",
    ],
  },
  "sail-seqr": {
    name: "SAIL SEQR 550D TMT Bars",
    parentCompany: "Steel Authority of India Ltd. (SAIL)",
    tagline: "Primary Public Sector Integrated Mill TMT Rebars",
    overview: "SAIL SEQR 550D TMT bars are manufactured at SAIL's integrated primary steel plants. Famous for high thermal resistance, consistent chemical composition, and strict adherence to IS 1786 standards, SAIL SEQR is preferred for bridge piers, metro projects, flyovers, and high-rise structures.",
    availableSizes: ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm", "28mm", "32mm", "36mm"],
    grades: ["Fe 500D", "Fe 550D"],
    bundleDetails: "Available in straight 12-meter lengths with clear SAIL brand embossing every meter.",
    todayPricePerMT: "52,800",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "8 mm", weightPerMeterKg: 0.395, standardLengthM: 12.0, pieceWeightKg: 4.74 },
      { size: "10 mm", weightPerMeterKg: 0.617, standardLengthM: 12.0, pieceWeightKg: 7.40 },
      { size: "12 mm", weightPerMeterKg: 0.888, standardLengthM: 12.0, pieceWeightKg: 10.66 },
      { size: "16 mm", weightPerMeterKg: 1.580, standardLengthM: 12.0, pieceWeightKg: 18.96 },
      { size: "20 mm", weightPerMeterKg: 2.470, standardLengthM: 12.0, pieceWeightKg: 29.64 },
      { size: "25 mm", weightPerMeterKg: 3.850, standardLengthM: 12.0, pieceWeightKg: 46.20 },
      { size: "32 mm", weightPerMeterKg: 6.310, standardLengthM: 12.0, pieceWeightKg: 75.72 },
    ],
    features: [
      "Produced in Integrated Steel Mills",
      "High Yield Stress & Tensile Strength",
      "Excellent Thermal & Fire Resistance",
      "Full Compliance with IS 1786 Specifications",
      "Direct Mill Dispatch for Bulk Tonnage",
    ],
  },
  "tata-structura": {
    name: "Tata Structura Hollow Sections",
    parentCompany: "Tata Steel Ltd.",
    tagline: "Square & Rectangular Steel Structural Tubes",
    overview: "Tata Structura hollow sections (SHS & RHS) offer higher strength-to-weight ratio compared to conventional structural angles and channels. Ideal for PEB industrial sheds, airport terminals, bridge structures, and architectural frames.",
    availableSizes: ["25x25mm", "50x50mm", "100x100mm", "150x150mm", "200x200mm", "300x300mm"],
    grades: ["YST 210", "YST 310"],
    bundleDetails: "Supplied in standard 6-meter and 12-meter mill lengths with anti-corrosion oil coating.",
    todayPricePerMT: "58,200",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "50 x 50 x 2.0 mm", weightPerMeterKg: 2.93, standardLengthM: 6.0, pieceWeightKg: 17.58 },
      { size: "50 x 50 x 3.0 mm", weightPerMeterKg: 4.25, standardLengthM: 6.0, pieceWeightKg: 25.50 },
      { size: "100 x 100 x 4.0 mm", weightPerMeterKg: 11.70, standardLengthM: 6.0, pieceWeightKg: 70.20 },
      { size: "150 x 150 x 5.0 mm", weightPerMeterKg: 22.30, standardLengthM: 6.0, pieceWeightKg: 133.80 },
    ],
    features: [
      "High Torsional Rigidity & Clean Aesthetics",
      "Lower Wind Resistance Surface",
      "Conforms to IS 4923 Standards",
      "Uniform Wall Thickness Tolerances",
    ],
  },
  "tata-durashine": {
    name: "Tata Durashine Roofing Sheets",
    parentCompany: "Tata Steel Ltd.",
    tagline: "Premium Colour-Coated Galvalume Profile Sheets",
    overview: "Tata Durashine colour-coated Galvalume roofing sheets offer unparalleled corrosion resistance, vibrant aesthetics, and superior thermal insulation for industrial sheds, warehouses, and modern residential roofs.",
    availableSizes: ["0.45mm", "0.50mm", "0.60mm"],
    grades: ["AZ150 Galvalume / IS 15965"],
    bundleDetails: "Supplied in standard sheets and custom cut-to-length options.",
    todayPricePerMT: "68,500",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "0.45 mm x 1060 mm", weightPerMeterKg: 3.85, standardLengthM: 3.66, pieceWeightKg: 14.09 },
      { size: "0.50 mm x 1060 mm", weightPerMeterKg: 4.28, standardLengthM: 3.66, pieceWeightKg: 15.66 },
      { size: "0.60 mm x 1060 mm", weightPerMeterKg: 5.12, standardLengthM: 3.66, pieceWeightKg: 18.74 },
    ],
    features: [
      "AZ150 Aluminium-Zinc Alloy Coating",
      "Anti-Capillary Leak Proof Groove",
      "High Solar Reflectance Index (Cool Roof)",
      "100% Genuine Tata Steel Quality",
    ],
  },
  "tata-astrum": {
    name: "Tata Astrum HR Sheets & Coils",
    parentCompany: "Tata Steel Ltd.",
    tagline: "Precision Engineered Hot Rolled Sheets, Plates & Coils",
    overview: "Tata Astrum offers high-grade Hot Rolled (HR) sheets, plates, and coils processed with superior levelness, consistent mechanical properties, and minimal internal stress. Widely trusted for heavy fabrication, automotive chassis, agricultural equipment, and pre-engineered buildings.",
    availableSizes: ["1.6mm", "2.0mm", "2.5mm", "3.15mm", "4.0mm", "5.0mm", "6.0mm", "8.0mm", "10.0mm", "12.0mm"],
    grades: ["IS 2062 E250 / E350", "SAILMA", "High Tensile HR"],
    bundleDetails: "Supplied in standard cut sheet bundles or full slit coils with mill test certificates and guarantee tags.",
    todayPricePerMT: "57,500",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "2.0 mm (1250 x 2500)", weightPerMeterKg: 15.70, standardLengthM: 2.5, pieceWeightKg: 49.06 },
      { size: "3.15 mm (1250 x 2500)", weightPerMeterKg: 24.73, standardLengthM: 2.5, pieceWeightKg: 77.27 },
      { size: "4.0 mm (1250 x 2500)", weightPerMeterKg: 31.40, standardLengthM: 2.5, pieceWeightKg: 98.13 },
      { size: "5.0 mm (1250 x 2500)", weightPerMeterKg: 39.25, standardLengthM: 2.5, pieceWeightKg: 122.66 },
      { size: "6.0 mm (1250 x 2500)", weightPerMeterKg: 47.10, standardLengthM: 2.5, pieceWeightKg: 147.19 },
      { size: "8.0 mm (1250 x 2500)", weightPerMeterKg: 62.80, standardLengthM: 2.5, pieceWeightKg: 196.25 },
      { size: "10.0 mm (1250 x 2500)", weightPerMeterKg: 78.50, standardLengthM: 2.5, pieceWeightKg: 245.31 },
    ],
    features: [
      "Superior Surface Finish & Close Thickness Tolerances",
      "Low Internal Stress for Precision Laser & Plasma Cutting",
      "High Formability, Drawability and Weldability",
      "Supplied with Authentic Tata Steel Mill Test Certificates",
    ],
  },
  "jsw-neosteel": {
    name: "JSW Neosteel TMT Rebars",
    parentCompany: "JSW Steel Ltd.",
    tagline: "High Strength Virgin Ore TMT Bars",
    overview: "JSW Neosteel Fe 550D TMT bars are manufactured from 100% virgin iron ore with lowest level of tramp elements. Engineered for high tensile strength, bendability, and seismic resistance in infrastructure.",
    availableSizes: ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm", "32mm"],
    grades: ["Fe 500D", "Fe 550D"],
    bundleDetails: "Supplied in 12m standard lengths with mill test certificates.",
    todayPricePerMT: "53,500",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "8 mm", weightPerMeterKg: 0.395, standardLengthM: 12.0, pieceWeightKg: 4.74 },
      { size: "10 mm", weightPerMeterKg: 0.617, standardLengthM: 12.0, pieceWeightKg: 7.40 },
      { size: "12 mm", weightPerMeterKg: 0.888, standardLengthM: 12.0, pieceWeightKg: 10.66 },
      { size: "16 mm", weightPerMeterKg: 1.580, standardLengthM: 12.0, pieceWeightKg: 18.96 },
      { size: "20 mm", weightPerMeterKg: 2.470, standardLengthM: 12.0, pieceWeightKg: 29.64 },
    ],
    features: [
      "100% Virgin Iron Ore Manufacturing",
      "Low Phosphorus and Sulphur Content",
      "Super Ductility and Fatigue Resistance",
    ],
  },
  "apl-apollo": {
    name: "APL Apollo MS & GI Pipes",
    parentCompany: "APL Apollo Tubes Ltd.",
    tagline: "Structural Tubes & Galvanised Steel Pipes",
    overview: "APL Apollo is India's largest structural steel tube and pipe manufacturer. Used extensively in fire fighting, plumbing, industrial sheds, solar mounting structures, and modern framing.",
    availableSizes: ["15mm NB", "25mm NB", "50mm NB", "100mm NB", "150mm NB", "200mm NB"],
    grades: ["IS 1239", "IS 3589", "IS 4923"],
    bundleDetails: "Supplied in 6m standard lengths with mill caps.",
    todayPricePerMT: "59,000",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "25 mm NB (Medium)", weightPerMeterKg: 2.41, standardLengthM: 6.0, pieceWeightKg: 14.46 },
      { size: "50 mm NB (Medium)", weightPerMeterKg: 5.03, standardLengthM: 6.0, pieceWeightKg: 30.18 },
      { size: "100 mm NB (Medium)", weightPerMeterKg: 12.10, standardLengthM: 6.0, pieceWeightKg: 72.60 },
    ],
    features: [
      "High Frequency ERW Welding",
      "Uniform Wall Thickness & Hot Dip Galvanising",
      "Hydrostatically Tested Quality",
    ],
  },
  "jindal-panther": {
    name: "Jindal Panther TMT",
    parentCompany: "Jindal Steel & Power Ltd.",
    tagline: "Parallel Rib High Yield Rebars for Seismic Protection",
    overview: "Jindal Panther Fe 550D TMT rebars are produced from pure virgin iron ore in integrated plants. With superior yield strength and uniform elongation, Jindal Panther protects high-rise and infrastructure projects across India.",
    availableSizes: ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm", "32mm"],
    grades: ["Fe 500D", "Fe 550D"],
    bundleDetails: "Standard 12-meter straight lengths with test certificates.",
    todayPricePerMT: "53,200",
    pdfCatalogueUrl: "/catalogues",
    weightChart: [
      { size: "8 mm", weightPerMeterKg: 0.395, standardLengthM: 12.0, pieceWeightKg: 4.74 },
      { size: "10 mm", weightPerMeterKg: 0.617, standardLengthM: 12.0, pieceWeightKg: 7.40 },
      { size: "12 mm", weightPerMeterKg: 0.888, standardLengthM: 12.0, pieceWeightKg: 10.66 },
      { size: "16 mm", weightPerMeterKg: 1.580, standardLengthM: 12.0, pieceWeightKg: 18.96 },
      { size: "20 mm", weightPerMeterKg: 2.470, standardLengthM: 12.0, pieceWeightKg: 29.64 },
    ],
    features: [
      "Produced from Clean Virgin Steel",
      "Parallel Rib Pattern for Strong Concrete Bond",
      "High Weldability and Seismic Resilience",
    ],
  },
};

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = BRAND_DETAILS[slug] || BRAND_DETAILS["tata-tiscon"];

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-navy-900 text-red-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-navy-700">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                DIRECT AUTHORISED MILL LANDING PAGE • RK STEEL CO
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
                {brand.name}
              </h1>
              <p className="text-gray-300 text-sm max-w-2xl font-light">
                {brand.tagline} • Authorised Stockist &amp; Dealer at RK STEEL CO Noida &amp; Delhi NCR.
              </p>
            </div>

            {/* Official Vector Brand Logo Card */}
            <div className="bg-white p-4 rounded-2xl border-2 border-white/20 shadow-xl flex items-center justify-center self-start md:self-auto min-w-[200px] h-20">
              <BrandLogo brand={slug} className="max-h-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-xl">
                ₹
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Today's Estimated Rate</div>
                <div className="font-heading text-xl font-bold text-navy-950">₹{brand.todayPricePerMT} <span className="text-xs font-normal text-gray-500">/ MT</span></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <PackageCheck className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Stock Availability</div>
                <div className="font-heading text-base font-bold text-navy-950">Ready Stock at Yard</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Mill Parent</div>
                <div className="font-heading text-base font-bold text-navy-950">{brand.parentCompany}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
              <a
                href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20want%20to%20inquire%20about%20today%27s%20price%20for%20${encodeURIComponent(brand.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider block"
              >
                Inquire Price on WhatsApp
              </a>
            </div>
          </div>

          {/* Overview & Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h2 className="font-heading text-2xl font-bold text-navy-950 border-b border-gray-100 pb-3">
                Product Overview &amp; Technical Description
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {brand.overview}
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="font-heading text-base font-bold text-navy-950">Key Product Advantages:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {brand.features.map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Request Box */}
            <div className="lg:col-span-5 bg-navy-950 text-white p-8 rounded-2xl border-2 border-navy-800 shadow-xl space-y-6">
              <h3 className="font-heading text-2xl font-bold">Request Instant Tonnage Quote</h3>
              <p className="text-xs text-gray-300">
                Get mill-direct pricing and dispatch timelines directly from RK STEEL CO sales advisors.
              </p>
              <div className="text-[11px] font-bold text-red-400 uppercase bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                ALL STEEL AND IRON ITEMS UNDER ONE ROOF
              </div>
              <div className="space-y-4 pt-2">
                <a
                  href="tel:9999307984"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Call +91 99993 07984 / 9953364645
                </a>
                <Link
                  href="/calculators"
                  className="w-full bg-navy-900 hover:bg-navy-800 text-red-400 border border-red-500/30 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Steel Weight Online
                </Link>
                <Link
                  href="/catalogues"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Official PDF Catalogue
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Weight Chart & Spec Table */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy-950">
                  Standard Nominal Weight &amp; Size Chart
                </h3>
                <p className="text-xs text-gray-500">As per IS 1786 / IS 4923 standard specification guidelines.</p>
              </div>
              <Link
                href="/calculators"
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                Use Steel Weight Calculator →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-700">
                <thead className="bg-gray-100 text-navy-950 font-bold uppercase text-[11px] border-b border-gray-200">
                  <tr>
                    <th className="p-3">Standard Size</th>
                    <th className="p-3">Weight per Meter (kg/m)</th>
                    <th className="p-3">Standard Length (m)</th>
                    <th className="p-3">Weight per Piece (kg)</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {brand.weightChart.map((row: any, rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-bold text-navy-950">{row.size}</td>
                      <td className="p-3 font-medium text-red-600">{row.weightPerMeterKg} kg/m</td>
                      <td className="p-3">{row.standardLengthM} m</td>
                      <td className="p-3 font-bold text-navy-950">{row.pieceWeightKg} kg</td>
                      <td className="p-3">
                        <a
                          href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20am%20interested%20in%20${encodeURIComponent(brand.name)}%20size%20${encodeURIComponent(row.size)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] bg-red-50 text-red-600 font-bold px-2.5 py-1 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Inquire Size Rate
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
