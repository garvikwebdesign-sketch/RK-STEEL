const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://samarpansingh17_db_user:DyKdGAmK5iYltVHv@cluster0.ikaahha.mongodb.net/rk_steel";

const products = [
  // 1. TMT Bars (3 Products)
  {
    name: "Tata Tiscon 550SD TMT Rebars",
    title: "Tata Tiscon 550SD TMT Rebars",
    brand: "Tata Tiscon",
    category: "TMT Bars",
    gradeStandard: "Fe 550SD (Super Ductile) / IS 1786:2008",
    sizeRange: "6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm, 36mm, 40mm",
    description: "Tata Tiscon 550SD is India's leading GreenPro certified Super Ductile TMT rebar. Manufactured with advanced Thermo-Mechanical Treatment, it provides high earthquake resistance, superior strength, and excellent bendability for high-rise buildings and infrastructure.",
    specs: [
      "Super Ductile grade with high strain capacity (min 14.5% uniform elongation)",
      "High UTS/YS ratio (> 1.15) for superior seismic energy dissipation",
      "GreenPro certified eco-friendly steel reducing carbon footprint",
      "Superior corrosion resistance and fire resistance",
      "Direct Tata Steel warranty test certificate with batch QR code on every bundle"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-tiscon-550sd"
  },
  {
    name: "Tata Tiscon CRS 550D TMT Rebars",
    title: "Tata Tiscon CRS 550D TMT Rebars",
    brand: "Tata Tiscon",
    category: "TMT Bars",
    gradeStandard: "Fe 550D CRS (Corrosion Resistant Steel) / IS 1786",
    sizeRange: "8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm",
    description: "Tata Tiscon CRS is specially engineered with micro-alloying elements (Copper, Chromium, and Phosphorus) to form a dense, passive oxide protective layer that retards rusting in aggressive saline, coastal, and high-groundwater environments.",
    specs: [
      "Micro-alloyed with Cu, Cr, and P for dense protective rust-retardant layer",
      "2x longer service life compared to standard TMT bars in coastal conditions",
      "High yield strength (550 MPa) with exceptional bendability and weldability",
      "Ideal for bridges, dams, coastal structures, sewage plants, and wet basements",
      "Exceeds IS 1786 corrosion resistance and mechanical requirements"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-tiscon-crs-550d"
  },
  {
    name: "Tata Tiscon Superlinks & Ultima GFX Stirrups",
    title: "Tata Tiscon Superlinks & Ultima GFX Stirrups",
    brand: "Tata Tiscon",
    category: "TMT Bars",
    gradeStandard: "Fe 500D / IS 1786 Machine-Made Stirrups / IS 13920",
    sizeRange: "7x7\", 7x9\", 7x12\", 7x15\", 8x8\", 9x9\", 9x12\" (6mm, 8mm & 10mm bar dia)",
    description: "Tata Tiscon Superlinks are machine-made stirrups manufactured using automated CNC bending technology. They feature exact 135-degree seismic hooks and 10d lengths mandated by Indian earthquake codes to keep RCC columns locked securely.",
    specs: [
      "Factory automated CNC machine bending with exact 135° seismic hooks",
      "10d hook length as mandated by Indian Seismic Code IS 13920",
      "Zero site-bending micro-fractures; prevents column shear failure during tremors",
      "Ready-to-use factory bundles; eliminates scrap loss and saves up to 40% site labor",
      "Available in Ultima GFX zinc-polymer coated variants for anti-rust protection"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-tiscon-superlinks-stirrups"
  },

  // 2. Pipes & Hollow Sections (3 Products)
  {
    name: "Tata Structura Square Hollow Sections (SHS)",
    title: "Tata Structura Square Hollow Sections (SHS)",
    brand: "Tata Structura",
    category: "Pipes & Hollow Sections",
    gradeStandard: "YSt 210 / YSt 310 / YSt 355 / IS 4923",
    sizeRange: "15x15mm to 250x250mm | Wall Thickness: 1.6mm to 10.0mm",
    description: "Tata Structura Steel Square Hollow Sections are premium structural tubes engineered for high strength-to-weight ratio, crisp corners, and flawless surface finish in modern architecture, PEB structures, and industrial frames.",
    specs: [
      "Uniform wall thickness and tight corner radii tolerances",
      "Conforms strictly to IS 4923 structural steel standards",
      "High torsional rigidity and superior resistance to lateral buckling",
      "Smooth finish ideal for architectural facades and easy galvanizing/painting",
      "Direct authorised distribution from RK STEEL CO Noida stockyard"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-structura-square-hollow-sections"
  },
  {
    name: "Tata Structura Rectangular Hollow Sections (RHS)",
    title: "Tata Structura Rectangular Hollow Sections (RHS)",
    brand: "Tata Structura",
    category: "Pipes & Hollow Sections",
    gradeStandard: "YSt 210 / YSt 310 / YSt 355 / IS 4923",
    sizeRange: "40x20mm to 300x150mm | Wall Thickness: 2.0mm to 10.0mm",
    description: "Tata Structura Rectangular Hollow Sections are optimized for asymmetric bending loads in roof purlins, rafters, and building trusses. Up to 30% lighter than conventional open channel and beam sections.",
    specs: [
      "Engineered for asymmetric bending loads in roof purlins and building trusses",
      "Up to 30% steel tonnage reduction compared to traditional hot-rolled channels",
      "Smooth interior weld seam and tight dimensional tolerances",
      "Tested for flattening, bending, and tensile strength per IS 4923",
      "Available in standard 6m and custom factory cut lengths"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-structura-rectangular-hollow-sections"
  },
  {
    name: "Tata Structura Circular Hollow Sections (CHS / Pipes)",
    title: "Tata Structura Circular Hollow Sections (CHS / Pipes)",
    brand: "Tata Structura",
    category: "Pipes & Hollow Sections",
    gradeStandard: "IS 1161 / IS 1239 / YSt 210 / YSt 310",
    sizeRange: "15mm NB (1/2\") to 300mm NB (12\") | Light, Medium & Heavy classes",
    description: "Tata Structura Circular Hollow Sections are seamless and high-frequency induction welded structural steel pipes offering equal strength along all axes, making them ideal for heavy columns, trusses, and solar structures.",
    specs: [
      "Uniform circular cross-section offers identical moment of inertia in all axes",
      "Aerodynamic round profile minimizes wind resistance on tall structures and solar frames",
      "Tested for hydrostatic pressure, drift expansion, and tensile yield",
      "Available in black plain-ended, bevelled, or hot-dip galvanized (GI) finish",
      "Fully compliant with National Building Code (NBC) requirements"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-structura-circular-hollow-sections"
  },

  // 3. Colour Coated & Roofing Sheets (3 Products)
  {
    name: "Tata Durashine® Roof Profile Colour Coated Sheets",
    title: "Tata Durashine® Roof Profile Colour Coated Sheets",
    brand: "Tata Durashine",
    category: "Colour Coated & Roofing Sheets",
    gradeStandard: "Galvalume AZ150 / IS 15965 / AS 1397 (550 MPa)",
    sizeRange: "Thickness: 0.37mm, 0.47mm, 0.52mm, 0.62mm | Lengths: 8ft, 10ft, 12ft, 14ft, 16ft | Width: 1072mm (Cover: 1015mm)",
    description: "Tata Durashine roof profile sheets feature a high-strength 55% Aluminum-Zinc Galvalume AZ150 alloy coating. Specially engineered with an anti-capillary groove, it offers unmatched leak protection, thermal comfort, and aesthetic beauty for homes and industries.",
    specs: [
      "High strength Galvalume AZ150 alloy substrate (55% Al, 43.4% Zn, 1.6% Si)",
      "Patented anti-capillary groove completely prevents roof leakages at overlaps",
      "High solar reflectivity lowers indoor room temperatures by up to 5°C",
      "Fade-resistant organic paint coat in Castle Red, Cool Blue, Bright Green, Asian White",
      "Up to 4x longer rust-free life compared to standard galvanised iron sheets"
    ],
    images: [{ url: "https://tatasteelcolors.com/wp-content/uploads/2024/12/roof.jpg" }],
    imageUrl: "https://tatasteelcolors.com/wp-content/uploads/2024/12/roof.jpg",
    authorisedDealer: true,
    slug: "tata-durashine-roof-profile-sheets"
  },
  {
    name: "Tata Durashine® Wall Cladding Profile Sheets",
    title: "Tata Durashine® Wall Cladding Profile Sheets",
    brand: "Tata Durashine",
    category: "Colour Coated & Roofing Sheets",
    gradeStandard: "Galvalume AZ150 / IS 15965 / AS 1397",
    sizeRange: "Thickness: 0.37mm, 0.47mm, 0.52mm | Lengths: 8ft, 10ft, 12ft, 14ft | Width: 1150mm (Cover: 1110mm)",
    description: "Tata Durashine Wall Profile sheets provide a modern, architecturally clean fluted appearance for commercial building facades, warehouse exterior walls, and partitions with superior 1110mm effective coverage.",
    specs: [
      "Wider 1110mm effective cover width reduces total joints and installation time",
      "Fluted architectural micro-rib profile provides high vertical rigidity against wind loads",
      "Scratch, peeling, and UV degradation resistant multi-layer polyester paint system",
      "Non-combustible fire-safe cladding suitable for industrial safety norms",
      "Direct authorised dealer supply with Tata Steel warranty certification"
    ],
    images: [{ url: "https://tatasteelcolors.com/wp-content/uploads/2024/12/wall.jpg" }],
    imageUrl: "https://tatasteelcolors.com/wp-content/uploads/2024/12/wall.jpg",
    authorisedDealer: true,
    slug: "tata-durashine-wall-cladding-sheets"
  },
  {
    name: "Tata Durashine® Tile Profile Sheets & Accessories",
    title: "Tata Durashine® Tile Profile Sheets & Accessories",
    brand: "Tata Durashine",
    category: "Colour Coated & Roofing Sheets",
    gradeStandard: "Galvalume AZ150 / IS 15965",
    sizeRange: "Thickness: 0.45mm, 0.50mm | Custom stepped profile lengths | Ridges: 2.44m (8ft)",
    description: "Tata Durashine Tile Profile sheets combine the timeless charm of European terracotta roof tiles with the lightweight durability and leak-proof integrity of high-tensile Galvalume steel.",
    specs: [
      "Stepped terracotta tile aesthetic without the weight or brittleness of clay tiles",
      "Lightweight system reduces timber or steel roof framing structure cost by 70%",
      "Complete range of matching accessories: Galvalume Ridge Caps, Valleys & Barge Boards",
      "Precision-formed interlocking lap prevents water capillary ingress even in storm rains",
      "Available in warm terracotta, deep brown, and heritage red colors"
    ],
    images: [{ url: "https://tatasteelcolors.com/wp-content/uploads/2026/02/durashine-roof-and-wall2-copy-2.webp" }],
    imageUrl: "https://tatasteelcolors.com/wp-content/uploads/2026/02/durashine-roof-and-wall2-copy-2.webp",
    authorisedDealer: true,
    slug: "tata-durashine-tile-profile-sheets"
  },

  // 4. MS/HR/CR/GI Sheets & Plates (3 Products)
  {
    name: "Tata Astrum Hot Rolled (HR) Steel Sheets & Plates",
    title: "Tata Astrum Hot Rolled (HR) Steel Sheets & Plates",
    brand: "Tata Astrum",
    category: "MS/HR/CR/GI Sheets & Plates",
    gradeStandard: "IS 2062 E250 / E350 (Grade A, B, BR) / ASTM A36",
    sizeRange: "Thickness: 1.6mm to 25.0mm | Width: 1250mm, 1500mm, 2000mm | Length: 2500mm to 12000mm",
    description: "Tata Astrum offers high-grade Hot Rolled sheets and plates processed with superior levelness, consistent mechanical properties, and minimal internal stress. Ideal for heavy fabrication, automotive chassis, and pre-engineered buildings.",
    specs: [
      "Superior surface levelness and flatness achieved through automated skin-pass mills",
      "Close thickness tolerances with zero internal laminations or edge cracking",
      "Exceptional weldability, cold-forming, and high-precision laser/plasma cutting",
      "Guaranteed yield strength and Charpy V-notch impact toughness",
      "Supplied with authentic Tata Steel mill test certificates and heat traceability"
    ],
    images: [{ url: "https://www.tatasteel.com/media/3293/tata-astrum2.jpg" }],
    imageUrl: "https://www.tatasteel.com/media/3293/tata-astrum2.jpg",
    authorisedDealer: true,
    slug: "tata-astrum-hr-sheets-plates"
  },
  {
    name: "Tata Astrum Hot Rolled (HR) Steel Coils",
    title: "Tata Astrum Hot Rolled (HR) Steel Coils",
    brand: "Tata Astrum",
    category: "MS/HR/CR/GI Sheets & Plates",
    gradeStandard: "IS 2062 / IS 10748 / Commercial & High Tensile",
    sizeRange: "Thickness: 1.6mm to 16.0mm | Coil Width: 900mm to 2000mm | Weight: 5 MT to 28 MT",
    description: "Prime hot rolled steel coils manufactured from 100% virgin iron ore in Tata Steel integrated blast furnaces. Engineered for consistent metallurgical properties throughout coil length for precision roll-forming and stamping.",
    specs: [
      "High-purity continuous cast steel with ultra-low sulfur and phosphorus content",
      "Uniform grain structure guaranteeing consistent mechanical properties from start to tail",
      "Available in black unpickled or Pickled & Oiled (HRPO) surface condition",
      "In-house coil de-coiling, slitting, and blanking capabilities at RK STEEL CO",
      "Trusted by automotive OEMs, yellow-goods makers, and structural pipe roll-formers"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-astrum-hr-steel-coils"
  },
  {
    name: "Tata Steelium Cold Rolled (CR) & Tata Kosh GI Sheets",
    title: "Tata Steelium Cold Rolled (CR) & Tata Kosh GI Sheets",
    brand: "Tata Steel",
    category: "MS/HR/CR/GI Sheets & Plates",
    gradeStandard: "CR: IS 513 CR1/CR2/CR3 (Deep Drawing) | GI: IS 277 (120 - 275 GSM Zinc)",
    sizeRange: "Thickness: 0.40mm to 3.0mm | Width: 900mm, 1000mm, 1220mm, 1250mm",
    description: "Tata Steelium cold rolled sheets feature a mirror-smooth surface finish for premium painting and powder coating, alongside Tata Kosh hot-dip galvanized sheets with uniform zinc spangle for long-lasting corrosion prevention.",
    specs: [
      "Mirror-smooth cold-rolled surface finish ready for immediate powder coating",
      "Deep drawing capability with zero surface fluting, wrinkling, or stretcher strains",
      "Tata Kosh zero-spangle / minimized-spangle uniform zinc coating for 100% rust immunity",
      "Accurate diagonal squaring and burr-free slitted edges",
      "Widely used in electrical control panels, HVAC ducting, appliances, and auto body panels"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "tata-steelium-cr-tata-kosh-gi-sheets"
  },

  // 5. Structural Steel (3 Products)
  {
    name: "Mild Steel (MS) Equal & Unequal Structural Angles",
    title: "Mild Steel (MS) Equal & Unequal Structural Angles",
    brand: "SAIL / Jindal / Primary Mills",
    category: "Structural Steel",
    gradeStandard: "IS 2062:2011 E250 / E350 (Grade A & BR)",
    sizeRange: "Equal: 20x20x3mm to 200x200x25mm | Unequal: 65x45mm to 200x150mm | Length: 6m to 12m",
    description: "Prime hot-rolled structural steel L-angles with sharp 90-degree internal angle geometry. Forms the backbone of industrial sheds, power transmission towers, bridge bracing, and structural frames.",
    specs: [
      "Hot-rolled prime structural steel with high yield and tensile strength (IS 2062)",
      "Sharp 90-degree corners with consistent leg thickness and straight axis",
      "Superior weldability and machinability for industrial trusses, shed framing, and towers",
      "Tested for Charpy V-notch impact toughness (E250BR)",
      "Supplied with complete mill test certificate confirming chemical and mechanical properties"
    ],
    images: [{ url: "https://ssellp.com/wp-content/uploads/2023/03/MS-Angle-Channel-Beam.png" }],
    imageUrl: "https://ssellp.com/wp-content/uploads/2023/03/MS-Angle-Channel-Beam.png",
    authorisedDealer: true,
    slug: "mild-steel-equal-unequal-structural-angles"
  },
  {
    name: "Mild Steel (MS) Structural Channels (ISMC Sections)",
    title: "Mild Steel (MS) Structural Channels (ISMC Sections)",
    brand: "SAIL / RINL (Vizag) / Jindal Steel",
    category: "Structural Steel",
    gradeStandard: "IS 2062:2011 E250 / IS 808 (ISMC)",
    sizeRange: "ISMC 75x40mm up to ISMC 400x100mm | Lengths: 6m to 12m",
    description: "Standard structural C-channels with tapered or parallel flanges, engineered to carry heavy bending loads in building purlins, truck chassis, crane gantries, and industrial column bracing.",
    specs: [
      "Heavy-duty tapered and parallel flange C-channel profiles per IS 808",
      "High section modulus (Z-axis) resisting vertical and lateral bending deflection",
      "Smooth surface finish suitable for hot-dip galvanizing and industrial anti-rust primer",
      "Direct mill sourcing ensures zero blowholes, scabs, or rolling flaws",
      "Ready stock available at standard weights per meter with test reports"
    ],
    images: [{ url: "https://ssellp.com/wp-content/uploads/2023/03/MS-Angle-Channel-Beam.png" }],
    imageUrl: "https://ssellp.com/wp-content/uploads/2023/03/MS-Angle-Channel-Beam.png",
    authorisedDealer: true,
    slug: "mild-steel-structural-channels-ismc"
  },
  {
    name: "Mild Steel (MS) Beams & Joists (ISMB / Heavy Columns)",
    title: "Mild Steel (MS) Beams & Joists (ISMB / Heavy Columns)",
    brand: "SAIL / Jindal Steel / JSPL",
    category: "Structural Steel",
    gradeStandard: "IS 2062:2011 E250 / E350 / IS 808 (ISMB, NPB, WPB)",
    sizeRange: "ISMB 100x50mm up to ISMB 600x210mm | Heavy Wide Flange Beams up to 600mm",
    description: "Heavy hot-rolled I-beams and joists designed for primary vertical columns and horizontal floor beams in high-rise buildings, multi-level warehouses, and highway bridge superstructures.",
    specs: [
      "Exceptional moment of inertia resisting heavy dynamic, dead, and seismic loads",
      "Wide parallel flanges for rigid bolted, riveted, and welded connections",
      "Controlled chemical composition ensuring superior weldability and ductility",
      "Strict compliance with Bureau of Indian Standards (BIS) weight tolerances",
      "Available in standard mill lengths of 11m, 12m, and custom cut lengths"
    ],
    images: [{ url: "https://ssellp.com/wp-content/uploads/2023/03/MS-Angle-Channel-Beam.png" }],
    imageUrl: "https://ssellp.com/wp-content/uploads/2023/03/MS-Angle-Channel-Beam.png",
    authorisedDealer: true,
    slug: "mild-steel-beams-joists-ismb"
  },

  // 6. Weldmesh (3 Products)
  {
    name: "Heavy Duty MS Structural Reinforcement Weldmesh",
    title: "Heavy Duty MS Structural Reinforcement Weldmesh",
    brand: "RK Steel / Authorised Mill",
    category: "Weldmesh",
    gradeStandard: "IS 1566 / IS 432 Hard Drawn High Tensile Wire",
    sizeRange: "Wire Dia: 2.5mm to 8.0mm | Mesh Opening: 25x25mm (1\"x1\") to 150x150mm (6\"x6\") | Sheet: 4ft x 8ft, 5ft x 10ft",
    description: "Heavy-duty welded steel wire fabric produced through automated electric resistance welding. Replaces manual rebar tying in concrete floors, industrial slabs, culverts, and precast panels.",
    specs: [
      "Electric resistance-welded intersections for maximum shear strength at every joint",
      "Cuts concrete floor reinforcement placement time by up to 50%",
      "Rigid flat sheets ensure uniform cover and crack control without warping",
      "Reduces steel rebar wastage by eliminating manual overlapping ties",
      "Tested for weld shear strength and wire tensile strength per IS 1566"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "heavy-duty-ms-reinforcement-weldmesh"
  },
  {
    name: "Galvanised (GI) Welded Wire Mesh Rolls & Sheets",
    title: "Galvanised (GI) Welded Wire Mesh Rolls & Sheets",
    brand: "RK Steel / Authorised Mill",
    category: "Weldmesh",
    gradeStandard: "IS 280 Hot Dip Galvanised Wire (80 - 120 GSM Zinc)",
    sizeRange: "Wire Dia: 1.2mm to 4.0mm | Openings: 1/2\"x1/2\", 1\"x1\", 1.5\"x1.5\", 2\"x2\" | Roll Lengths: 15m, 30m",
    description: "Precision-welded wire mesh manufactured from hot-dip galvanized wire or post-galvanized for total joint rust protection. Widely used for warehouse partitions, security cages, and poultry enclosures.",
    specs: [
      "Uniform hot-dip zinc coating protects against outdoor corrosion and rust",
      "Welded before galvanizing / hot dipped for total joint passivation",
      "Ideal for security partitions, machine guarding, poultry cages, and window grilles",
      "High tensile strength resisting cut-through and impact",
      "Clean silver finish without sharp burrs or weld flash"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1590725140246-20150b073016?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1590725140246-20150b073016?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "galvanised-gi-welded-wire-mesh"
  },
  {
    name: "Stainless Steel SS 304 Welded Wire Mesh",
    title: "Stainless Steel SS 304 Welded Wire Mesh",
    brand: "RK Steel / Ganpat / Premium Mill",
    category: "Weldmesh",
    gradeStandard: "AISI 304 / ASTM A580 Food Grade Stainless Steel",
    sizeRange: "Wire Dia: 1.0mm to 5.0mm | Openings: 10x10mm up to 100x100mm | Custom Sheets & Rolls",
    description: "Non-magnetic, corrosion-proof SS 304 welded wire mesh engineered for chemical plants, pharmaceutical cleanrooms, food processing filtration, and architectural exterior screening.",
    specs: [
      "18% Chromium and 8% Nickel composition for immunity to rust, acids, and alkalis",
      "Heat-resistant and hygienic with zero paint or chemical coating required",
      "Lifetime durability in outdoor coastal and industrial environments",
      "High tensile strength and rigid electronic fusion-welded joints",
      "100% genuine SS 304 material test certificate provided"
    ],
    images: [{ url: "https://www.ganpatind.com/wp-content/uploads/2017/11/ss-304-angle.jpg" }],
    imageUrl: "https://www.ganpatind.com/wp-content/uploads/2017/11/ss-304-angle.jpg",
    authorisedDealer: true,
    slug: "stainless-steel-ss304-welded-wire-mesh"
  },

  // 7. Chain Link & Accessories (3 Products)
  {
    name: "Heavy Galvanised (GI) Diamond Chain Link Fencing",
    title: "Heavy Galvanised (GI) Diamond Chain Link Fencing",
    brand: "RK Steel / Authorised Mill",
    category: "Chain Link & Accessories",
    gradeStandard: "IS 2721 Heavy Zinc Coated Galvanised Wire",
    sizeRange: "Wire Gauge: 8G (4.0mm), 10G (3.15mm), 12G (2.5mm) | Mesh: 2\"x2\", 2.5\"x2.5\", 3\"x3\" | Height: 3ft to 12ft",
    description: "High-tensile woven diamond chain link fencing with knuckle or twisted-barb selvedge. The industry standard for fencing boundary perimeters of solar parks, industrial facilities, highways, and sports fields.",
    specs: [
      "Heavy zinc coating (> 200 GSM) ensuring 15+ years of rust-free outdoor exposure",
      "Flexible interlocking diamond weave absorbs heavy mechanical shocks without tearing",
      "Adapts smoothly to hilly or uneven terrain without tension loss",
      "Knuckled or twisted barbed top edges to deter scaling and intrusion",
      "Easy installation with standard MS pipe or angle fence posts"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "heavy-galvanised-gi-chain-link-fencing"
  },
  {
    name: "PVC Coated Security Chain Link Fencing",
    title: "PVC Coated Security Chain Link Fencing",
    brand: "RK Steel / Authorised Mill",
    category: "Chain Link & Accessories",
    gradeStandard: "Galvanised core wire with Extruded UV-Resistant Virgin PVC",
    sizeRange: "Core Wire: 2.0mm - 3.0mm (Finished OD: 3.0mm - 4.2mm) | Mesh: 2\"x2\", 3\"x3\" | Colors: Dark Green, Forest Green, Black | Height: 4ft to 10ft",
    description: "Dual-layer protected chain link fence combining a galvanized steel core with an extruded, UV-stabilized PVC outer sheath. Ideal for residential societies, parks, and corrosive seaside zones.",
    specs: [
      "Dual-barrier defense against water, humidity, and coastal salt spray",
      "UV-stabilized virgin polymer coating prevents sun fading and cracking",
      "Aesthetic green finish that blends harmoniously with natural landscaping",
      "Smooth outer surface preventing cuts or snags for sports fields and parks",
      "Supplied in compact tightly-wrapped rolls for safe transport"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "pvc-coated-security-chain-link-fencing"
  },
  {
    name: "High-Security Barbed Wire & Concertina Razor Wire Coils",
    title: "High-Security Barbed Wire & Concertina Razor Wire Coils",
    brand: "RK Steel / Tata Wiron / Premium Mill",
    category: "Chain Link & Accessories",
    gradeStandard: "IS 278 (Barbed Wire) & ASTM F1910 (Razor Wire CBT-65 / BTO-22)",
    sizeRange: "Barbed Wire: 12x12 gauge, 12x14 gauge (2-ply, 4-point) | Concertina Coil Dia: 450mm, 600mm, 900mm",
    description: "Maximum-security perimeter topping systems. Includes high-tensile 4-point galvanized barbed wire and spiral concertina coils with razor-sharp punched blades to prevent unauthorized perimeter entry.",
    specs: [
      "High-tensile spring steel wire impossible to cut with standard hand cutters",
      "Razor-sharp punched steel blades arranged at tight intervals along spiral coils",
      "Expands to 10–15 meters per coil for rapid deployment atop walls or chain link fences",
      "Full range of accessories: Tension wire, Turnbuckles, J-bolts, and Binding wire",
      "High-security defense specification for military, government, and industrial campuses"
    ],
    images: [{ url: "https://images.unsplash.com/photo-1516216628859-9bcceabb84ca?auto=format&fit=crop&w=800&q=80" }],
    imageUrl: "https://images.unsplash.com/photo-1516216628859-9bcceabb84ca?auto=format&fit=crop&w=800&q=80",
    authorisedDealer: true,
    slug: "barbed-wire-concertina-razor-wire-coils"
  }
];

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  const collection = mongoose.connection.db.collection("products");

  console.log("Clearing previous placeholder/duplicate products in collection...");
  await collection.deleteMany({});

  console.log(`Inserting ${products.length} comprehensive products (3 per category across 7 categories)...`);
  const result = await collection.insertMany(products.map(p => ({
    ...p,
    createdAt: new Date(),
    updatedAt: new Date()
  })));

  console.log(`Successfully inserted ${result.insertedCount} products!`);

  // Verification
  const categories = await collection.distinct("category");
  console.log("\n--- Verification Summary by Category ---");
  for (const cat of categories) {
    const items = await collection.find({ category: cat }).toArray();
    console.log(`\n📁 Category: "${cat}" (${items.length} products)`);
    items.forEach((item, idx) => {
      console.log(`   ${idx + 1}. ${item.name} [Brand: ${item.brand}] [Slug: ${item.slug}]`);
    });
  }

  await mongoose.disconnect();
  console.log("\nDisconnected from MongoDB. Seeding process complete!");
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
