'use client';

import { useState, useRef, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { ChevronDown, ChevronUp, ExternalLink, Clock, User, Sparkles } from 'lucide-react';
import { FeedItem } from '@/lib/canvas';
import { getCourseTheme } from '@/lib/courseThemes';

interface AnnouncementCardProps {
  item: FeedItem;
  compact?: boolean;
}

export default function AnnouncementCard({ item, compact = false }: AnnouncementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canOverflow, setCanOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const cleanHtml = DOMPurify.sanitize(item.content, {
    FORBID_ATTR: ['style', 'color'],
  });
  const theme = getCourseTheme(item.courseId || 0, item.courseCode || item.author);

  // Sjekk om innholdet faktisk er høyere enn boksen
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight + 10;
        setCanOverflow(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [item.content]);

  // Formatering av dato på norsk
  const formatPublishedDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;

      if (compact) {
        return date.toLocaleDateString('no-NO', {
          day: 'numeric',
          month: 'short',
        });
      }

      return date.toLocaleDateString('no-NO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getAuthorInitials = (author: string) => {
    if (!author) return 'U';
    const parts = author.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return author.slice(0, 2).toUpperCase();
  };

  if (compact) {
    const collapsedHeight = 'h-[128px] md:h-[110px]';
    const minExpandedHeight = 'min-h-[128px] md:min-h-[110px]';

    return (
      <article
        className={`bg-white dark:bg-[#222222] border border-gray-200/70 dark:border-white/5 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 shadow-xs ${
          isExpanded ? `h-auto ${minExpandedHeight}` : collapsedHeight
        }`}
      >
        {/* Header: Emnekode, Tittel og Dato */}
        <div className="flex items-start justify-between gap-2 mb-1 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {item.courseCode && (
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold font-google shrink-0 ${theme.badgeBg} ${theme.badgeText}`}
              >
                {item.courseCode}
              </span>
            )}
            <h2 className="text-xs sm:text-sm font-semibold font-google text-gray-900 dark:text-zinc-100 truncate">
              {item.title}
            </h2>
          </div>
          <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 shrink-0 font-medium font-google">
            {formatPublishedDate(item.published)}
          </span>
        </div>

        {/* Innholdsområde */}
        <div
          ref={contentRef}
          className={`relative ${isExpanded ? 'overflow-visible' : 'flex-1 min-h-0 overflow-hidden'}`}
        >
          <div
            className="text-gray-600 dark:text-zinc-300 text-[11px] sm:text-xs leading-relaxed font-google [&_a]:text-blue-500 [&_a]:dark:text-blue-400 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          {/* Myk fade-effekt KUN når teksten faktisk er avkuttet */}
          {!isExpanded && canOverflow && (
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white dark:from-[#222222] to-transparent pointer-events-none" />
          )}
        </div>

        {/* Bunn: Knapp og link til Canvas */}
        <div className="mt-1 pt-1 border-t border-gray-100 dark:border-white/5 flex items-center justify-between shrink-0">
          {canOverflow ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold font-google text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer transition-colors"
            >
              {isExpanded ? (
                <>
                  Vis mindre <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Les mer <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          ) : (
            <div />
          )}

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-google text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 transition-colors"
          >
            {item.author} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </article>
    );
  }

  // Full-størrelse kort for Kunngjøringssiden
  return (
    <article className="bg-gray-50 dark:bg-[#1a1a1a]  border border-gray-200/50 dark:border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* Topplinje: Emnekode, Emnenavn og Dato */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {item.courseCode ? (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-google tracking-wide ${theme.badgeBg} ${theme.badgeText}`}
              >
                {item.courseCode}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold font-google bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                MittUiB
              </span>
            )}

            {item.courseName && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-google hidden sm:inline-block max-w-[280px] md:max-w-md truncate">
                {item.courseName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-google">
            <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <span>{formatPublishedDate(item.published)}</span>
          </div>
        </div>

        {/* Tittel */}
        <h2 className="text-lg sm:text-xl font-bold font-google text-gray-900 dark:text-zinc-100 tracking-tight leading-snug mb-2 transition-colors">
          {item.title}
        </h2>

        {/* Forfatterinfo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-[#282828] border border-gray-200 dark:border-white/10 flex items-center justify-center text-[10px] font-bold font-google text-gray-700 dark:text-gray-300">
            {getAuthorInitials(item.author)}
          </div>
          <span className="text-xs font-medium font-google text-gray-600 dark:text-zinc-400">
            {item.author}
          </span>
        </div>

        {/* Innholdsområde */}
        <div
          ref={contentRef}
          className={`relative ${
            isExpanded ? 'overflow-visible' : 'max-h-[140px] overflow-hidden'
          }`}
        >
          <div
            className="text-gray-700 dark:text-zinc-300 text-sm leading-relaxed font-google 
            [&_p]:mb-2.5 [&_p:last-child]:mb-0 
            [&_a]:text-blue-500 [&_a]:dark:text-blue-400 [&_a]:underline [&_a:hover]:text-blue-600 dark:[&_a:hover]:text-blue-300 
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 
            [&_li]:mb-1 
            [&_strong]:font-semibold [&_strong]:text-gray-900 dark:[&_strong]:text-white
            [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-gray-200 dark:[&_th]:border-white/10 [&_th]:p-2 [&_td]:border [&_td]:border-gray-200 dark:[&_td]:border-white/10 [&_td]:p-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500/40 [&_blockquote]:pl-3 [&_blockquote]:py-1 [&_blockquote]:italic [&_blockquote]:my-2"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          {/* Myk fade gradient når kollapset */}
          {!isExpanded && canOverflow && (
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-[#1a1a1a] to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      {/* Bunn: Les mer og lenke til Canvas */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        {canOverflow ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold font-google text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors py-1"
          >
            {isExpanded ? (
              <>
                Vis mindre <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Les hele kunngjøringen <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <div />
        )}

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold font-google text-gray-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200/50 dark:border-white/5"
        >
          <span>Åpne i Canvas</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
