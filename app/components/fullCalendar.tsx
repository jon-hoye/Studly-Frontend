"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import tippy, { hideAll } from "tippy.js";
import type { EventApi } from "@fullcalendar/core";
import Link from "next/link";
import { useApiKey } from "@/lib/ApiKey";

function getEventColorClass(event: EventApi) {
  const colors = [
    "event-blue",
    "event-teal",
    "event-emerald",
    "event-purple",
    "event-indigo",
    "event-amber",
    "event-rose",
    "event-slate",
  ];

  const title = event.title || "";

  // Matcher standard norske emnekoder (f.eks. INF101, MAT111, DATA110, TDT4100 osv.)
  // Leter etter 2-5 bokstaver etterfulgt av 3-4 tall
  const match = title.match(/[A-ZÆØÅa-zæøå]{2,5}\s?\d{3,4}/);

  // Bruker funnet emnekode, eller fallback til hele tittelen
  const groupKey = match
    ? match[0].replace(/\s+/g, "").toUpperCase()
    : title.trim().toLowerCase();

  // DJB2 Hash basert KUN på emnekoden
  let hash = 5381;
  for (let i = 0; i < groupKey.length; i++) {
    hash = (hash << 5) + hash + groupKey.charCodeAt(i);
  }

  const index = Math.abs(hash % colors.length);
  return colors[index];
}

export default function FullCalendarComponent() {
  const { calendarUrl } = useApiKey();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="dark:dark light">
      {!calendarUrl && (
        <div className="mb-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300">
          <div className="flex items-start gap-3">
            <div>
              <h2 className="text-base font-bold font-google">
                Ingen Canvas API-nøkkel lagret
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Koble til Canvas under brukerinnstillinger for å hente kalenderen din.
              </p>
              <Link
                href="/bruker"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-200 transition font-google"
              >
                Gå til innstillinger &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      <FullCalendar
        key={calendarUrl || "empty"}
        plugins={[dayGridPlugin, iCalendarPlugin]}
        initialView="dayGridMonth"
        height="auto"
        firstDay={1}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
        }}
        eventClassNames={(arg) => getEventColorClass(arg.event)}
        dayCellContent={({ date }) => {
          const dayNumber = date.getDate();
          return <div className="font-bold">{dayNumber}</div>;
        }}
        eventDidMount={(info) => {
          // ICS-felter parses automatisk inn i event.extendedProps
          const location = info.event.extendedProps?.location
            ? `Sted: ${info.event.extendedProps.location}`
            : "";

          // Kobler tippy til event-elementet (info.el)
          tippy(info.el, {
            theme: "custom-card",
            allowHTML: true,
            placement: "top",
            arrow: true,
            animation: "fade",
            interactive: true,
            appendTo: () => document.body,
            trigger: isMobile ? "click" : "mouseenter focus",
            hideOnClick: true,
            zIndex: 99999,
            duration: [0, 0],
            delay: [0, 0],
            onShow(instance) {
              hideAll({ exclude: instance });
            },
            content: `
              <div style="display: flex; flex-direction: column; gap: 4px; max-width: 220px; text-align: left;">
                <span style="font-weight: 600; font-size: 0.9rem; color: #ffffff; line-height: 1.25;">
                  ${info.event.title}
                </span>
                ${location ? `<div style="font-size: 0.75rem; color: #e4e4e7;">${location}</div>` : ""}
              </div>
            `,
          });
        }}
        events={
          calendarUrl
            ? {
                url: "/api/calendar",
                format: "ics",
              }
            : []
        }
      />
    </div>
  );
}
