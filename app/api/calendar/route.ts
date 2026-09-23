import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  let calendarUrl = cookieStore.get("calendarUrl")?.value;

  // Fallback: Hvis calendarUrl mangler i cookie, prøv å hente via canvas_token fra backend
  if (!calendarUrl) {
    const token = cookieStore.get("canvas_token")?.value;
    if (token) {
      const user = await getCurrentUser();
      const institution = user?.institution || "uib";

      try {
        const backendRes = await fetch(`${API_BASE_URL}/canvas/calendar-url`, {
          headers: {
            "X-Canvas-Token": token,
            "X-Canvas-Institution": institution,
          },
          cache: "no-store",
        });

        if (backendRes.ok) {
          const data = await backendRes.json();
          calendarUrl = typeof data === "string" ? data : data.url;
        }
      } catch (err) {
        console.error("Feil ved automatisk oppslag av calendar-url:", err);
      }
    }
  }

  if (!calendarUrl) {
    return new NextResponse("Ingen kalender-URL funnet i cookies eller via Canvas-token", {
      status: 400,
    });
  }

  try {
    const res = await fetch(calendarUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: 3600 }, // Cache i 1 time på serveren
    });

    if (!res.ok) {
      return new NextResponse(`Failed to fetch: ${res.statusText}`, { status: res.status });
    }

    const data = await res.text();
    const response = new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "private, max-age=1800, stale-while-revalidate=604800",
      },
    });

    // Hvis vi fant calendarUrl via fallback og den ikke fantes i cookie, lagre den automatisk
    if (!cookieStore.get("calendarUrl")?.value && calendarUrl) {
      response.cookies.set("calendarUrl", calendarUrl, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

