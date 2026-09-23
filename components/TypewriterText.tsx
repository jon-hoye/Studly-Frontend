"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterText({
  words = ["samlet", "forenklet", "organisert"],
  typingSpeed = 110,
  deletingSpeed = 100,
  pauseDuration = 3000,
  className = "inline-block pr-1 sm:pr-2 pb-2 md:pb-3.5 bg-gradient-to-r dark:from-[#3b6fff] dark:to-[#3ba7ff] from-blue-500 to-blue-400 bg-clip-text text-transparent italic",
  cursorClassName = "text-blue-500 dark:text-[#3ba7ff] font-light not-italic ml-0.5 select-none",
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const fullWord = words[wordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className="inline-flex items-baseline justify-center">
      <span className={className}>{currentText || "\u00A0"}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
        className={`inline-block ${cursorClassName}`}
      >
        |
      </motion.span>
    </span>
  );
}
