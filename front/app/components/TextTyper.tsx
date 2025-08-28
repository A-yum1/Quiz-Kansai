"use client";
import React, { useEffect, useState, useRef } from "react";

interface TextTyperProps {
  texts: (string | undefined)[];
  speed?: number;
}

export default function TextTyper({ texts, speed = 50 }: TextTyperProps) {
  const [displayed, setDisplayed] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

console.log(texts);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/type.mp3");
    audioRef.current.volume = 0.3;
  }, []);

  useEffect(() => {
    let index = 0;
    setDisplayed("");

    const text = typeof texts[0] === "string" ? texts[0] : "";
    const interval = setInterval(() => {
      if (index < text.length) {
        if (typeof texts[0] !== "string") return
        const c=text.slice(index, index + 1);
        if (c === undefined ) {
          return;
        }
        setDisplayed((prev) => prev + text.slice(index, index + 1));

        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch((err) => {
            console.warn("タイプ音の再生に失敗しました:", err);
          });
        }

        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [texts, speed]);

  console.log({ displayed });
  

  return <span>{displayed}</span>;
}
