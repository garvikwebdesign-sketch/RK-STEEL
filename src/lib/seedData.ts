import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import { Admin } from "@/models/Admin";
import { Product } from "@/models/Product";
import { BlogPost } from "@/models/BlogPost";

export const initialProducts = [
  {
    name: "Tata Tiscon 550SD",
    brand: "Tata Tiscon",
    category: "TMT Bars",
    gradeStandard: "Fe 550SD (Super Ductile) / IS 1786",
    sizeRange: "6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm",
    description: "Tata Tiscon 550SD is India's leading GreenPro certified Super Ductile TMT bar. Manufactured with advanced Thermo-Mechanical Treatment, it provides high earthquake resistance, superior strength, and excellent bendability for high-rise buildings and infrastructure.",
    specs: [
      "Super Ductile grade with high strain capacity",
      "Earthquake resistant with uniform rib pattern",
      "GreenPro certified eco-friendly steel",
      "Superior corrosion resistance and fire resistance",
      "Authorised Dealer product with direct Tata Steel warranty test certificate"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "tata-tiscon-550sd"
  },
  {
    name: "Tata Durashine Roofing Sheets",
    brand: "Tata Durashine",
    category: "Colour Coated & Roofing Sheets",
    gradeStandard: "AZ150 Galvalume / IS 15965",
    sizeRange: "Thickness: 0.45mm - 0.60mm | Custom lengths available",
    description: "Tata Durashine colour-coated profile roofing sheets offer exceptional aesthetics, high heat reflection, and long-lasting durability against severe weather conditions. Ideal for residential roofs, industrial sheds, and commercial warehouses.",
    specs: [
      "High strength Galvalume substrate (55% Al-Zn alloy)",
      "Vibrant fade-resistant colours (Castle Red, Ocean Blue, Bright Green)",
      "High thermal reflectivity reduces indoor temperatures",
      "Anti-capillary groove prevents roof leakages",
      "100% genuine Tata Steel manufacture"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "tata-durashine-roofing-sheets"
  },
  {
    name: "Tata Structura MS Pipes & Hollow Sections",
    brand: "Tata Structura",
    category: "Pipes & Hollow Sections",
    gradeStandard: "YSt 210 / YSt 310 / IS 4923 & IS 1161",
    sizeRange: "Square: 25x25mm to 250x250mm | Rectangular: 50x25mm to 300x150mm | Thickness 1.6mm - 10mm",
    description: "Tata Structura Steel Hollow Sections are premium structural square, rectangular, and circular tubes. Engineered for high strength-to-weight ratio, crisp corners, and flawless surface finish in modern architecture and industrial frames.",
    specs: [
      "Uniform wall thickness and tight corner tolerances",
      "Conforms to IS 4923 & IS 1161 structural standards",
      "Superior torsional rigidity and light dead-weight",
      "Easy welding and galvanizing compatibility",
      "Authorised distribution from RK STEEL CO Noida stockyard"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "tata-structura-ms-pipes"
  },
  {
    name: "Jindal Panther 550D TMT Rebars",
    brand: "Jindal Steel",
    category: "TMT Bars",
    gradeStandard: "Fe 550D / IS 1786",
    sizeRange: "8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm",
    description: "Jindal Panther Fe 550D high-yield TMT bars manufactured from virgin iron ore. Engineered with parallel rib design for superior bonding and seismic safety.",
    specs: [
      "Produced in integrated steel plants from virgin iron ore",
      "Superior bendability and high yield strength",
      "Direct mill test certificate with each consignment",
      "Available ready stock at RK STEEL CO stockyard"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "jindal-panther-550d-tmt"
  },
  {
    name: "Tata Astrum HR Sheets & Coils",
    brand: "Tata Astrum",
    category: "MS/HR/CR/GI Sheets & Plates",
    gradeStandard: "IS 2062 E250 / E350, Commercial & Structural",
    sizeRange: "Thickness: 1.6mm to 20mm | Width: 1250mm, 1500mm",
    description: "Tata Astrum offers high-grade Hot Rolled sheets and coils processed with precise levelness, consistent mechanical properties, and minimal internal stress. Ideal for heavy fabrication, automotive bodies, and industrial tanks.",
    specs: [
      "Close dimensional tolerances and flat surface",
      "Consistent chemical composition and weldability",
      "Tested for impact toughness and bend performance",
      "Supplied with Tata Steel mill test certificates"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "tata-astrum-hr-sheets"
  },
  {
    name: "Tata Kosh GI Galvanised Sheets",
    brand: "Tata Kosh",
    category: "MS/HR/CR/GI Sheets & Plates",
    gradeStandard: "IS 277 Zinc Coated (120 GSM - 275 GSM)",
    sizeRange: "Thickness: 0.40mm to 3.0mm | Standard sheet sizes",
    description: "Tata Kosh plain and corrugated Galvanised Iron sheets are engineered with superior zinc coating adherence to resist rust and atmospheric corrosion across humid and industrial environments.",
    specs: [
      "Uniform spangle finish with zero flaking",
      "Corrosion resistant zinc barrier protection",
      "High tensile strength for fabrication and ducting",
      "100% genuine Tata product line"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "tata-kosh-gi-sheets"
  },
  {
    name: "Tata Steelium Cold Rolled (CR) Sheets & Coils",
    brand: "Tata Steelium",
    category: "MS/HR/CR/GI Sheets & Plates",
    gradeStandard: "IS 513 CR1 / CR2 / CR3 / CR4",
    sizeRange: "Thickness: 0.30mm to 2.50mm",
    description: "Tata Steelium is the premier brand for Cold Rolled steel. Known for super-smooth surface finish, high drawability, and uniform gauge control. Preferred for appliances, auto panels, and electrical enclosures.",
    specs: [
      "Ultra-smooth surface texture suitable for painting/powder coating",
      "Exact gauge uniformity along full coil length",
      "High formability and deep draw characteristics"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "tata-steelium-cr-sheets"
  },
  {
    name: "SAIL SEQR 550D TMT Rebars",
    brand: "SAIL",
    category: "TMT Bars",
    gradeStandard: "Fe 550D / IS 1786",
    sizeRange: "8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm",
    description: "SAIL SEQR (Super Equivalent Quality Rebar) 550D manufactured by Steel Authority of India Limited. Highly reliable thermo-mechanically treated rebars offering exceptional yield strength and high elongation.",
    specs: [
      "Government PSU quality assurance from SAIL integrated mills",
      "Fe 550D high ductility grade suitable for seismic zones IV & V",
      "Low carbon content for superior weldability",
      "Authorised stockist price guarantee"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "sail-seqr-550d-tmt"
  },
  {
    name: "SAIL NEX Heavy Structural Steel Sections",
    brand: "SAIL",
    category: "Structural Steel",
    gradeStandard: "IS 2062 E250 / E350 B0/C",
    sizeRange: "Beams (100x50 to 600x200mm), Channels (75x40 to 400x100mm), Angles",
    description: "SAIL NEX next-generation parallel flange beams, columns, and structural channels manufactured at SAIL's modern rolling mills. Offers high section modulus and lighter structural weight.",
    specs: [
      "Parallel flange design simplifies connection jointing",
      "High load bearing capacity with optimized dead load",
      "Strict compliance with BIS IS 2062 standards"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "sail-nex-structural-steel"
  },
  {
    name: "JSW Neosteel 550D TMT Bars",
    brand: "JSW Steel",
    category: "TMT Bars",
    gradeStandard: "Fe 550D / IS 1786",
    sizeRange: "8mm - 36mm",
    description: "JSW Neosteel 550D rebars are manufactured from 100% virgin iron ore. Highly refined, low in sulphur and phosphorus impurities, providing high bendability and bonded concrete grip.",
    specs: [
      "Virgin iron ore steelmaking for superior purity",
      "Advanced HYQST technology process",
      "High thermal stability in fire scenarios"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "jsw-neosteel-550d"
  },
  {
    name: "APL Apollo MS & GI Steel Pipes",
    brand: "APL Apollo",
    category: "Pipes & Hollow Sections",
    gradeStandard: "IS 1239 / IS 3589 / IS 4923",
    sizeRange: "15mm NB to 300mm NB | Light, Medium, Heavy classes",
    description: "APL Apollo Structural and Plumbing pipes for home construction, commercial fire sprinkler networks, and industrial piping. High quality ERW welded finish.",
    specs: [
      "Precision ERW longitudinal weld",
      "Hot-dip galvanised coating available for rust prevention",
      "Tested hydrostatic pressure resistance"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: true,
    slug: "ap-apollo-ms-gi-pipes"
  },
  {
    name: "MS Structural Angles & Channels",
    brand: "Generic Steel / SAIL / RINL",
    category: "Structural Steel",
    gradeStandard: "IS 2062 E250A",
    sizeRange: "Angles: 25x25x3mm to 150x150x16mm | Channels: 75x40mm to 300x90mm",
    description: "High grade Mild Steel equal angles, unequal angles, and structural channels stocked at RK STEEL CO Noida. Crucial for shed trusses, tower structures, and machinery beds.",
    specs: [
      "High yield strength and easy weldability",
      "Straight length accuracy with minimal twist",
      "Available in standard 6m and 12m stock lengths"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: false,
    slug: "ms-structural-angles-channels"
  },
  {
    name: "MS Weldmesh Construction Fabric",
    brand: "RK STEEL CO Line",
    category: "Weldmesh",
    gradeStandard: "IS 4948 / Commercial High Tensile",
    sizeRange: "Wire Dia: 2.0mm to 6.0mm | Mesh Grid: 25x25mm to 100x100mm",
    description: "Electric resistance welded MS steel mesh for concrete floor reinforcement, precast panels, security partitions, and window grilles.",
    specs: [
      "Strong shear resistance at every wire intersection",
      "Saves labor time compared to manual rebar tying",
      "Custom roll and sheet dimensions available"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: false,
    slug: "ms-weldmesh-fabric"
  },
  {
    name: "GI Chain Link Fencing & Accessories",
    brand: "RK STEEL CO Line",
    category: "Chain Link & Accessories",
    gradeStandard: "IS 2721 Heavy Galvanised",
    sizeRange: "Height: 3ft to 12ft | Gauge: 8 SWG to 14 SWG | Mesh: 2 inch to 4 inch",
    description: "Heavy-duty galvanised chain link wire mesh for boundary wall fencing, industrial plots, highway barriers, and agricultural enclosures. Complete with stay poles and tension wire.",
    specs: [
      "Heavy hot-dip galvanised wire withstands rust for decades",
      "Knuckle & twist edge selvage options",
      "Resilient flexible diamond weave pattern"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" }],
    authorisedDealer: false,
    slug: "gi-chain-link-fencing"
  }
];

export const initialBlogPosts = [
  {
    title: "Why Tata Tiscon 550SD is the Gold Standard for Earthquake-Resistant Construction in NCR",
    slug: "tata-tiscon-550sd-earthquake-resistant-steel-ncr",
    excerpt: "Discover how Tata Tiscon 550SD Super Ductile rebars safeguard high-rise residential and commercial buildings across Seismic Zone IV regions like Delhi-NCR.",
    contentHtml: `<p>Delhi-NCR, including Noida, Greater Noida, and Gurgaon, falls under <strong>Seismic Zone IV</strong>—a high-risk zone for severe earthquake ground movement. Building strong foundations in this region requires steel rebars that combine high yield strength with exceptional ductility.</p>
    <h3>What makes Fe 550SD Super Ductile?</h3>
    <p>Standard TMT bars can become brittle under extreme cyclical loading. Tata Tiscon 550SD features a unique micro-structure achieved through controlled Thermo-Mechanical Treatment. The 'SD' designation stands for Super Ductile, meaning the rebar can undergo significant elongation without snapping under seismic stress.</p>
    <ul>
      <li><strong>Higher Elongation (16%+):</strong> Allows the building structure to absorb dynamic energy during tremors.</li>
      <li><strong>Uniform Rib Pattern:</strong> Formulated using CNC-notch machines to ensure bond strength with concrete matrix.</li>
      <li><strong>GreenPro Certified:</strong> Reduced environmental impact during manufacturing.</li>
    </ul>
    <p>As an <strong>Authorised Dealer of Tata Steel in Noida since 1993</strong>, RK STEEL CO supplies 100% genuine Tata Tiscon rebars complete with manufacturer test certificates for every batch. Tagline: All Steel and Iron Items Under One Roof.</p>`,
    coverImage: { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
    author: "RK STEEL CO Technical Team",
    tags: ["Tata Tiscon", "TMT Bars", "Construction Tips", "Noida Steel"],
    published: true
  },
  {
    title: "Guide to Steel Weight Calculation: Formulas for Pipes, Sheets & Structural Sections",
    slug: "guide-to-steel-weight-calculation-formulas",
    excerpt: "Learn how civil engineers and site supervisors calculate unit steel weights in kg/m for MS pipes, square hollow sections, sheets, and angles using standard density constants.",
    contentHtml: `<p>Accurate steel weight estimation is essential for procurement, transport budgeting, and structural design. Steel density is universally benchmarked at <strong>7,850 kg/m³</strong> (or 0.00785 kg/cm³).</p>
    <h3>Key Formulas Used by Steel Traders:</h3>
    <ol>
      <li><strong>Steel Sheet / Plate:</strong> Weight (kg) = Length (m) × Width (m) × Thickness (mm) × 7.85</li>
      <li><strong>Circular Pipe:</strong> Weight (kg/m) = 0.02466 × Thickness (mm) × (Outer Diameter - Thickness)</li>
      <li><strong>Square Hollow Tube:</strong> Weight (kg/m) = 0.0314 × Thickness (mm) × (Side - Thickness)</li>
      <li><strong>Round TMT Bar:</strong> Weight (kg/m) = 0.006165 × Diameter² (mm)</li>
    </ol>
    <p>You can also use the live interactive <a href="/calculators">RK STEEL CO Weight Calculators</a> on our website for instant estimates across 9 different shapes!</p>`,
    coverImage: { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" },
    author: "RK STEEL CO Editorial",
    tags: ["Calculators", "Civil Engineering", "Steel Specs"],
    published: true
  },
  {
    title: "Choosing Roofing Sheets: Tata Durashine Galvalume vs. Standard GI Sheets",
    slug: "choosing-roofing-sheets-tata-durashine-vs-gi",
    excerpt: "Comparing thermal reflectivity, lifespan, and aesthetic durability between Galvalume colour-coated sheets and conventional galvanised sheets for industrial sheds and residential homes.",
    contentHtml: `<p>When building factory roofs, warehouses, or residential terrace sheds, choosing the right roofing sheet material directly impacts maintenance costs and indoor comfort.</p>
    <h3>Tata Durashine Galvalume Sheets:</h3>
    <p>Tata Durashine uses a 55% Aluminium-Zinc alloy coating. Aluminium provides barrier corrosion resistance while zinc provides sacrificial protection. The result is a sheet that lasts up to 4 times longer than standard GI sheets under tropical weather.</p>
    <h3>Benefits:</h3>
    <ul>
      <li>High solar reflection keeps factory floors cooler by 3°C - 5°C.</li>
      <li>Fitted with leak-proof anti-capillary grooves.</li>
      <li>Vibrant long-lasting paint finishes (Castle Red, Ocean Blue).</li>
    </ul>`,
    coverImage: { url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" },
    author: "RK STEEL CO Technical Team",
    tags: ["Tata Durashine", "Roofing Sheets", "Industrial Sheds"],
    published: true
  }
];

export async function seedDatabase() {
  await connectToDatabase();

  // 1. Seed Admin
  const adminUsername = process.env.ADMIN_SEED_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "admin123";
  const existingAdmin = await Admin.findOne({ username: adminUsername });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ username: adminUsername, passwordHash });
    console.log("Seeded initial admin account");
  }

  // 2. Seed Products
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(initialProducts);
    console.log("Seeded initial catalogue products");
  }

  // 3. Seed Blog Posts
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany(initialBlogPosts);
    console.log("Seeded initial blog posts");
  }
}
