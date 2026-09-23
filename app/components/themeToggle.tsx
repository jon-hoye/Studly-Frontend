"use client";

import { Switch } from "@/components/ui/switch";
import useTheme from "@/lib/useTheme";

export default function ThemeSwitch() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Forhindrer hydration mismatch og hoppende bryter før klienten er klar
  if (!mounted) {
    return <div className="w-8 h-[18.4px] inline-block" aria-hidden="true" />;
  }

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      aria-label="Bytt mørk modus"
    />
  );
}