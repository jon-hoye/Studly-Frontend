import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "../components/logoutbutton";
import Link from "next/link";
import CanvasTokenSettings from "./CanvasTokenSettings";
import ThemeToggle from "../components/themeToggle";
import InstitutionSelector from "./insitutionSelector";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default async function Home() {
  const user = await getCurrentUser();

  const res = await fetch(`${API_BASE_URL}/canvas/institutions`, {
    next: { revalidate: 3600 },
  });
  const institutions = res.ok ? await res.json() : [];

  return (
    <div className="min-h-screen dark:bg-[#121212] px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6 mt-25">
        {/* Profile Header Card */}
        <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10">
          <div className="h-32 bg-gradient-to-r from-blue-300 to-orange-400 "></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-4 flex justify-between items-end font-google">
              <img
                className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-lg font-google"
                src="/ikoner/person.jpg"
                alt="Profilbilde"
              />
              <Link
                href="/bruker/rediger"
                className="px-4 py-2 dark:bg-[#222222] bg-gray-100 dark:text-white dark:hover:bg-[#333333] rounded-lg text-sm font-semibold hover:bg-gray-200 font-google cursor-pointer border border-gray-200/50 dark:border-white/10"
              >
                Rediger Profil
              </Link>
              
            </div>


            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 font-google dark:text-white">
                {user?.username || "Brukernavn mangler"}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                {user?.full_name || "Navn mangler"}
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* session!.user Details */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200/50 dark:border-white/10">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 font-google dark:text-white">
              Brukerinformasjon
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-google dark:text-gray-400">
                  Bruker-ID
                </span>
                <span className="text-xs text-gray-400 font-google">
                  {user?.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-google dark:text-gray-400">
                  Bruker opprettet
                </span>
                <span className="text-gray-500 font-google dark:text-gray-400">
                  {user?.created_at}
                </span>
              </div>
            </div>
          </div>

          {/* Current Session */}
          <div className="bg-gray-50 p-6 rounded-2xl dark:bg-[#1a1a1a] border border-gray-200/50 dark:border-white/10">
            <h3 className="text-sm font-google font-bold text-gray-900 uppercase tracking-widest mb-4 dark:text-white">
              Innstillinger
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-google dark:text-gray-400">
                  Mørk modus
                </span>
                <span className="text-gray-900 font-google dark:text-white cursor-pointer">
                  <ThemeToggle></ThemeToggle>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-google dark:text-gray-400">
                  Tilknyttet Universitet
                </span>
               <InstitutionSelector
                currentInstitution={user?.institution || "uib"}
                institutions={institutions}
              />
              </div>
            </div>
          </div>
        </div>

        {/* Canvas API Token (henter automatisk kalender, fag og kunngjøringer) */}
        <CanvasTokenSettings institution={user?.institution || "uib"} />

        {/* Meta Info / Footer */}
        <div className="text-center mb-5">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
