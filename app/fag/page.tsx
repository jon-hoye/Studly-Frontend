import { cookies } from "next/headers";
import Link from "next/link";
import { getCanvasCourses } from "@/lib/canvas";
import { getCurrentUser } from "@/lib/auth";
import CourseList from "./CourseList";

export default async function FagPage() {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get("canvas_token")?.value;

  const [courses, user] = await Promise.all([
    getCanvasCourses(),
    getCurrentUser(),
  ]);

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen">
      <main className="w-full max-w-6xl mx-auto px-4 py-4 justify-start mt-25 flex-col font-google">
        <header className="mb-8 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-3">
            
            Mine Fag
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {hasToken
              ? `Viser aktive emner fra Canvas`
              : "Koble til MittUiB for å se emnene dine"}
          </p>
        </header>

        {/* Dersom brukeren mangler token */}
        {!hasToken ? (
   <div className="mb-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="text-base font-bold font-google">Ingen Canvas API-nøkkel lagret</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Koble til Canvas under brukerinnstillinger for å hente fagene dine.
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
          /* Liste med fag til venstre og tomt innholdsfelt i midten/høyre */
          <CourseList initialCourses={courses} institution={user?.institution} />
        )}
      </main>
    </div>
  );
}
