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
      img: "w-10 h-10",
      title: "text-xl",
      tagline: "text-[9px] tracking-[0.15em]",
    },
    md: {
      img: "w-13 h-13",
      title: "text-2xl sm:text-[26px]",
      tagline: "text-[10px] tracking-[0.16em]",
    },
    lg: {
      img: "w-16 h-16",
      title: "text-3xl sm:text-4xl",
      tagline: "text-[12px] tracking-[0.18em]",
    },
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
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

