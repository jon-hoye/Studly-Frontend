"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/lib/auth";
import { updateUserProfile } from "@/lib/actions";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  User as UserIcon,
  Mail,
} from "lucide-react";

interface EditProfileFormProps {
  user: User;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(user.username || "");
  const [fullName, setFullName] = useState(user.full_name || "");
  const [email, setEmail] = useState(user.email || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateUserProfile({
        username: username.trim(),
        full_name: fullName.trim(),
        email: email.trim(),
      });

      if (!result.success) {
        const message = typeof result.error === "string"
          ? result.error
          : "Noe gikk galt under oppdatering.";
        setError(message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.refresh();
          router.push("/bruker");
        }, 1000);
      }
    } catch (err: any) {
      setError(err?.message || "Det oppstod en uventet feil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-google">
      {/* Tilbakemeldinger */}
      {error && (
        <div className="flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 text-sm text-green-700 bg-green-50 dark:bg-green-950/40 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Profilen ble oppdatert! Sender deg tilbake...</span>
        </div>
      )}

      {/* Brukernavn */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Brukernavn
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <UserIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={username}
            minLength={3}
            maxLength={30}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ditt brukernavn"
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#111111] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
          />
        </div>
      </div>

      {/* Fullt navn */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Fullt navn
        </label>
        <input
          type="text"
          value={fullName}
          minLength={2}
          maxLength={40}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Ola Nordmann"
          className="w-full px-4 py-2.5 rounded-xl border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#111111] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
        />
      </div>

      {/* Handlingsknapper */}
      <div className="pt-4 flex items-center justify-end gap-3 border-gray-100 dark:border-white/5">
        <Link
          href="/bruker"
          className="px-5 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition"
        >
          Avbryt
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3b6fff] to-[#3ba7ff] hover:opacity-90 text-white font-medium rounded-lg transition shadow-indigo-500/25 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Lagrer...
            </>
          ) : (
            <>
              
              Lagre endringer
            </>
          )}
        </button>
      </div>
    </form>
  );
}
