
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';



export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  redirect('/login');
}

export async function loginWithGoogle(idToken: string) {
  const res = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: idToken }),
  });

  if (!res.ok) {
    throw new Error('Innlogging med Google feilet hos backend');
  }

  const data = await res.json();
  const token = data.access_token;

  // Lagre i 'auth_token' cookien slik at getCurrentUser() finner den
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 dager
  });

  // Send brukeren til dashbordet eller forsiden etter innlogging
  redirect('/dashboard');
}

interface UpdateProfileParams {
  username?: string;
  full_name?: string;
  email?: string;
  institution?: string;
}

export async function updateUserProfile(data: UpdateProfileParams) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return { success: false, error: "Ikke autentisert" };
  }
  try {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    if (!res.ok) {
      return { 
        success: false, 
        error: formatErrorMessage(responseData.detail, "Kunne ikke oppdatere profilen") 
      };
    }

    // Hvis backend utstedte et nytt JWT-token (fordi brukernavn ble endret)
    if (responseData.access_token) {
      cookieStore.set("auth_token", responseData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dager
      });
    }
    return { success: true, user: responseData.user };
  } catch (err: any) {
    return { 
      success: false, 
      error: err.message || "Tilkoblingsfeil mot serveren" 
    };
  }
}

// Hjelpefunksjon for å hente ut ren tekst fra FastAPI/Pydantic feilmeldinger
function formatErrorMessage(detail: any, fallback: string): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    return detail.map((err: any) => err.msg || JSON.stringify(err)).join(", ");
  }
  if (detail && typeof detail === "object") {
    return detail.msg || JSON.stringify(detail);
  }
  return fallback;
}

export async function fetchCalendarUrlFromBackend(
  token: string,
  institution?: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    let inst = institution;
    if (!inst) {
      const user = await getCurrentUser();
      inst = user?.institution || "uib";
    }

    const res = await fetch(`${API_BASE_URL}/canvas/calendar-url`, {
      headers: {
        "X-Canvas-Token": token,
        "X-Canvas-Institution": inst,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, error: `Backend feilet med status ${res.status}` };
    }

    const data = await res.json();
    const url = typeof data === "string" ? data : data.url;

    return { success: true, url };
  } catch (error: any) {
    console.error("Feil ved henting av calendar-url fra backend:", error);
    return { success: false, error: error.message || "Tilkoblingsfeil" };
  }
}

