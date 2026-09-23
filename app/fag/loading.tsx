export default function FagLoading() {
  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen animate-pulse">
      <main className="w-full max-w-6xl mx-auto px-4 py-4 justify-start mt-25 flex flex-col font-google">
        
        {/* Tittel */}
        <header className="mb-8 pb-4">
          <div className="h-8 w-36 bg-gray-200 dark:bg-white/10 rounded-xl mb-2" />
          <div className="h-4 w-56 bg-gray-200/70 dark:bg-white/5 rounded-lg" />
        </header>

        {/* 2-kolonners layout (fagliste til venstre, detaljfelt til høyre) */}
        <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
          
          {/* Venstre kolonne: Fag-kort */}
          <aside className="w-full lg:w-[360px] shrink-0 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <div className="h-4 w-28 bg-gray-200 dark:bg-white/10 rounded" />
              <div className="h-4 w-12 bg-gray-200/60 dark:bg-white/5 rounded" />
            </div>

            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200/50 dark:border-white/10 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-10 rounded-full bg-gray-200 dark:bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 rounded" />
                    <div className="h-3 w-40 bg-gray-200/60 dark:bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </aside>

          {/* Høyre kolonne: Emne-detaljer / lenker */}
          <section className="flex-1 w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200/50 dark:border-white/10 p-6 min-h-[360px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-7 w-64 bg-gray-200 dark:bg-white/10 rounded-xl" />
              <div className="h-4 w-48 bg-gray-200/70 dark:bg-white/5 rounded-lg" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-200/50 dark:border-white/10">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-100 dark:bg-[#222222] rounded-xl border border-gray-200/50 dark:border-white/10 p-3 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-white/10" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-24 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="h-2.5 w-16 bg-gray-200/60 dark:bg-white/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
}
