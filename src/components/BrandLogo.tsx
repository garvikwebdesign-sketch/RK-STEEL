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
    <img
      src="/logos/jindal-steel.png"
      alt="Jindal Steel & Power Official Logo"
      className={`w-auto max-w-full object-contain select-none ${className}`}
    />
  );
}

/**
 * 9. TATA ASTRUM / STEELIUM LOGO
 */
export function TataAstrumLogo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/logos/tata-astrum.png"
      alt="Tata Astrum HR Sheets and Coils"
      className={`w-auto max-w-full object-contain select-none ${className}`}
    />
  );
}
