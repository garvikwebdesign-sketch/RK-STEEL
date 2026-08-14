"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, FileText, MessageSquare, LogOut, Globe, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Skip admin layout wrapper on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products CRUD", href: "/admin/products", icon: Package },
    { name: "Blog Posts CRUD", href: "/admin/blog", icon: FileText },
    { name: "Inquiries & Leads", href: "/admin/leads", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-steel-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-navy-950 text-white flex flex-col justify-between border-r border-navy-800 p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
            <div className="w-9 h-9 bg-white rounded-full overflow-hidden border border-gold-500 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="RK Steel Company Noida logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-heading font-bold text-base text-white">RK STEEL ADMIN</div>
              <div className="text-[10px] text-gold-400 font-semibold uppercase">Single Admin Panel</div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-md font-bold"
                      : "text-gray-300 hover:bg-navy-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-navy-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded text-xs text-gray-300 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <Globe className="w-4 h-4 text-gold-500" />
            View Public Site ↗
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-red-400 hover:text-white hover:bg-red-900/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Admin
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
