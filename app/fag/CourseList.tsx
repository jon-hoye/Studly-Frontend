"use client";

import { useState, useEffect } from "react";
import { CanvasCourse } from "@/lib/canvas";
import { BookOpen, ExternalLink, X, Plus } from "lucide-react";

import { getCourseTheme } from "@/lib/courseThemes";
import { getCanvasCourseUrl } from "@/lib/institutions";

interface CourseListProps {
  initialCourses: CanvasCourse[];
  institution?: string;
}

export default function CourseList({ initialCourses, institution }: CourseListProps) {
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleHideCourse = (id: number) => {
    const updated = [...hiddenIds, id];
    setHiddenIds(updated);
    localStorage.setItem("hidden_canvas_courses", JSON.stringify(updated));
  };

  const handleRestoreCourse = (id: number) => {
    const updated = hiddenIds.filter((item) => item !== id);
    setHiddenIds(updated);
    localStorage.setItem("hidden_canvas_courses", JSON.stringify(updated));
  };

  const visibleCourses = isLoaded
    ? initialCourses.filter((course) => !hiddenIds.includes(course.id))
    : initialCourses;

  const hiddenCourses = isLoaded
    ? initialCourses.filter((course) => hiddenIds.includes(course.id))
    : [];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
      {/* Venstre kolonne: Liste med fag */}
      <aside className="w-full lg:w-[360px] shrink-0 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Dine Fag ({visibleCourses.length})
          </span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs text-blue-400 hover:text-blue-500 dark:text-blue-400 cursor-pointer transition font-medium"
          >
            {isEditing ? "Ferdig" : "Rediger"}
          </button>
        </div>

        {visibleCourses.length === 0 && (!isEditing || hiddenCourses.length === 0) ? (
          <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200/60 dark:border-white/5 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ingen synlige fag.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {/* Synlige fag */}
            {visibleCourses.map((course) => {
              const canvasUrl = getCanvasCourseUrl(course.id, institution);
              const displayCode = course.course_code || `EMNE ${course.id}`;
              const theme = getCourseTheme(course.id, course.course_code || course.name);

              return (
                <div
                  key={course.id}
                  className={`${theme.badgeBg} ${theme.hoverBg} transition rounded-2xl p-4 flex flex-col justify-between group relative shadow-xs cursor-pointer`}
                >
                  {/* Topp: Emnekode og slett/skjul-knapp (kun ved redigering) */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
                    >
                      {displayCode}
                    </span>

                    {isEditing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHideCourse(course.id);
                        }}
                        title="Skjul faget"
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Emnenavn */}
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 leading-snug line-clamp-2 mb-3">
                    {course.name}
                  </h2>

                  {/* Bunn: Lenke til MittUiB */}
                  <div className="pt-2 border-t border-gray-200/50 dark:border-white/5 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                      #{course.id}
                    </span>

                    <a
                      href={canvasUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                    >
                      Åpne i Canvas
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Skjulte fag som vises i redigeringsmodus med pluss-knapp */}
            {isEditing && hiddenCourses.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200/70 dark:border-white/10 flex flex-col gap-3">
                <span className="text-xs font-semibold font-google text-gray-400 dark:text-gray-500 px-1">
                  Skjulte fag ({hiddenCourses.length}) - Trykk + for å legge til
                </span>

                {hiddenCourses.map((course) => {
                  const displayCode = course.course_code || `EMNE ${course.id}`;
                  const theme = getCourseTheme(course.id, course.course_code || course.name);

                  return (
                    <div
                      key={course.id}
                      className="bg-gray-100/60 dark:bg-[#181818] border border-dashed border-gray-300 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between opacity-80 hover:opacity-100 transition relative"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
                        >
                          {displayCode}
                        </span>

                        <button
                          onClick={() => handleRestoreCourse(course.id)}
                          title="Legg til i listen igjen"
                          className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition cursor-pointer flex items-center gap-1 font-medium text-xs"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>

                      <h2 className="text-sm font-medium text-gray-700 dark:text-zinc-300 leading-snug line-clamp-2">
                        {course.name}
                      </h2>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Midtseksjon: Tom plassholder for fremtidig innhold */}
      <section className="flex-1 w-full min-h-[450px] bg-gray-50 dark:bg-[#181818] border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-md text-gray-400 dark:text-gray-500">
          <p className="text-sm font-medium">Innholdsfelt</p>
          <p className="text-xs mt-1 text-gray-400/80">
            Innhold fra fag kommer senere
          </p>
        </div>
      </section>
    </div>
  );
}
