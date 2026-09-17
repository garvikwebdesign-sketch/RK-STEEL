import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "light", className = "", size = "md" }: LogoProps) {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const taglineColor = isDark ? "text-slate-300" : "text-slate-600";

  const sizeClasses = {
    sm: {
      img: "w-11 h-11",
      title: "text-xl",
      tagline: "text-[10px] tracking-[0.15em]",
    },
    md: {
      img: "w-12 h-12 sm:w-14 sm:h-14 lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]",
      title: "text-xl sm:text-2xl lg:text-[22px] xl:text-[26px]",
      tagline: "text-[9px] sm:text-[10px] lg:text-[10px] xl:text-[10.5px] tracking-[0.14em]",
    },
    lg: {
      img: "w-20 h-20 sm:w-22 sm:h-22",
      title: "text-3xl sm:text-4xl",
      tagline: "text-xs sm:text-sm tracking-[0.18em]",
    },
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none flex-shrink-0 ${className}`}>
      {/* Authentic Company Logo Emblem */}
      <div
        className={`relative flex items-center justify-center flex-shrink-0 ${sizeClasses.img} rounded-full overflow-hidden border-2 ${
          isDark ? "border-slate-700 bg-white" : "border-slate-200 bg-white"
        } shadow-sm transition-transform duration-300 group-hover:scale-105 p-0.5`}
      >
        <img
          src="/logo.jpg"
          alt="RK STEEL CO Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Clean Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black ${sizeClasses.title} ${textColor} tracking-tight font-sans`}>
            RK
          </span>
          <span className={`font-black ${sizeClasses.title} text-red-600 tracking-tight font-sans`}>
            STEEL
          </span>
          <span className={`font-black ${sizeClasses.title} ${textColor} tracking-tight font-sans`}>
            CO.
          </span>
        </div>
        <span className={`uppercase font-extrabold ${taglineColor} ${sizeClasses.tagline} font-sans mt-1.5 leading-none`}>
          Har Zaroorat Ka Steel
        </span>
      </div>
    </Link>
  );
}

