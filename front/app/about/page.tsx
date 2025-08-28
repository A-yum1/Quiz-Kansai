"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const choices = [
    { emoji: "🐙", label: "たこ焼きパーティー" },
    { emoji: "🎢", label: "USJで並んでる時" },
    { emoji: "🤣", label: "初対面でノリツッコミ" },
    { emoji: "👜", label: "おばちゃんとの買い物" },
    { emoji: "🍣", label: "回転寿司で皿取り合戦" },
    { emoji: "🚌", label: "混んだバスで知らん人としゃべる" },
    { emoji: "🎤", label: "カラオケでマイク渡されたとき" },
    { emoji: "🍵", label: "京都で観光客に道聞かれたとき" },
    { emoji: "⛩️", label: "初詣の行列に並んでる時" },
    { emoji: "📦", label: "商店街で試食すすめられた時" },
  ];

  const handleClick = (label: string) => {
    alert(`『${label}』を選んだんやな！ ほな、次いくで〜！`);
    // router.push(`/quiz?scene=${encodeURIComponent(label)}`);
  };

  return (
    <main
      className="relative min-h-screen flex flex-col text-center font-bold text-white"
      style={{
        backgroundImage: "url('/haikei.jpg')",
        backgroundSize: "1530px auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* オーバーレイ（背景を暗くして文字を見やすく） */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* ヘッダー */}
        <header className="bg-black text-yellow-300 text-3xl md:text-5xl py-6 shadow-lg animate-pulse">
          ✨ 関西人能力測定 ✨
        </header>

        {/* 説明 */}
        <div className="bg-black/70 border-4 border-dashed border-yellow-300 rounded-2xl mx-auto mt-8 p-6 w-11/12 md:w-3/4 text-lg leading-relaxed">
          🗣️ ほな、これからアンタがほんまに関西人かどうか、<br />
          わてがガッツリ診断したるわ！<br />
          好きなシチュエーションを選んでや！
        </div>

        {/* シチュエーション選択 */}
        <div className="mx-auto mt-10 w-11/12 md:w-3/4 flex-1 overflow-y-auto max-h-[500px] pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            {choices.map((c) => (
              <button
                key={c.label}
                onClick={() => handleClick(c.label)}
                className="bg-red-600 border-4 border-yellow-400 text-xl py-6 rounded-2xl shadow-[4px_4px_0px_black] hover:bg-orange-500 active:scale-95 active:shadow-[2px_2px_0px_black] transition transform w-full"
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* フッター */}
        <footer className="bg-yellow-300 text-black mt-auto py-4 text-sm">
          © 2025 LB同志社
        </footer>
      </div>
    </main>
  );
}