"use client";
import React, { useEffect, useState, useRef } from "react";

interface TextTyperProps {
  texts: (string | undefined)[];
  speed?: number;
}

export default function TextTyper({ texts, speed = 50 }: TextTyperProps) {
  const [displayed, setDisplayed] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/type.mp3");
    audioRef.current.volume = 0.3;
  }, []);

  useEffect(() => {
    if (!texts || !texts[0]) return;

    const fullText = texts[0] ?? "";
    let index = 0;
    setDisplayed(""); // タイピングやり直しのためにリセット

    const interval = setInterval(() => {
      if (index < fullText.length) {
        const c = fullText[index];
        setDisplayed((prev) => prev + c);

        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }

        index++;
      } else {
        clearInterval(interval);
        // タイピング完了後も全文を保持（固定表示）
        setDisplayed(fullText);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return <span>{displayed}</span>;
}
