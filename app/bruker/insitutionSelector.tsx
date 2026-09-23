"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import { updateUserProfile } from "@/lib/actions";

interface Institution {
  id: string;
  name: string;
  domain: string;
}

interface Props {
  currentInstitution: string;
  institutions: Institution[];
}

export default function InstitutionSelector({
  currentInstitution,
  institutions,
}: Props) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(currentInstitution || "uib");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeInstitution =
    institutions.find((i) => i.id === selectedId) ||
    institutions.find((i) => i.id === "uib") ||
    institutions[0];

  // Lukk ved klikk utenfor
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSelect(instId: string) {
    if (instId === selectedId) {
      setIsOpen(false);
      return;
    }

    setSelectedId(instId);
    setIsOpen(false);
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await updateUserProfile({ institution: instId });

      if (res.success) {
        setSavedSuccess(true);
        router.refresh();
        setTimeout(() => setSavedSuccess(false), 2000);
      } else {
        alert(`Feil: ${res.error}`);
        setSelectedId(currentInstitution);
      }
    } catch (err: any) {
      console.error("Kunne ikke oppdatere institusjon", err);
      setSelectedId(currentInstitution);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="relative flex items-center gap-2 font-google"
      ref={dropdownRef}
    >
      {/* Status-ikon på utsiden til venstre */}
      {isSaving && (
        <Loader2 className="w-4 h-4 animate-spin text-blue-500 flex-shrink-0" />
      )}
      {savedSuccess && (
        <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium animate-in fade-in zoom-in duration-200">
          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        </span>
      )}

      {/* Selve knappen (ren, uten ikoner inni) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSaving}
        className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-none ${
          isOpen
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20"
            : "border-gray-200 dark:border-white/10 bg-gray-50/80 hover:bg-gray-100 dark:bg-[#1e1e1e] dark:hover:bg-[#252525] text-gray-800 dark:text-gray-200"
        }`}
      >
        <span className="uppercase font-semibold tracking-wide">
          {activeInstitution?.id || "Velg"}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 ${
            isOpen ? "rotate-180 text-blue-500" : ""
          }`}
        />
      </button>

      {/* Flytende dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-64 sm:w-72 max-h-60 overflow-y-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/50 py-1 divide-y divide-gray-100 dark:divide-white/5 animate-in fade-in zoom-in-95 duration-100">
          {institutions.map((inst) => {
            const isSelected = inst.id === selectedId;
            return (
              <button
                key={inst.id}
                type="button"
                onClick={() => handleSelect(inst.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold cursor-pointer"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/5 cursor-pointer"
                }`}
              >
                <div className="flex flex-col pr-2">
                  <span className="font-medium">{inst.name}</span>
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
