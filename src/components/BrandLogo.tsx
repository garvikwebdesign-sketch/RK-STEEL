import React from "react";

export type BrandKey =
  | "tata-steel"
  | "tata-tiscon"
  | "tata-structura"
  | "tata-durashine"
  | "tata-astrum"
  | "tata-steelium"
  | "sail"
  | "jsw-steel"
  | "apl-apollo"
  | "jindal-steel";

interface BrandLogoProps {
  brand: BrandKey | string;
  className?: string;
  variant?: "full" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl";
}

export function BrandLogo({
  brand,
  className = "",
  variant = "full",
  size = "md",
}: BrandLogoProps) {
  const normKey = (brand || "").toLowerCase().replace(/[^a-z0-9]/g, "-");

  // Determine size classes
  const containerSizeClass = {
    sm: "h-8",
    md: "h-11",
    lg: "h-14",
    xl: "h-18",
  }[size] || "h-11";

  // Match brand keys
  if (normKey.includes("tiscon")) {
    return <TataTisconLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("structura")) {
    return <TataStructuraLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("durashine")) {
    return <TataDurashineLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("astrum") || normKey.includes("steelium")) {
    return <TataAstrumLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("tata")) {
    return <TataSteelLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("sail") || normKey.includes("seqr")) {
    return <SailLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("jsw")) {
    return <JswSteelLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("apollo") || normKey.includes("apl")) {
    return <AplApolloLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("jindal") || normKey.includes("je") || normKey.includes("jsp")) {
    return <JindalSteelLogo className={`${containerSizeClass} ${className}`} />;
  }

  // Default fallback
  return <TataSteelLogo className={`${containerSizeClass} ${className}`} />;
}

/**
 * 1. OFFICIAL TATA STEEL LOGO
 * Iconic Tata Blue Hex: #005A9C & Classic Tata T Emblem
 */
export function TataSteelLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Tata Steel Official Logo"
    >
      {/* Tata Circular Emblem */}
      <circle cx="30" cy="30" r="26" fill="#005A9C" />
      {/* Iconic Tata 'T' Stylized Arcs */}
      <path
        d="M20 20C24 20 28 22 30 26C32 22 36 20 40 20V24C37 24 33.5 25.8 32 29V42H28V29C26.5 25.8 23 24 20 24V20Z"
        fill="white"
      />
      <path
        d="M21 16H39C39.5 16 40 16.5 40 17C40 17.5 39.5 18 39 18H21C20.5 18 20 17.5 20 17C20 16.5 20.5 16 21 16Z"
        fill="white"
      />
      {/* Brand Typography */}
      <text
        x="68"
        y="28"
        fill="#005A9C"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="900"
        letterSpacing="2.5"
      >
        TATA
      </text>
      <text
        x="68"
        y="46"
        fill="#1E293B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="3"
      >
        STEEL
      </text>
      <text
        x="150"
        y="46"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="0.8"
      >
        #WeAlsoMakeTomorrow
      </text>
    </svg>
  );
}

/**
 * 2. OFFICIAL TATA TISCON LOGO
 * With Tata emblem, green/blue signature strip, and Joy of Building
 */
export function TataTisconLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Tata Tiscon 550SD Official Logo"
    >
      {/* Tata Emblem */}
      <circle cx="28" cy="30" r="24" fill="#005A9C" />
      <path
        d="M19 21C22.6 21 26.2 22.8 28 26.5C29.8 22.8 33.4 21 37 21V24.5C34.3 24.5 31.2 26.1 29.8 29V41H26.2V29C24.8 26.1 21.7 24.5 19 24.5V21Z"
        fill="white"
      />
      <path
        d="M20 17.5H36C36.4 17.5 36.8 17.9 36.8 18.3C36.8 18.7 36.4 19.1 36 19.1H20C19.6 19.1 19.2 18.7 19.2 18.3C19.2 17.9 19.6 17.5 20 17.5Z"
        fill="white"
      />
      {/* TATA TISCON Typography */}
      <text
        x="62"
        y="25"
        fill="#005A9C"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="900"
        letterSpacing="2"
      >
        TATA
      </text>
      <text
        x="62"
        y="44"
        fill="#0F172A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="21"
        fontWeight="900"
        letterSpacing="1"
      >
        TISCON
      </text>
      {/* 550SD Green Shield Badge */}
      <rect x="156" y="27" width="56" height="18" rx="4" fill="#16A34A" />
      <text
        x="184"
        y="40"
        fill="white"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        550SD
      </text>
      <text
        x="63"
        y="54"
        fill="#059669"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7.5"
        fontWeight="800"
        letterSpacing="1.2"
      >
        JOY OF BUILDING
      </text>
    </svg>
  );
}

/**
 * 3. OFFICIAL TATA STRUCTURA LOGO
 * Square/Rectangular hollow section steel identity
 */
export function TataStructuraLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Tata Structura Official Logo"
    >
      {/* Structural Steel 3D Tube Icon */}
      <rect x="8" y="12" width="36" height="36" rx="5" fill="#0284C7" />
      <rect x="15" y="19" width="22" height="22" rx="3" fill="#075985" />
      <path d="M8 17L15 24M44 17L37 24M8 43L15 36M44 43L37 36" stroke="white" strokeWidth="2" />
      {/* Typography */}
      <text
        x="54"
        y="23"
        fill="#005A9C"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13"
        fontWeight="900"
        letterSpacing="2"
      >
        TATA
      </text>
      <text
        x="54"
        y="42"
        fill="#0369A1"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="900"
        letterSpacing="1.5"
      >
        STRUCTURA
      </text>
      <text
        x="55"
        y="53"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7"
        fontWeight="800"
        letterSpacing="1.2"
      >
        STEEL HOLLOW SECTIONS
      </text>
    </svg>
  );
}

/**
 * 4. OFFICIAL TATA DURASHINE LOGO
 * Galvalume colour roofing sheets branding
 */
export function TataDurashineLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Tata Durashine Official Logo"
    >
      {/* Corrugated Color Roof Profile Icon */}
      <path
        d="M8 36L16 20L24 36L32 20L40 36L48 20"
        stroke="#DC2626"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 43L16 27L24 43L32 27L40 43L48 27"
        stroke="#2563EB"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Typography */}
      <text
        x="58"
        y="23"
        fill="#005A9C"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13"
        fontWeight="900"
        letterSpacing="2"
      >
        TATA
      </text>
      <text
        x="58"
        y="42"
        fill="#DC2626"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="900"
        letterSpacing="1"
      >
        DURASHINE
      </text>
      <text
        x="59"
        y="53"
        fill="#2563EB"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7.5"
        fontWeight="800"
        letterSpacing="1.2"
      >
        COLOUR COATED ROOFING SHEETS
      </text>
    </svg>
  );
}

/**
 * 5. OFFICIAL SAIL LOGO (Steel Authority of India Ltd.)
 * Distinctive SAIL Ingot/Billet Arcs with Hindi 'सेल' + 'SAIL'
 */
export function SailLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Steel Authority of India Limited (SAIL) Official Logo"
    >
      {/* SAIL Symbol - Ingot arcs */}
      <circle cx="28" cy="30" r="22" fill="#1E3A8A" />
      <circle cx="28" cy="30" r="15" fill="white" />
      <circle cx="28" cy="30" r="6" fill="#DC2626" />
      <rect x="25" y="10" width="6" height="40" fill="#1E3A8A" />
      {/* SAIL Typography */}
      <text
        x="60"
        y="30"
        fill="#1E3A8A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="900"
        letterSpacing="3"
      >
        SAIL
      </text>
      <text
        x="60"
        y="44"
        fill="#DC2626"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="1"
      >
        सेल
      </text>
      <text
        x="60"
        y="54"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="0.8"
      >
        STEEL AUTHORITY OF INDIA LTD.
      </text>
    </svg>
  );
}

/**
 * 6. OFFICIAL JSW STEEL LOGO
 * JSW dynamic red-blue geometric polygon mark + Better Everyday
 */
export function JswSteelLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="JSW Steel Official Logo"
    >
      {/* JSW Iconic Red & Blue Geometric Prisms */}
      <path d="M10 38L22 14L34 38H10Z" fill="#DC2626" />
      <path d="M26 44L38 20L50 44H26Z" fill="#1D4ED8" />
      <path d="M18 42L30 18L42 42H18Z" fill="#2563EB" opacity="0.4" />
      {/* Typography */}
      <text
        x="60"
        y="33"
        fill="#1E3A8A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="900"
        letterSpacing="2"
      >
        JSW
      </text>
      <text
        x="130"
        y="33"
        fill="#DC2626"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="1.5"
      >
        Steel
      </text>
      <text
        x="62"
        y="48"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="1.5"
      >
        Better Everyday • Neosteel 550D
      </text>
    </svg>
  );
}

/**
 * 7. OFFICIAL APL APOLLO LOGO
 * Triangle/Globe icon + bold APL APOLLO Steel Pipes
 */
export function AplApolloLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="APL Apollo Steel Pipes Official Logo"
    >
      {/* Red/Blue Apollo Emblem */}
      <rect x="8" y="12" width="36" height="36" rx="8" fill="#DC2626" />
      <circle cx="26" cy="30" r="11" fill="white" />
      <path d="M26 21V39M17 30H35" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      {/* Typography */}
      <text
        x="54"
        y="28"
        fill="#DC2626"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="2"
      >
        APL
      </text>
      <text
        x="100"
        y="28"
        fill="#1E3A8A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="2"
      >
        APOLLO
      </text>
      <text
        x="55"
        y="44"
        fill="#1E293B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="800"
        letterSpacing="2.5"
      >
        STEEL PIPES
      </text>
      <text
        x="55"
        y="53"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="1"
      >
        TUBES & HOLLOW SECTIONS
      </text>
    </svg>
  );
}

/**
 * 8. OFFICIAL JINDAL STEEL (JE / JSP / JINDAL PANTHER) LOGO
 * Distinctive Blue-Red Arch/Flame symbol + Jindal Steel & Power
 */
export function JindalSteelLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Jindal Steel & Power Official Logo"
    >
      {/* Jindal Flame/Arch Emblem */}
      <circle cx="28" cy="30" r="22" fill="#0284C7" />
      <path
        d="M18 36C18 30 22 22 28 16C34 22 38 30 38 36C38 41.5 33.5 45 28 45C22.5 45 18 41.5 18 36Z"
        fill="#EA580C"
      />
      <circle cx="28" cy="35" r="5" fill="white" />
      {/* Typography */}
      <text
        x="60"
        y="29"
        fill="#0F172A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="19"
        fontWeight="900"
        letterSpacing="2"
      >
        JINDAL
      </text>
      <text
        x="148"
        y="29"
        fill="#EA580C"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="1.5"
      >
        STEEL
      </text>
      <text
        x="60"
        y="45"
        fill="#0284C7"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="9"
        fontWeight="800"
        letterSpacing="2"
      >
        JINDAL PANTHER TMT
      </text>
      <text
        x="60"
        y="54"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="0.8"
      >
        JINDAL STEEL & POWER
      </text>
    </svg>
  );
}

/**
 * 9. OFFICIAL TATA ASTRUM / STEELIUM LOGO
 */
export function TataAstrumLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto object-contain select-none ${className}`}
      aria-label="Tata Astrum & Steelium Official Logo"
    >
      <circle cx="26" cy="30" r="20" fill="#005A9C" />
      <path
        d="M18 22C21 22 24 23.5 26 26.5C28 23.5 31 22 34 22V25C31.5 25 29 26.5 27.5 29V39H24.5V29C23 26.5 20.5 25 18 25V22Z"
        fill="white"
      />
      <text
        x="56"
        y="24"
        fill="#005A9C"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13"
        fontWeight="900"
        letterSpacing="2"
      >
        TATA
      </text>
      <text
        x="56"
        y="42"
        fill="#1E293B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="1"
      >
        ASTRUM
      </text>
      <text
        x="138"
        y="42"
        fill="#0284C7"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="1"
      >
        & STEELIUM
      </text>
      <text
        x="56"
        y="53"
        fill="#64748B"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="1"
      >
        HR & CR STEEL SHEETS & PLATES
      </text>
    </svg>
  );
}
