import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import Calendar from "../components/calendar";
import AnnouncementCard from "../components/AnnouncementCard";
import { getCanvasAnnouncements, getCanvasCourses } from "@/lib/canvas";
import DashboardCourses from "../components/DashboardCourses";
import Link from "next/link";
import Image from "next/image";
import {
  getCanvasBaseUrl,
  getTpUrl,
} from "@/lib/institutions";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get("canvas_token")?.value;

  const user = await getCurrentUser();
  const institution = user?.institution || "uib";

  // Hent kunngjøringer og fag fra Canvas API via FastAPI-backend
  const [allAnnouncements, courses] = await Promise.all([
    getCanvasAnnouncements(),
    getCanvasCourses(),
  ]);
  const latestAnnouncements = allAnnouncements.slice(0, 2);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-start flex-col min-h-screen px-4 bg-white dark:bg-[#121212]">
        {/* 2-kolonners grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:max-w-6xl w-full mt-25 mb-10 items-start">
          {!hasToken && (
            <div className="col-span-1 md:col-span-2 p-5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300">
              <div className="flex items-start gap-3">
                <div>
                  <h2 className="text-base font-bold font-google">Ingen Canvas API-nøkkel lagret</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Legg til nøkkelen under brukerinnstillinger. (last inn siden på nytt om dette er gjort)
                  </p>
                  <Link
                    href="/bruker"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-200 transition font-google"
                  >
                    Gå til innstillinger &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Kalender øverst – tar begge kolonnene på desktop */}
          <div className="col-span-1 md:col-span-2 py-5 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl md:px-6 px-4 w-full border border-gray-200 dark:border-white/10">
            <Calendar />
          </div>

          {/* Kort 1 under (venstre side) - Kunngjøringer */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden w-full border border-gray-200 dark:border-white/10 flex flex-col self-start min-h-[200px] md:min-h-[314px]">
            {/* Toppseksjon / Header */}
            <div className="bg-gray-100 dark:bg-[#222222] px-4 md:px-6 py-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
              <span className="text-sm font-medium font-google text-gray-900 dark:text-white">
                <span className="md:hidden">Siste kunngjøring</span>
                <span className="hidden md:inline">Siste kunngjøringer</span>
              </span>
              <span className="bg-amber-400/20 rounded-lg items-center flex justify-center px-4 hover:bg-amber-400/30 transition cursor-pointer">
                <Link
                  href="/kunngjoringer"
                  className="text-xs p-1 font-google font-medium text-gray-900 dark:text-gray-200"
                >
                  Se alle ({allAnnouncements.length})
                </Link>
              </span>
            </div>

            {/* Innhold: 1 på mobil, flere på PC */}
            <div className="p-4 flex flex-col gap-3 flex-1">
              {latestAnnouncements.length > 0 ? (
                latestAnnouncements.map((item, index) => (
                  <div
                    key={item.id}
                    className={index > 0 ? "hidden md:block" : ""}
                  >
                    <AnnouncementCard item={item} compact />
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-6 text-center h-full">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-google font-medium">
                    Ingen kunngjøringer
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Kort 2 under (høyre side) - Mine fag */}
          <DashboardCourses
            initialCourses={courses}
            institution={institution}
          />

          <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden w-full border border-gray-200 dark:border-white/10 flex flex-col">
            <div className="bg-gray-100 dark:bg-[#222222] px-4 md:px-6 py-3 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center">
              <span className="text-sm font-medium font-google text-gray-900 dark:text-white">
                Snarveier
              </span>
            </div>
            <div className="p-4 grid grid-cols-4 gap-4 flex-1">
              <Link
                href={getCanvasBaseUrl(user?.institution)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canvas"
                className="bg-gray-100 dark:bg-[#222222] p-2.5 rounded-xl w-full min-h-15 md:min-h-25 text-sm outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors flex flex-col items-center justify-center"
              >
                <Image
                  src="/ikoner/canvas.png"
                  alt="Canvas"
                  width={384}
                  height={384}
                  className="w-10 h-10 md:w-18 md:h-18 object-contain bg-white rounded-2xl border-3 border-gray-200 dark:border-none"
                />
                <p className="text-center font-google text-xs md:text-sm dark:text-white mt-2 font-medium font-google">
                  Canvas
                </p>
              </Link>

              <Link
                href="https://fsweb.no/studentweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-[#222222] p-2.5 rounded-xl w-full min-h-15 md:min-h-25 text-sm outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors justify-center items-center flex flex-col"
              >
                <Image
                  src="/ikoner/studentweb.png"
                  alt="Studentweb"
                  width={384}
                  height={384}
                  className="w-10 h-10 md:w-18 md:h-18 object-contain bg-white rounded-2xl border-3 border-gray-200 dark:border-none"
                />
                <p className="text-center font-google text-xs md:text-sm dark:text-white mt-2 font-medium font-google">
                  Studentweb
                </p>
              </Link>
              <Link
                href={getTpUrl(user?.institution)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-[#222222] p-2.5 rounded-xl w-full min-h-15 md:min-h-25 text-sm outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 md:w-18 md:h-18 bg-white rounded-2xl flex items-center justify-center overflow-hidden border-3 border-gray-200 dark:border-none">
                  <Image
                    src="/ikoner/TP.png"
                    alt="TP"
                    width={384}
                    height={384}
                    className="w-full h-full object-contain brightness-0"
                  />
                </div>
                <p className="text-center font-google text-xs md:text-sm dark:text-white mt-2 font-medium font-google">
                  TP
                </p>
              </Link>
              <Link
                href="https://outlook.office.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-[#222222] p-2.5 rounded-xl w-full min-h-15 md:min-h-25 text-sm outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 md:w-18 md:h-18 bg-white rounded-2xl flex items-center justify-center overflow-hidden border-3 border-gray-200 dark:border-none">
                  <Image
                    src="/ikoner/outlook.png"
                    alt="Outlook"
                    width={384}
                    height={384}
                    className="w-full h-full object-contain md:p-3 p-1.5"
                  />
                </div>
                <p className="text-center font-google text-xs md:text-sm dark:text-white mt-2 font-medium font-google">
                  Outlook
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
