"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ApiKeyContextType {
  calendarUrl: string | null;
  saveUrl: (key: string) => void;
  removeUrl: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

// Hjelpefunksjon for å lese cookie i nettleseren
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);

  useEffect(() => {
    const saved = getCookie("calendarUrl");
    if (saved) {
      setCalendarUrl(saved);
    }
  }, []);

  const saveUrl = (key: string) => {
    document.cookie = `calendarUrl=${encodeURIComponent(key)}; path=/; max-age=31536000; SameSite=Lax`;
    setCalendarUrl(key);
  };

  const removeUrl = () => {
    document.cookie = "calendarUrl=; path=/; max-age=0; SameSite=Lax";
    setCalendarUrl(null);
  };

  return (
    <ApiKeyContext.Provider value={{ calendarUrl, saveUrl, removeUrl }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("må brukes på innsiden av en ApiKeyProvider");
  }
  return context;
};
