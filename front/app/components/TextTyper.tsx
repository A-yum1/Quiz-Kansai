"use client";
import React, { useState, useEffect } from "react";

interface TextTyperProps {
  text: string;
  speed?: number; // ミリ秒（1文字あたりの表示速度）
}

export default function TextTyper({ text, speed = 50 }: TextTyperProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // リセット
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}