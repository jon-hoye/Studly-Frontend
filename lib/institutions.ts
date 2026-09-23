

export function getCanvasBaseUrl(institutionId?: string | null): string {
  const inst = (institutionId || "uib").trim().toLowerCase();
  if (inst === "uib") {
    return "https://mitt.uib.no";
  }
  return `https://${inst}.instructure.com`;
}

export function getCanvasCourseUrl(courseId: number | string, institutionId?: string | null): string {
  const baseUrl = getCanvasBaseUrl(institutionId);
  return `${baseUrl}/courses/${courseId}`;
}

export function getTpUrl(institutionId?: string | null): string {
  const inst = (institutionId || "uib").trim().toLowerCase();
  return `https://tp.educloud.no/${inst}/`;
}
