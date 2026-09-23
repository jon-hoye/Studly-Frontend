export interface CourseColorTheme {
  badgeBg: string;
  hoverBg: string;
  badgeText: string;
  hoverBorder: string;
  leftBorder: string;
  iconColor: string;
}

export const COURSE_COLOR_PALETTES: CourseColorTheme[] = [
  // 1. Blå
  {
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    hoverBg: "hover:bg-blue-500/15 dark:hover:bg-blue-500/25",
    badgeText: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500/50",
    leftBorder: "border-l-blue-500",
    iconColor: "text-blue-500",
  },
  // 2. Smaragdgrønn
  {
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    hoverBg: "hover:bg-emerald-500/15 dark:hover:bg-emerald-500/25",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
    leftBorder: "border-l-emerald-500",
    iconColor: "text-emerald-500",
  },
  // 3. Fiolett / Lilla
  {
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    hoverBg: "hover:bg-purple-500/15 dark:hover:bg-purple-500/25",
    badgeText: "text-purple-600 dark:text-purple-400",
    hoverBorder: "hover:border-purple-500/50",
    leftBorder: "border-l-purple-500",
    iconColor: "text-purple-500",
  },
  // 4. Rav / Amber
  {
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    hoverBg: "hover:bg-amber-500/15 dark:hover:bg-amber-500/25",
    badgeText: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/50",
    leftBorder: "border-l-amber-500",
    iconColor: "text-amber-500",
  },
  // 5. Rosa / Rose
  {
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    hoverBg: "hover:bg-rose-500/15 dark:hover:bg-rose-500/25",
    badgeText: "text-rose-600 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500/50",
    leftBorder: "border-l-rose-500",
    iconColor: "text-rose-500",
  },
  // 6. Cyan / Teal
  {
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    hoverBg: "hover:bg-cyan-500/15 dark:hover:bg-cyan-500/25",
    badgeText: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-500/50",
    leftBorder: "border-l-cyan-500",
    iconColor: "text-cyan-500",
  },
  // 7. Indigo
  {
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    hoverBg: "hover:bg-indigo-500/15 dark:hover:bg-indigo-500/25",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
    leftBorder: "border-l-indigo-500",
    iconColor: "text-indigo-500",
  },
  // 8. Oransje
  {
    badgeBg: "bg-orange-500/10 dark:bg-orange-500/20",
    hoverBg: "hover:bg-orange-500/15 dark:hover:bg-orange-500/25",
    badgeText: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-500/50",
    leftBorder: "border-l-orange-500",
    iconColor: "text-orange-500",
  },
];

export function getCourseTheme(id: number, code?: string): CourseColorTheme {
  let hash = id || 0;
  if (code) {
    for (let i = 0; i < code.length; i++) {
      hash = (hash << 5) - hash + code.charCodeAt(i);
      hash |= 0;
    }
  }
  const index = Math.abs(hash) % COURSE_COLOR_PALETTES.length;
  return COURSE_COLOR_PALETTES[index];
}
