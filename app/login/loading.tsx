export default function LoginLoading() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-gray-200 dark:bg-[#111111] overflow-hidden animate-pulse font-google">
      {/* Bakgrunnsglød som matcher fargetonene til PlasmaWave */}
      <div className="absolute w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Kort med glassmorphism som matcher login-kortet */}
      <div className="relative z-10 w-full max-w-sm bg-white/50 dark:bg-[#1e1e1e]/50 backdrop-blur-xl p-8 rounded-4xl border border-white/20 dark:border-white/10 shadow-2xl flex flex-col items-center text-center">
        {/* Tittel-skjelett */}
        <div className="h-8 w-28 bg-gray-300 dark:bg-white/10 rounded-xl mb-3" />

        {/* Undertekst-skjelett */}
        <div className="h-4 w-60 bg-gray-300/70 dark:bg-white/5 rounded-lg mb-2" />
        <div className="h-3 w-40 bg-gray-300/50 dark:bg-white/5 rounded-lg mb-6" />

        {/* Google-knapp skjelett */}
        <div className="w-full h-11 bg-gray-300/80 dark:bg-white/10 rounded-full flex items-center justify-center gap-3 px-4">
          <div className="w-5 h-5 rounded-full bg-gray-400/40 dark:bg-white/10 shrink-0" />
          <div className="h-4 w-36 bg-gray-400/40 dark:bg-white/10 rounded-md" />
        </div>
      </div>
    </main>
  );
}
