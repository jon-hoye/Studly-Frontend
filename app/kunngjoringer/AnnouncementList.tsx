"use client";

import { useState, useMemo } from "react";
import { FeedItem } from "@/lib/canvas";
import AnnouncementCard from "../components/AnnouncementCard";
import { getCourseTheme } from "@/lib/courseThemes";
import { Filter, Megaphone, RotateCcw } from "lucide-react";

interface AnnouncementListProps {
  initialItems: FeedItem[];
}

export default function AnnouncementList({
  initialItems,
}: AnnouncementListProps) {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>("all");

  // Finn alle unike emner som finnes i kunngjøringene, og tell opp antall
  const courseOptions = useMemo(() => {
    const counts = new Map<
      string,
      { code: string; name?: string; id?: number; count: number }
    >();

    initialItems.forEach((item) => {
      if (item.courseCode) {
        const existing = counts.get(item.courseCode);
        if (existing) {
          existing.count += 1;
        } else {
          counts.set(item.courseCode, {
            code: item.courseCode,
            name: item.courseName,
            id: item.courseId,
            count: 1,
          });
        }
      }
    });

    return Array.from(counts.values()).sort((a, b) =>
      a.code.localeCompare(b.code),
    );
  }, [initialItems]);

  // Filtrer kunngjøringer basert på valgt emne
  const filteredItems = useMemo(() => {
    if (selectedCourseCode === "all") {
      return initialItems;
    }
    return initialItems.filter(
      (item) => item.courseCode === selectedCourseCode,
    );
  }, [initialItems, selectedCourseCode]);

  const hasActiveFilter = selectedCourseCode !== "all";

  return (
    <div className="flex flex-col gap-6 w-full font-google ">
      {/* Emne-filter bar */}
      {courseOptions.length > 0 && (
        <div className="bg-gray-50 dark:bg-[#1a1a1a]  rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-200/50 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filtrer etter emne
            </span>

            {hasActiveFilter && (
              <button
                onClick={() => setSelectedCourseCode("all")}
                className="transition text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" /> Vis alle emner
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {/* Alle emner knapp */}
            <button
              onClick={() => setSelectedCourseCode("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2  ${
                selectedCourseCode === "all"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 "
                  : "bg-white dark:bg-[#222222] text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] "
              }`}
            >
              <span>Alle emner</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold  ${
                  selectedCourseCode === "all"
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-gray-900 "
                    : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400"
                }`}
              >
                {initialItems.length}
              </span>
            </button>

            {/* Hver emnekode */}
            {courseOptions.map((course) => {
              const isSelected = selectedCourseCode === course.code;
              const theme = getCourseTheme(course.id || 0, course.code);

              return (
                <button
                  key={course.code}
                  onClick={() =>
                    setSelectedCourseCode(isSelected ? "all" : course.code)
                  }
                  className={`bg-white dark:bg-[#222222] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 border border-gray-200/50 dark:border-white/10${
                    isSelected
                      ? `${theme.badgeBg} ${theme.badgeText} ring-2 font-bold`
                      : `bg-white dark:bg-[#222222] ${theme.badgeText}  border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]`
                  }`}
                >
                  <span>{course.code}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? `${theme.badgeBg} ${theme.badgeText}`
                        : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {course.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Resultat-teller */}
      <div className="flex items-center justify-between px-1 text-xs text-gray-500 dark:text-gray-400">
        <span>
          Viser{" "}
          <strong className="text-gray-900 dark:text-gray-200">
            {filteredItems.length}
          </strong>{" "}
          av{" "}
          <strong className="text-gray-900 dark:text-gray-200">
            {initialItems.length}
          </strong>{" "}
          kunngjøringer
          {hasActiveFilter && (
            <span>
              {" "}
              i{" "}
              <span className="font-semibold text-blue-500 dark:text-blue-400">
                {selectedCourseCode}
              </span>
            </span>
          )}
        </span>

        {hasActiveFilter && (
          <span className="text-[11px] text-gray-400">
            Filtrert på {selectedCourseCode}
          </span>
        )}
      </div>

      {/* Innhold / Liste */}
      {filteredItems.length === 0 ? (
        <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            {hasActiveFilter
              ? `Ingen kunngjøringer for ${selectedCourseCode}`
              : "Ingen kunngjøringer funnet"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
            {hasActiveFilter
              ? `Det er ingen publiserte kunngjøringer i ${selectedCourseCode}.`
              : "Det er foreløpig ingen kunngjøringer tilgjengelig fra dine emner. Sjekk at du har lagt til API token og valgt riktig institusjon under innstillinger."}
          </p>
          {hasActiveFilter && (
            <button
              onClick={() => setSelectedCourseCode("all")}
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
            >
              Vis alle kunngjøringer
            </button>
          )}
        </div>
      ) : (
        <section className="flex flex-col gap-4 mb-12">
          {filteredItems.map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
