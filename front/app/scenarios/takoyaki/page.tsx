"use client";
import DialogueBox from "@/app/components/dialoguebox";
import TextTyper from "@/app/components/TextTyper";
import { useEffect, useState, useRef, useMemo } from "react";

export default function Page() {
  const kansaiStory = [
    "みんなでたこ焼きパーティーを始めた！（エンターキーで次に進むよ）",
    "　　「ソースは甘口派？辛口派？」「うちは絶対マヨ多めやで！」",
    "具材を用意し、まさにこれから作ろうとしているところだ。",
    "さて、あなたはまずなにをしますか？（自由に入力してみて！）", // 4つ目のセリフ
  ];

  const [storyIndex, setStoryIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const enterAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    enterAudioRef.current = new Audio("/sounds/enter.mp3");
    enterAudioRef.current.volume = 0.5;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return; // ← Enterキー以外は無視！

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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentText =  useMemo(() =>
    typeof kansaiStory[storyIndex] === "string" ? kansaiStory[storyIndex] : ""
  , [storyIndex]
  )

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 黒背景 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          showImage ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 背景画像＋オーバーレイ */}
      <div
        className={`absolute inset-0 bg-[url('/takoyaki.jpg')] bg-cover bg-center transition-opacity duration-1000 ${
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

      {/* 入力フォーム（4つ目のセリフのとき） */}
      {storyIndex === 3 && !submitted && (
        <div className="relative z-10 mt-6 text-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="例：チーズ、明太子、こんにゃく…"
            className="px-4 py-2 rounded border border-white text-white bg-black/50 placeholder-white"
          />
          <button
            onClick={() => {
              console.log("ユーザーの具材:", userInput);
              setSubmitted(true);
            }}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            送信する
          </button>
        </div>
      )}

      {/* 送信後のリアクション */}
      {storyIndex === 3 && submitted && (
        <div className="relative z-10 mt-4 text-white text-center">
          <p>ええやん！「{userInput}」入りたこ焼き、絶対うまいで！🔥</p>
        </div>
      )}
    </div>
  );
}
