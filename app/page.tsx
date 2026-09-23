import { getCurrentUser } from "@/lib/auth";
import PlasmaWave from "@/components/PlasmaWave";
import BlurIn from "@/components/BlurIn";
import TypewriterText from "@/components/TypewriterText";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Bell,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default async function Home() {
  const user = await getCurrentUser();

  const steps = [
    {
      step: "01",
      title: "Logg inn",
      description:
        "Logg inn raskt og enkelt med din Google-konto for å opprette profilen din.",
    },
    {
      step: "02",
      title: "Koble til Canvas",
      description:
        "Legg inn din Canvas API-nøkkel under innstillinger med vår enkle guide.",
    },
    {
      step: "03",
      title: "Få full kontroll",
      description:
        "Åpne dashbordet og få alt av timeplaner, frister og kunngjøringer samlet på ett sted.",
    },
  ];

  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-[#111111] text-gray-900 dark:text-gray-100 overflow-hidden font-google">
      {/* 1. Bakgrunnsanimasjon */}
      <div className="absolute top-0 left-0 right-0 h-[650px] md:h-[800px] pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-40 blur-2xl">
        <PlasmaWave
          colors={["#3b6fff", "#3ba7ff"]}
          speed1={0.05}
          speed2={0.05}
          focalLength={0.5}
          bend1={1}
          bend2={0.5}
          dir2={1}
          rotationDeg={0}
        />
      </div>

      {/* 2. Hero Seksjon */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-28 md:pt-40 pb-16 flex flex-col items-center text-center">
        {/* Liten status-badge */}
        <BlurIn delay={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-700 dark:text-gray-300 text-xs md:text-sm font-medium mb-6 backdrop-blur-md">
            <Image src="/ikoner/logo.png" width={25} height={25} alt="Logo" />
            <span>For studenter · UiB, UiO, NTNU, HVL osv</span>
          </div>
        </BlurIn>

        {/* Hovedtittel */}
        <BlurIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.15] text-gray-800 dark:text-amber-50 max-w-4xl text-center">
            <span className="block">Studielivet ditt,</span>
           
              <TypewriterText words={["samlet", "forenklet", "organisert"]} />
        
          </h1>
        </BlurIn>

        {/* Undertittel */}
        <BlurIn delay={0.2}>
          <p className="mt-2 text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            Studly samler kalenderen din, fag og kunngjøringer direkte fra
            Canvas og gir deg en enkel oversikt.
          </p>
        </BlurIn>

        {/* Handlingsknapper */}
        <BlurIn delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link
              href={user ? "/dashboard" : "/login"}
              className="group relative inline-flex items-center gap-2 px-4 py-2 md:py-2.5 rounded-full font-semibold text-white 
              bg-gradient-to-r from-[#3b6fff] to-[#3ba7ff] hover:opacity-95 
               hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
            >
              <span>{user ? "Gå til Dashbord" : "Kom i gang"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </BlurIn>

        {/* 3. Hero Mockup Showcase */}
        <BlurIn delay={0.4} className="w-full flex justify-center">
          <div className="relative mt-12 md:mt-16 w-full max-w-5xl group">
            {/* Ramme for mockup - Desktop (sm og opp) */}
            <div className="hidden sm:block relative rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-[#1a1a1a]/90 backdrop-blur-xl p-2 md:p-4 shadow-2xl overflow-hidden">
              {/* Topplinje i app-vindu */}
              <div className="flex items-center justify-between pb-3 px-3 border-b border-gray-200 dark:border-white/10 mb-3 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="font-mono text-[11px] opacity-70">
                  studly.no/dashboard
                </span>
                <div className="w-12" />
              </div>

              {/* Desktop Mockup - Dark Mode */}
              <Image
                src="/bilder/dashboard.webp"
                alt="Studly Dashbord Forhåndsvisning (Mørk modus)"
                width={1400}
                height={900}
                priority
                className="hidden dark:block w-full h-auto rounded-xl md:rounded-2xl border border-gray-200/50 dark:border-white/5 object-cover"
              />

              {/* Desktop Mockup - Light Mode */}
              <Image
                src="/bilder/dashboard_light.webp"
                alt="Studly Dashbord Forhåndsvisning (Lys modus)"
                width={1400}
                height={900}
                priority
                className="block dark:hidden w-full h-auto rounded-xl md:rounded-2xl border border-gray-200/50 dark:border-white/5 object-cover"
              />
            </div>

            {/* Ramme for mockup - Mobil (under sm) */}
            <div className="sm:hidden relative flex flex-col items-center justify-center py-2">
              <div className="relative max-w-[280px]">
                {/* Mobil Mockup - Dark Mode */}
                <div className="rounded-3xl">
                  <Image
                    src="/bilder/phone_dark.webp"
                    alt="Studly Mobilvisning (Mørk modus)"
                    width={700}
                    height={1400}
                    priority
                    className="hidden dark:block w-full h-auto object-contain scale-108 brightness-90 contrast-108"
                  />
                </div>

                {/* Mobil Mockup - Light Mode */}
                <div className="rounded-3xl">
                  <Image
                    src="/bilder/phone_light.webp"
                    alt="Studly Mobilvisning (Lys modus)"
                    width={700}
                    height={1400}
                    priority
                    className="block dark:hidden w-full h-auto object-contain scale-108 drop-shadow-2xl"
                  />
                </div>

                {/* Flytende informasjons-kort (Mobil) */}
                <div className="absolute -bottom-3 -left-3 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md py-2 px-3 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      Kalender
                    </p>
                    <p className="text-[11px] font-semibold text-gray-900 dark:text-white">
                      Canvas-synkronisert
                    </p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md py-2 px-3 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      Varsler
                    </p>
                    <p className="text-[11px] font-semibold text-gray-900 dark:text-white">
                      Alt på ett sted
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flytende informasjons-kort (Desktop) */}
            <div className="hidden lg:flex absolute -bottom-6 -left-6 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-white/10 items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Kalender
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Synkronisert med Canvas
                </p>
              </div>
            </div>

            <div className="hidden lg:flex absolute -top-6 -right-6 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-white/10 items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Kunngjøringer
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Alt samlet på ett sted
                </p>
              </div>
            </div>
          </div>
        </BlurIn>
      </section>

      {/* 6. Slik fungerer det (3 steg) */}
      <section className="w-full bg-gray-50/70 dark:bg-[#161616]/70 border-y border-gray-200/80 dark:border-white/10 py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <BlurIn delay={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Klar på under ett minutt
              </h3>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                Ingen vanskelig konfigurering. Legg inn din Canvas nøkkel og
                start med en gang.
              </p>
            </div>
          </BlurIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, idx) => (
              <BlurIn key={idx} delay={0.15 * (idx + 1)} className="h-full">
                <div className="h-full relative p-6 md:p-8 rounded-3xl bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 shadow-sm flex flex-col">
                  <div className="text-3xl font-extrabold text-blue-600/30 dark:text-blue-400/30 font-mono mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </BlurIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action (CTA) i bunn */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 md:py-28">
        <BlurIn delay={0.1}>
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
            {/* Bakgrunnsmønster */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Klar for et ryddigere semester?
              </h3>
              <p className="mt-4 text-base sm:text-lg text-blue-100 leading-relaxed">
                Få samlet alle dine Canvas-ting, timeplaner og meldinger i dag.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={user ? "/dashboard" : "/login"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold text-blue-600 bg-white hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base cursor-pointer"
                >
                  <span>{user ? "Gå til Dashbord" : "Kom i gang nå"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </BlurIn>
      </section>
    </main>
  );
}
