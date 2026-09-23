import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";
import { ArrowLeft } from "lucide-react";

export default async function RedigerBrukerPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen dark:bg-[#111111] px-4 sm:px-6 lg:px-8 font-google">
      <div className="max-w-2xl mx-auto space-y-6 mt-30">
        {/* Tilbake-lenke */}
        <div>
          <Link
            href="/bruker"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til profil
          </Link>
        </div>

        {/* Hovedkort */}
        <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-300 to-orange-400" />

          <div className="px-8 pb-8 -mt-12">
            <div className="flex flex-col gap-5 mb-6">
              <img
                className="w-24 h-24 rounded-2xl border-white dark:border-[#222222] object-cover shadow-md"
                src="/ikoner/person.jpg"
                alt="Profilbilde"
              />
              <div className="pb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Rediger Profil
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Oppdater din personlige informasjon
                </p>
              </div>
            </div>

            {/* Skjema */}
            <EditProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
