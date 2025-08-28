"use client";

import React, { useState, useEffect } from "react";
import DialogueBox from "./dialoguebox";

interface Scene {
  text: string;
  background: string;
}

interface SceneTyperProps {
  scenes: Scene[];
  speed?: number;
}

export default function SceneTyper({ scenes, speed = 50 }: SceneTyperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showBackground, setShowBackground] = useState(false); // 最初は非表示

  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
  }, [currentIndex]);

  useEffect(() => {
    if (charIndex < scenes[currentIndex].text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + scenes[currentIndex].text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, scenes, currentIndex, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (!showBackground) {
          setShowBackground(true); // 最初のEnterで背景表示
        } else if (charIndex >= scenes[currentIndex].text.length) {
          if (currentIndex < scenes.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [charIndex, currentIndex, scenes, showBackground]);

  const currentBackground = scenes[currentIndex].background;

  return (
    <div
      className={`w-full h-screen bg-center bg-cover flex items-end justify-center p-8 transition-opacity duration-1000 ${
        showBackground ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      {showBackground && <DialogueBox>{displayedText}</DialogueBox>}
    </div>
  );
}