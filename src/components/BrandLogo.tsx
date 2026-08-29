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
  | "jindal-steel"
  | "jindal-panther";

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
  const containerSizeClass =
    {
      sm: "h-8 max-h-8",
      md: "h-11 max-h-11",
      lg: "h-14 max-h-14",
      xl: "h-18 max-h-18",
    }[size] || "h-11 max-h-11";

  // Match brand keys
  if (normKey.includes("tiscon")) {
    return <TataTisconLogo className={`${containerSizeClass} ${className}`} />;
  }
  if (normKey.includes("structura") || normKey.includes("structra")) {
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
  if (normKey.includes("jindal") || normKey.includes("panther") || normKey.includes("jsp")) {
    return <JindalSteelLogo className={`${containerSizeClass} ${className}`} />;
  }

  // Default fallback
  return <TataSteelLogo className={`${containerSizeClass} ${className}`} />;
}

/**
 * 1. TATA TISCON LOGO (Original Image from /logos/tata-tiscon.jpeg)
 */
export function TataTisconLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/tata-tiscon.jpeg"
      alt="Tata Tiscon 550SD Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 2. TATA STRUCTURA LOGO (Original Image from /logos/tata-structra.jpeg)
 */
export function TataStructuraLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/tata-structra.jpeg"
      alt="Tata Structura Steel Hollow Sections Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 3. TATA DURASHINE LOGO (Original Image from /logos/durashine.jpeg)
 */
export function TataDurashineLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/durashine.jpeg"
      alt="Tata Durashine Colour Coated Roofing Sheets Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 4. SAIL LOGO (Original Image from /logos/sail.jpeg)
 */
export function SailLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/sail.jpeg"
      alt="Steel Authority of India Limited (SAIL) Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 5. JSW STEEL LOGO (Original Image from /logos/jsw-steel.jpeg)
 */
export function JswSteelLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/jsw-steel.jpeg"
      alt="JSW Steel Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 6. APL APOLLO LOGO (Original Image from /logos/apl-apollo.jpeg)
 */
export function AplApolloLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/apl-apollo.jpeg"
      alt="APL Apollo Steel Pipes Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 7. TATA STEEL MASTER LOGO
 */
export function TataSteelLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/tata-tiscon.jpeg"
      alt="Tata Steel Official Logo"
      className={`w-auto max-w-full object-contain select-none mix-blend-multiply ${className}`}
      loading="lazy"
    />
  );
}

/**
 * 8. JINDAL PANTHER / JINDAL STEEL LOGO
 */
export function JindalSteelLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto max-w-full object-contain select-none ${className}`}
      aria-label="Jindal Steel & Power Official Logo"
    >
      <circle cx="28" cy="30" r="22" fill="#0284C7" />
      <path
        d="M18 36C18 30 22 22 28 16C34 22 38 30 38 36C38 41.5 33.5 45 28 45C22.5 45 18 41.5 18 36Z"
        fill="#EA580C"
      />
      <circle cx="28" cy="35" r="5" fill="white" />
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
 * 9. TATA ASTRUM / STEELIUM LOGO
 */
export function TataAstrumLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto max-w-full object-contain select-none ${className}`}
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
