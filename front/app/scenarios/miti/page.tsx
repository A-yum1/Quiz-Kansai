
"use client";
import DialogueBox from "@/app/components/dialoguebox";
import TextTyper from "@/app/components/TextTyper";
import { useEffect, useState, useRef, useMemo } from "react";

export default function Page() {
  const kansaiStory = [
    "あなたは友人と大阪へ遊びに来た！（エンターキーで次に進むよ）",
    "「あのー、すいません」「道をおたずねしたいのですが、」",
    "観光客らしき人が道に迷っているようだ。地図も渡された。",
    "さて、あなたはどのように道案内する？（自由に入力してみて！）",
  ];

  const [storyIndex, setStoryIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showMap, setShowMap] = useState(false); // ← 地図表示用
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const enterAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    enterAudioRef.current = new Audio("/sounds/enter.mp3");
    enterAudioRef.current.volume = 0.5;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      enterAudioRef.current?.play().catch(() => {});
      setStoryIndex((prev) => {
        const next = prev + 1;
        if (next < kansaiStory.length) {
          if (next === 1) setShowImage(true);
          if (next === 2) setShowMap(true); // ← 3回目のEnterで地図表示
          return next;
        }
        return prev;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentText = useMemo(
    () => kansaiStory[storyIndex] ?? "",
    [storyIndex]
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 黒背景フェード */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          showImage ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 背景画像フェード */}
      <div
        className={`absolute inset-0 bg-[url('/miti.jpg')] bg-cover bg-center transition-opacity duration-1000 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 地図表示（右上） */}
      {showMap && (
        <div className="absolute top-4 right-4 z-20 w-40 h-40 md:w-60 md:h-60 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          <img
            src="/map.png"
            alt="地図"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* セリフ表示 */}
      <div className="relative z-10">
        <DialogueBox>
          <TextTyper key={storyIndex} texts={[currentText]} />
        </DialogueBox>
      </div>

      {/* 入力フォーム */}
      {storyIndex === 3 && !submitted && (
        <div className="relative z-10 mt-6 text-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="例：駅までまっすぐ行って、右に曲がってや〜"
            className="px-4 py-2 rounded border border-white text-white bg-black/50 placeholder-white"
          />
          <button
            onClick={() => setSubmitted(true)}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            送信する
          </button>
        </div>
      )}

      {/* 入力後のリアクション */}
      {storyIndex === 3 && submitted && (
        <div className="relative z-10 mt-4 text-white text-center">
          <p>ええ案内やん！「{userInput}」、観光客も喜んどるで！🗺️</p>
        </div>
      )}
    </div>
  );
}
