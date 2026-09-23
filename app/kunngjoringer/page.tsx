import { cookies } from "next/headers";
import Link from "next/link";
import { getCanvasAnnouncements } from "@/lib/canvas";
import AnnouncementList from "./AnnouncementList";

export default async function KunngjoringerPage() {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get("canvas_token")?.value;

  // Henter kunngjøringer direkte via FastAPI
  const allItems = await getCanvasAnnouncements();

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen">
      <main className="w-full max-w-4xl mx-auto px-4 py-4 justify-start mt-25 flex flex-col font-google">
        {/* Sideoverskrift */}
        <header className="mb-6 pb-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
          
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Kunngjøringer
                  </h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Siste kunngjøringer og oppdateringer fra dine emner på Canvas
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Advarsel dersom brukeren mangler token */}
        {!hasToken ? (
          <div className="mb-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="text-base font-bold font-google">Ingen Canvas API-nøkkel lagret</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Koble til Canvas under brukerinnstillinger for å hente kunngjøringer fra dine emner.
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
        ) : (
          <AnnouncementList initialItems={allItems} />
        )}
      </main>
    </div>
  );
}

