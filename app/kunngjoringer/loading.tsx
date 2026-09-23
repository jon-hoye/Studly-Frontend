export default function KunngjoringerLoading() {
  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen animate-pulse">
      <main className="w-full max-w-4xl mx-auto px-4 py-4 justify-start mt-25 flex flex-col font-google">
        
        {/* Tittel og undertekst */}
        <header className="mb-6 pb-2">
          <div className="h-8 w-48 bg-gray-200 dark:bg-white/10 rounded-xl mb-2" />
          <div className="h-4 w-72 bg-gray-200/70 dark:bg-white/5 rounded-lg" />
        </header>

        {/* Emnefilter-piller */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 bg-gray-100 dark:bg-[#1a1a1a] rounded-full border border-gray-200/50 dark:border-white/10 shrink-0"
            />
          ))}
        </div>

        {/* Kunngjøringskort i liste */}
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-2xl border border-gray-200/50 dark:border-white/10 flex flex-col gap-3"
            >
              {/* Emne-tag og dato */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-28 bg-gray-200 dark:bg-white/10 rounded-lg" />
                <div className="h-4 w-20 bg-gray-200/60 dark:bg-white/5 rounded" />
              </div>

              {/* Tittel */}
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded-lg mt-1" />

              {/* Forfatter / Tekstutdrag */}
              <div className="space-y-2 mt-1">
                <div className="h-4 w-full bg-gray-200/50 dark:bg-white/5 rounded" />
                <div className="h-4 w-5/6 bg-gray-200/50 dark:bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
