// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 bg-white dark:bg-[#121212] animate-pulse">
      {/* Rutenett som matcher layouten i page.tsx */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:max-w-6xl w-full mt-25 mb-10 items-start">
        
        {/* 1. Skjelett for Kalenderen øverst */}
        <div className="col-span-1 md:col-span-2 h-[220px] bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200/50 dark:border-white/10 p-6 flex flex-col justify-between">
          <div className="h-6 w-40 bg-gray-200 dark:bg-white/10 rounded-lg" />
          <div className="grid grid-cols-7 gap-2 w-full mt-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200/60 dark:bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>

        {/* 2. Skjelett for Kunngjøringer (venstre side) */}
        <div className="h-[280px] bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-12 bg-gray-200/70 dark:bg-[#222222] border-b border-gray-200/50 dark:border-white/10 px-6 flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-300 dark:bg-white/10 rounded" />
            <div className="h-4 w-16 bg-gray-300 dark:bg-white/10 rounded-lg" />
          </div>
          {/* Innholdskort */}
          <div className="p-4 space-y-3">
            <div className="h-16 bg-gray-200/50 dark:bg-white/5 rounded-xl" />
            <div className="h-16 bg-gray-200/50 dark:bg-white/5 rounded-xl" />
          </div>
        </div>

        {/* 3. Skjelett for Fag (høyre side) */}
        <div className="h-[280px] bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden flex flex-col">
          <div className="h-12 bg-gray-200/70 dark:bg-[#222222] border-b border-gray-200/50 dark:border-white/10 px-6 flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-300 dark:bg-white/10 rounded" />
          </div>
          <div className="p-4 space-y-3">
            <div className="h-16 bg-gray-200/50 dark:bg-white/5 rounded-xl" />
            <div className="h-16 bg-gray-200/50 dark:bg-white/5 rounded-xl" />
          </div>
        </div>

      </div>
    </div>
  );
}
