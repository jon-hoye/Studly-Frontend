"use client";

import React from "react";
import {
  ShieldCheck,
  Info,
  FileText,
  ExternalLink,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="w-full border-t border-gray-200/80 bg-gray-50 dark:bg-[#111111] dark:border-white/10 text-gray-600 dark:text-gray-400 font-google">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-start">
            {/* Brand & Mission */}
            <div className="sm:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-amber-50 tracking-tight">
                  Studly.no
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 max-w-md">
                En moderne, rask og tilpasset plattform for studenter som bruker Canvas. Få bedre oversikt over timeplaner,
                kunngjøringer og emner. Alt samlet på ett sted.
              </p>
            </div>

            {/* Om & Informasjon */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200">
                Informasjon
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left">
                    <Info className="w-4 h-4 opacity-70 shrink-0" />
                    Om oss
                  </button>
                </li>
                <li>
                  <button className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left">
                    <ShieldCheck className="w-4 h-4 opacity-70 shrink-0" />
                    Personvernerklæring
                  </button>
                </li>
                <li>
                  <button className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left">
                    <FileText className="w-4 h-4 opacity-70 shrink-0" />
                    Brukervilkår
                  </button>
                </li>
              </ul>
            </div>

            {/* Nyttige ressurser */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200">
                Ressurser
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://mitt.uib.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Canvas
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://studentweb.uib.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Studentweb
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://tp.uio.no/uib/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    TP Timeplan
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Kildekode (GitHub)
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
            <p className="flex items-center gap-1 text-center sm:text-left">
              Studly.no © {new Date().getFullYear()} — Ikke offisielt tilknyttet noe universitet.
            </p>
            <p className="inline-flex items-center gap-1 text-center sm:text-right">
              Laget med{" "}
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500 shrink-0" />{" "}
              for studenter.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
