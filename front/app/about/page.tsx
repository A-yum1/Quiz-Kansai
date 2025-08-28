"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const choices = [
    { emoji: "🐙", label: "たこ焼きパーティー" },
    { emoji: "🗺️", label: "観光客に道を尋ねられた時" },
    { emoji: "🍢", label: "試食コーナーを見つけた時" },
    { emoji: "⚾", label: "野球観戦" },
  ];

  const getSoundFile = (label: string): string => {
    switch (label) {
      case "たこ焼きパーティー":
        return "/sounds/takoyaki.mp3";
      case "観光客に道を尋ねられた時":
        return "/sounds/miti.mp3";
      case "試食コーナーを見つけた時":
        return "/sounds/sisyoku.mp3";
      case "野球観戦":
        return "/sounds/yakyuu.mp3";
      default:
        return "/sounds/default.mp3";
    }
  };

  const fadeInAudio = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play();
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol += 0.05;
      if (vol < 1) {
        audio.volume = Math.min(vol, 1);
      } else {
        clearInterval(fadeIn);
      }
    }, 100); // 約2秒でフェードイン
  };

  const fadeOutAndStop = (audio: HTMLAudioElement, callback: () => void) => {
    let vol = audio.volume;
    const fadeOut = setInterval(() => {
      vol -= 0.05;
      if (vol > 0) {
        audio.volume = Math.max(vol, 0);
      } else {
        clearInterval(fadeOut);
        audio.pause();
        audio.currentTime = 0;
        callback(); // フェードアウト後にページ遷移
      }
    }, 100); // 約2秒でフェードアウト
  };

  const handleClick = (label: string) => {
    setSelectedLabel(label);

    const soundPath = getSoundFile(label);
    const audio = new Audio(soundPath);

    fadeInAudio(audio); // 🔊 フェードイン再生

    // 🎬 1秒演出 → フェードアウト → ページ遷移
    setTimeout(() => {
      fadeOutAndStop(audio, () => {
        setSelectedLabel(null);
        switch (label) {
          case "たこ焼きパーティー":
            router.push("/scenarios/takoyaki");
            break;
          case "観光客に道を尋ねられた時":
            router.push("/scenarios/miti");
            break;
          case "試食コーナーを見つけた時":
            router.push("/scenarios/sisyoku");
            break;
          case "野球観戦":
            router.push("/scenarios/yakyuu");
            break;
          default:
            alert(`『${label}』を選んだんやな！ ほな、いくで〜！`);
        }
      });
    }, 2000); // 2秒後にフェードアウト開始
  };

  return (
    <main
      className={`relative min-h-screen flex flex-col text-center font-bold text-white ${
        selectedLabel ? "overflow-hidden" : ""
      }`}
      style={{
        backgroundImage: "url('/haikei.jpg')",
        backgroundSize: "1530px auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`absolute inset-0 z-0 transition duration-500 ${
          selectedLabel ? "backdrop-blur-sm bg-black/50" : "bg-black/40"
        }`}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="bg-black text-yellow-300 text-3xl md:text-5xl py-6 shadow-lg animate-pulse">
          ✨ 関西人能力測定 ✨
        </header>

        <div className="bg-black/70 border-4 border-dashed border-yellow-300 rounded-2xl mx-auto mt-8 p-6 w-11/12 md:w-3/4 text-lg leading-relaxed">
          🗣️ ほな、これからアンタがほんまに関西人かどうか、<br />
          わてがガッツリ診断したるわ！<br />
          好きなシチュエーションを選んでや！
        </div>

        <div className="mx-auto mt-10 w-11/12 md:w-2/3 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            {choices.map((c) => (
              <button
                key={c.label}
                onClick={() => handleClick(c.label)}
                disabled={!!selectedLabel}
                className={`bg-red-600 border-4 border-yellow-400 text-xl py-6 rounded-2xl shadow-[4px_4px_0px_black] hover:bg-orange-500 active:scale-95 active:shadow-[2px_2px_0px_black] transition transform w-full ${
                  selectedLabel ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        <footer className="bg-yellow-300 text-black mt-auto py-4 text-sm">
          © 2025 LB同志社
        </footer>
      </div>

      {selectedLabel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-yellow-400 text-red-800 text-4xl md:text-6xl px-10 py-6 rounded-full shadow-2xl border-8 border-red-600 animate-bounce">
            🎉 {selectedLabel} 🎉
          </div>
        </div>
      )}
    </main>
  );
}
