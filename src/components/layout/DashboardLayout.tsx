"use client";

import { useUser, useRole } from "@/hooks/use-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Users, ClipboardCheck, CreditCard,
  Search, Clock, UserCircle, LogOut, Menu, X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const workerNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Browse Gigs", href: "/gigs/browse", icon: Search },
  { label: "My Jobs", href: "/my-jobs", icon: Clock },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

const clientNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Post Job", href: "/jobs/new", icon: Briefcase },
  { label: "Manage Jobs", href: "/jobs/manage", icon: ClipboardCheck },
];

const adminNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Moderation", href: "/moderation", icon: ClipboardCheck },
  { label: "Users", href: "/users", icon: Users },
  { label: "Payments", href: "/payments", icon: CreditCard },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = useRole();
  const { profile } = useUser();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const navItems = role === "admin" ? adminNav : role === "client" ? clientNav : workerNav;
  const basePath = role === "admin" ? "/admin" : role === "client" ? "/client" : "/worker";

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-200 lg:translate-x-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
          <Link href={`${basePath}/dashboard`} className="text-[17px] font-bold tracking-[0.15em] text-brand">
            RIGPEL
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-2" aria-label="Close sidebar">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const href = `${basePath}${item.href}`;
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={item.href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] transition-colors ${
                  isActive ? "bg-brand-subtle text-[#4A2BBF] font-medium" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border shrink-0">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="size-10 rounded-full bg-[#4A2BBF] flex items-center justify-center text-white font-bold text-[16px]">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-foreground truncate">{profile?.full_name || "User"}</p>
              <p className="text-[12px] text-muted-foreground capitalize">{role}</p>
            </div>
            <button onClick={() => { localStorage.removeItem("rigpel_user"); localStorage.removeItem("rigpel_role"); window.location.href = "/login"; }} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Log out">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="h-16 bg-white border-b border-border flex items-center px-6 gap-4 lg:px-8 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2" aria-label="Open sidebar">
            <Menu className="size-5" />
          </button>
          <div className="flex-1" />
        </header>
        <main ref={mainRef}>{children}</main>
      </div>
    </div>
  );
}
