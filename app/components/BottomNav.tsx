"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Bell,
  BookOpen,
  User,
} from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashbord", icon: LayoutDashboard },
  { href: "/timeplan", label: "Timeplan", icon: CalendarDays },
  { href: "/kunngjoringer", label: "Kunngjøringer", icon: Bell },
  { href: "/fag", label: "Mine fag", icon: BookOpen },
  { href: "/bruker", label: "Bruker", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav bg-gray-50/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/10">
      <div className="flex items-center justify-around w-full px-2 py-1.5 max-w-lg mx-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-black dark:text-amber-50 font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-amber-50/70"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? "bg-black/10 dark:bg-white/10"
                    : "bg-transparent"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[10px] font-google tracking-tight mt-0.5 whitespace-nowrap">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
