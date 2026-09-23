import { cookies } from "next/headers";
import { cache } from "react";

export interface User {
  id: number | string;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  institution: string;
  created_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Henter innlogget bruker fra FastAPI-backend på serveren.
 * Pakket i React cache() for å unngå dupliserte nettverkskall på samme side.
 * Returnerer User-objekt eller null hvis ikke innlogget / ugyldig token.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Feil ved henting av bruker:", err);
    return null;
  }
});
