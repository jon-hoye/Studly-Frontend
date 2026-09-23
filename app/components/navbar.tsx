"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "/dashboard", label: "Dashbord" },
  { href: "/timeplan", label: "Timeplan" },
  { href: "/kunngjoringer", label: "Kunngjøringer" },
  { href: "/fag", label: "Mine fag" },
  { href: "/bruker", label: "Bruker" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* PC UI */}
      <div className="hidden fixed top-3 left-0 right-0 bg-gray-50/80 dark:bg-[#1a1a1a]/80 z-50 backdrop-blur-md md:flex flex-wrap items-center justify-between flex-row py-5 px-10 rounded-4xl mx-10 border-gray-200/50 dark:border-white/10 border">
        <Link
          className="text-2xl font-bold font-google whitespace-nowrap text-black dark:text-amber-50"
          href="/"
        >
          
          <Image
            className="dark:hidden invert"
            width={100}
            height={24}
            src="/ikoner/Studly.png"
            alt="Studly Logo"
          />
          <Image
            className="hidden dark:block"
            width={100}
            height={24}
            src="/ikoner/Studly.png"
            alt="Studly Logo"
          />
        </Link>
        <header className="flex flex-wrap">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                className={`font-google px-5 whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-black dark:text-amber-50"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-amber-50/70 font-normal"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </header>
      </div>

      {/* Mobil UI */}
      <div className="md:hidden fixed top-3 left-0 right-0 z-50 bg-gray-50/80 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border-gray-200/50 dark:border-white/10 rounded-4xl mx-2 border overflow-hidden">
        <div className="flex items-center justify-between py-4 px-6">
          <Link
            className="text-2xl font-bold font-google dark:text-amber-50"
            href="/"
          >
            <Image
              className="dark:hidden invert"
              width={100}
              height={24}
              src="/ikoner/Studly.png"
              alt="Studly Logo"
            />
            <Image
              className="hidden dark:block"
              width={100}
              height={24}
              src="/ikoner/Studly.png"
              alt="Studly Logo"
            />
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white p-2 focus:outline-none"
              aria-label="Meny"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Dropdown-meny med Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="top-full left-0 w-full mt-2 border-gray-200/50 dark:border-white/10 rounded-3xl flex flex-col p-6 gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      className={`font-google px-5 whitespace-nowrap transition-colors ${
                        isActive
                          ? "text-black dark:text-white font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white font-normal"
                      }`}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
