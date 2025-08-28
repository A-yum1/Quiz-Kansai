"use client";
import DialogueBox from "@/app/components/dialoguebox";
import TextTyper from "@/app/components/TextTyper";
import { useEffect, useState, useRef } from "react";

export default function Page() {
  const kansaiStory = [
    "みんなでたこ焼きパーティーを始めた！アツアツのたこ焼きが机いっぱいに並んでいる！",
    "　　「ソースは甘口派？辛口派？」「うちは絶対マヨ多めやで！」",
    "ジュ〜ッという音とともに、鉄板の上でたこ焼きがくるくる回る。",
  ];

  const [storyIndex, setStoryIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const enterAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    enterAudioRef.current = new Audio("/sounds/enter.mp3");
    enterAudioRef.current.volume = 0.5;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (enterAudioRef.current) {
          enterAudioRef.current.currentTime = 0;
          enterAudioRef.current.play().catch((err) => {
            console.warn("音声再生に失敗しました:", err);
          });
        }

        setStoryIndex((prev) => {
          const next = prev + 1;
          if (next < kansaiStory.length) {
            if (next === 1) setShowImage(true);
            return next;
          }
          return prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentText = typeof kansaiStory[storyIndex] === "string" ? kansaiStory[storyIndex] : "";
  console.log({ storyIndex, currentText });
  

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 黒背景 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          showImage ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 背景画像＋オーバーレイ */}
      <div
        className={`absolute inset-0 bg-[url('/yakyuu.jpg')] bg-cover bg-center transition-opacity duration-1000 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* セリフ表示 */}
      <div className="relative z-10">
        <DialogueBox>
          <TextTyper key={storyIndex} texts={[currentText]} />
        </DialogueBox>
      </div>
    </div>
  );
}
