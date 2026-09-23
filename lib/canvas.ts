import { cookies } from "next/headers";
import { createHash } from "crypto";
import { getCurrentUser } from "./auth";

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  published: string;
  author: string;
  content: string;
  courseId?: number;
  courseCode?: string;
  courseName?: string;
  contextCode?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex").slice(0, 16);
}

export interface CanvasAnnouncement {
  id: number;
  title: string;
  message: string;
  posted_at: string;
  html_url: string;
  user_name?: string;
  context_code?: string;
  context_name?: string;
  course_code?: string;
  course_id?: number;
}

export interface CanvasCourse {
  id: number;
  name: string;
  course_code?: string;
  workflow_state?: string;
  start_at?: string;
  end_at?: string;
}

/**
 * Henter aktive emner / fag fra FastAPI-backend
 */
export async function getCanvasCourses(
  customToken?: string,
  customInstitution?: string
): Promise<CanvasCourse[]> {
  let token = customToken;
  let institution = customInstitution;

  if (!institution) {
    const user = await getCurrentUser();
    institution = user?.institution || "uib";
  }

  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("canvas_token")?.value;
  }

  if (!token) {
    return [];
  }

  try {
    const userKey = hashToken(`${token}_${institution}`);
    const res = await fetch(`${API_BASE_URL}/canvas/courses?k=${userKey}`, {
      headers: {
        "X-Canvas-Token": token,
        "X-Canvas-Institution": institution,
      },
      next: { revalidate: 300 }, // Cache i 5 minutter for denne spesifikke brukeren
    });

    if (!res.ok) {
      console.error(`Feil fra backend (courses): HTTP ${res.status}`);
      return [];
    }

    const data: CanvasCourse[] = await res.json();
    return data;
  } catch (error) {
    console.error("Kunne ikke hente emner fra FastAPI:", error);
    return [];
  }
}

/**
 * Henter kunngjøringer fra FastAPI-backend og beriker med emnekode og emnenavn
 */
export async function getCanvasAnnouncements(
  customToken?: string,
  providedCourses?: CanvasCourse[],
  customInstitution?: string
): Promise<FeedItem[]> {
  let token = customToken;
  let institution = customInstitution;

  if (!institution) {
    const user = await getCurrentUser();
    institution = user?.institution || "uib";
  }

  // 1. Hvis ikke token er sendt inn som argument, les det fra cookies på serveren
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("canvas_token")?.value;
  }

  if (!token) {
    return [];
  }

  try {
    const userKey = hashToken(`${token}_${institution}`);
    const announcementsPromise = fetch(`${API_BASE_URL}/canvas/announcements?k=${userKey}`, {
      headers: {
        "X-Canvas-Token": token,
        "X-Canvas-Institution": institution,
      },
      next: { revalidate: 300 }, // Cache i 5 minutter for denne spesifikke brukeren
    });

    const coursesPromise = providedCourses
      ? Promise.resolve(providedCourses)
      : getCanvasCourses(token, institution);

    const [res, courses] = await Promise.all([
      announcementsPromise,
      coursesPromise,
    ]);

    if (!res.ok) {
      console.error(`Feil fra backend: HTTP ${res.status}`);
      return [];
    }

    const data: CanvasAnnouncement[] = await res.json();

    // Bygg oppslagskart for emner basert på ID
    const courseMap = new Map<number, CanvasCourse>();
    courses.forEach((c) => {
      courseMap.set(c.id, c);
    });

    // 2. Transformer Canvas API-format til FeedItem-formatet som AnnouncementCard bruker
    return data.map((item) => {
      let courseId: number | undefined = item.course_id;

      if (!courseId && item.context_code) {
        const cleaned = item.context_code.replace(/^course_/, "");
        const parsed = parseInt(cleaned, 10);
        if (!isNaN(parsed)) {
          courseId = parsed;
        }
      }

      if (!courseId && item.html_url) {
        const match = item.html_url.match(/\/courses\/(\d+)/);
        if (match && match[1]) {
          const parsed = parseInt(match[1], 10);
          if (!isNaN(parsed)) {
            courseId = parsed;
          }
        }
      }

      const matchedCourse = courseId ? courseMap.get(courseId) : undefined;
      const courseCode =
        item.course_code ||
        matchedCourse?.course_code ||
        (courseId ? `EMNE ${courseId}` : undefined);
      const courseName = matchedCourse?.name || item.context_name;

      return {
        id: String(item.id),
        title: item.title,
        content: item.message || "",
        published: item.posted_at || new Date().toISOString(),
        link: item.html_url || "#",
        author: item.user_name || "Canvas",
        courseId,
        courseCode,
        courseName,
        contextCode: item.context_code,
      };
    });
  } catch (error) {
    console.error("Kunne ikke hente kunngjøringer fra FastAPI:", error);
    return [];
  }
}
