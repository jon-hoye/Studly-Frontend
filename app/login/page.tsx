"use client";

import PlasmaWave from "@/components/PlasmaWave";
import GoogleLoginButton from "../components/googlelogin";
import BlurIn from "@/components/BlurIn";


export default function LoginPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-gray-200 dark:bg-[#111111] overflow-hidden">
      {/* Bakgrunnsanimasjon */}
      <div className="absolute inset-0 pointer-events-none z-0 blur-2xl">
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

      {/* Kort med glassmorphism */}
      <BlurIn delay={0.1}>
      <div className="relative z-10 w-full max-w-sm bg-white/50 dark:bg-[#1e1e1e]/50 backdrop-blur-xl p-8 rounded-4xl border border-white/20 dark:border-white/10 shadow-2xl flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
          Logg inn
        </h1>
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-6">
          Logg inn med din Google-konto for å fortsette
        </p>

        <div className="w-full flex justify-center">
          <GoogleLoginButton />
        </div>
      </div>
      </BlurIn>
    </main>
  );
}
