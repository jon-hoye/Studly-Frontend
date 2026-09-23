"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CanvasCourse } from "@/lib/canvas";
import { getCourseTheme } from "@/lib/courseThemes";
import { getCanvasCourseUrl } from "@/lib/institutions";

interface DashboardCoursesProps {
  initialCourses: CanvasCourse[];
  institution?: string;
}

export default function DashboardCourses({
  initialCourses,
  institution,
}: DashboardCoursesProps) {
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hidden_canvas_courses");
      if (saved) {
        setHiddenIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Kunne ikke laste skjulte fag:", e);
    }
    setIsLoaded(true);
  }, []);

  const visibleCourses = isLoaded
    ? initialCourses.filter((course) => !hiddenIds.includes(course.id))
    : initialCourses;

  const hasMore = visibleCourses.length > 4;
  const displayedCourses = hasMore
    ? visibleCourses.slice(0, 3)
    : visibleCourses.slice(0, 4);
  const remainingCount = visibleCourses.length - 3;

  return (
    <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden w-full border border-gray-200 dark:border-white/10 flex flex-col self-start h-[200px] md:h-[314px]">
      {/* Toppseksjon / Header */}
      <div className="bg-gray-100/80 dark:bg-[#222222] px-4 md:px-6 py-3 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center">
        <span className="text-sm font-medium font-google text-gray-900 dark:text-white">
          Mine fag
        </span>
        <span className="bg-amber-400/20 rounded-lg items-center flex justify-center px-4 hover:bg-amber-400/30 transition cursor-pointer">
          <Link
            href="/fag"
            className="text-xs p-1 font-google font-medium text-gray-900 dark:text-gray-200"
          >
            Se alle{" "}
            {isLoaded && visibleCourses.length > 0
              ? `(${visibleCourses.length})`
              : ""}
          </Link>
        </span>
      </div>

      {/* Innhold */}
      <div className="p-4 flex-1 flex flex-col">
        {visibleCourses.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-6 text-center h-full">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-google font-medium">
              Ingen aktive fag
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-3 flex-1 h-full ${
              visibleCourses.length === 1
                ? "grid-cols-1"
                : visibleCourses.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 grid-rows-2"
            }`}
          >
            {displayedCourses.map((course) => {
              const displayCode = course.course_code || `EMNE ${course.id}`;
              const theme = getCourseTheme(
                course.id,
                course.course_code || course.name,
              );
              const canvasUrl = getCanvasCourseUrl(course.id, institution);

              return (
                <Link
                  key={course.id}
                  href={canvasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={course.name}
                  className={`${theme.badgeBg} ${theme.hoverBg} transition dark:border-white/5 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs group cursor-pointer h-full min-w-0`}
                >
                  <span
                    className={`text-sm sm:text-base font-bold font-google tracking-wide truncate w-full ${theme.badgeText}`}
                  >
                    {displayCode}
                  </span>
                  <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 font-google hidden md:line-clamp-2 leading-tight break-words w-full mt-0.5">
                    {course.name}
                  </span>
                </Link>
              );
            })}

            {/* Vises hvis det er flere enn 4 fag */}
            {hasMore && (
              <Link
                href="/fag"
                title="Se alle dine fag"
                className="transition bg-gray-100/70 hover:bg-gray-200/80 dark:bg-[#1a1a1a] dark:hover:bg-[#222222] border border-dashed border-gray-300 dark:border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center group cursor-pointer h-full"
              >
                <span className="text-xs sm:text-sm font-semibold font-google text-blue-500 dark:text-blue-400">
                  +{remainingCount} flere
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
