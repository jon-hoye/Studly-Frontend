export default function BrukerLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] px-4 sm:px-6 lg:px-8 animate-pulse font-google">
      <div className="max-w-3xl mx-auto space-y-6 mt-25">
        
        {/* Profil Header Card */}
        <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10">
          {/* Banner */}
          <div className="h-32 bg-gray-200 dark:bg-white/10" />
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-4 flex justify-between items-end">
              {/* Profilbilde */}
              <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-[#1a1a1a] bg-gray-300 dark:bg-white/20 shadow-lg" />
              {/* Rediger-knapp */}
              <div className="h-9 w-28 bg-gray-200 dark:bg-white/10 rounded-lg" />
            </div>

            {/* Navn & brukernavn */}
            <div className="space-y-2">
              <div className="h-7 w-44 bg-gray-200 dark:bg-white/10 rounded-lg" />
              <div className="h-4 w-32 bg-gray-200/70 dark:bg-white/5 rounded-md" />
            </div>
          </div>
        </div>

        {/* Info Grid (2 kolonner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brukerinformasjon-kort */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 space-y-4">
            <div className="h-4 w-36 bg-gray-200 dark:bg-white/10 rounded" />
            <div className="space-y-3 pt-2">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200/60 dark:bg-white/5 rounded" />
                <div className="h-4 w-28 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-200/60 dark:bg-white/5 rounded" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
            </div>
          </div>

          {/* Canvas API-kort */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 space-y-4">
            <div className="h-4 w-40 bg-gray-200 dark:bg-white/10 rounded" />
            <div className="space-y-3 pt-2">
              <div className="h-4 w-full bg-gray-200/50 dark:bg-white/5 rounded" />
              <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
