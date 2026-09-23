export default function TimeplanLoading() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pb-10 bg-white dark:bg-[#121212] animate-pulse">
      <div className="mt-25 py-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl px-4 md:px-6 md:max-w-6xl w-full border border-gray-200/50 dark:border-white/10 flex flex-col gap-6">
        
        {/* Kalender topp-verktøylinje (Tittel, Måned/Uke-knapper) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200/50 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-24 bg-gray-200 dark:bg-white/10 rounded-xl" />
            <div className="h-6 w-36 bg-gray-200 dark:bg-white/10 rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-16 bg-gray-200 dark:bg-white/10 rounded-xl" />
            <div className="h-9 w-16 bg-gray-200 dark:bg-white/10 rounded-xl" />
            <div className="h-9 w-20 bg-gray-200 dark:bg-white/10 rounded-xl" />
          </div>
        </div>

        {/* Ukedager-header */}
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200/70 dark:bg-white/10 rounded-lg" />
          ))}
        </div>

        {/* Kalender rutenett (Uke/Måned-felter) */}
        <div className="grid grid-cols-7 gap-2 min-h-[480px]">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200/40 dark:bg-white/5 rounded-xl p-2 flex flex-col justify-between"
            >
              <div className="h-3 w-4 bg-gray-300 dark:bg-white/10 rounded" />
              {i % 4 === 0 && (
                <div className="h-4 w-full bg-blue-400/20 dark:bg-blue-400/10 rounded-md" />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
