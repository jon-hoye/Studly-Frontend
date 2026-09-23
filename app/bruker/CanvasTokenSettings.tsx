"use client";

import { useState, useEffect } from "react";
import { useApiKey } from "@/lib/ApiKey";
import { fetchCalendarUrlFromBackend } from "@/lib/actions";

// Hjelpefunksjon for å lese cookie i nettleseren
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

interface CanvasTokenSettingsProps {
  institution?: string;
}

export default function CanvasTokenSettings({
  institution = "uib",
}: CanvasTokenSettingsProps) {
  const { saveUrl, removeUrl } = useApiKey();
  const [token, setToken] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const saved = getCookie("canvas_token");
    if (saved) {
      setToken(saved);
      setInputValue(saved);
    } else {
      setToken(null);
      setInputValue("");
    }
  }, []);

  const handleSave = async () => {
    if (!inputValue.trim()) return;
    const cleanToken = inputValue.trim();
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Lagre Canvas API-token i cookie
      document.cookie = `canvas_token=${encodeURIComponent(
        cleanToken
      )}; path=/; max-age=31536000; SameSite=Lax`;
      setToken(cleanToken);

      // 2. Hent kalender-URL automatisk via backend
      const result = await fetchCalendarUrlFromBackend(cleanToken, institution);
      if (result.success && result.url) {
        // 3. Lagre i calendarUrl cookie og synkroniser med ApiKeyContext
        saveUrl(result.url);
      } else if (result.error) {
        console.warn("Kunne ikke hente kalender-URL:", result.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Noe gikk galt under lagring");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    document.cookie = "canvas_token=; path=/; max-age=0; SameSite=Lax";
    removeUrl();
    setToken(null);
    setInputValue("");
    setErrorMessage(null);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl dark:bg-[#1a1a1a] border border-gray-200/50 dark:border-white/10">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 dark:text-white font-google">
        Canvas API-Token
      </h2>

      <div className="flex flex-col text-sm gap-2 max-w-sm text-gray-500 font-google dark:text-gray-400">
        {token ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="h-5 w-5 text-emerald-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-google text-sm">
                Tokenet er lagret lokalt på din enhet
              </p>
            </div>
            <button
              onClick={handleDelete}
              className="transition ease-in-out duration-300 cursor-pointer
                    dark:bg-red-400 dark:hover:bg-red-500 font-google text-sm rounded-3xl 
                    px-5 py-2 text-white bg-red-500 hover:bg-red-600"
            >
              Slett token
            </button>
          </div>
        ) : (
          <>
            <label htmlFor="canvasTokenInput" className="font-google">
              Ditt personlige Canvas API-token (lagres lokalt):
            </label>
            <input
              id="canvasTokenInput"
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Lim inn Canvas API nøkkel her..."
              className="bg-gray-100 dark:border-white/10 dark:bg-[#111111] dark:text-white p-2.5 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setIsHelpOpen(true)}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline font-google transition-colors w-fit text-left cursor-pointer"
            >
              Hvordan finner jeg min Canvas API-nøkkel?
            </button>

            {errorMessage && (
              <p className="text-xs text-red-500 font-google">{errorMessage}</p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="transition ease-in-out duration-300 cursor-pointer
                        bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-google text-sm font-medium rounded-3xl 
                        px-5 py-2 flex items-center gap-2"
              >
                {loading ? "Lagrer og kobler kalender..." : "Lagre"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Popup-modal med veiledning */}
      {isHelpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsHelpOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-google">
                Slik finner du din Canvas API-nøkkel
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 -mr-2 -mt-2 rounded-lg cursor-pointer text-lg leading-none"
                aria-label="Lukk"
              >
                ✕
              </button>
            </div>

            <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-google leading-relaxed">
              <li>Logg inn på Canvas for din institusjon.</li>
              <li>
                Trykk <strong>Konto</strong> i menyen til venstre og velg{" "}
                <strong>Innstillinger</strong>.
              </li>
              <li>
                Bla ned til <strong>Godkjente integrasjoner</strong>.
              </li>
              <li>
                Klikk på <strong>+ Ny tilgangsnøkkel</strong>.
              </li>
              <li>
                Fyll inn navn, ønsket utløpsdato og trykk{" "}
                <strong>Generer nøkkel</strong>.
              </li>
              <li>Lim inn nøkkelen i feltet over og trykk <strong>Lagre</strong>.</li>
              <p>(Husk også å velge riktig institusjon under <strong>Innstillinger</strong>)</p>
            </ol>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-google text-xs sm:text-sm font-medium rounded-full px-5 py-2 transition-colors cursor-pointer"
              >
                Lukk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
