"use client";
import "../styles/title.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // 既存 script.js のグローバル関数を呼ぶ（存在しなければ何もしない）
  const call = (name: "startQuiz" | "restartQuiz") => {
    const fn = (window as unknown as Record<string, unknown>)[name];
    if (typeof fn === "function") {
      (fn as () => void)();
    }
  };

  const handleStart = () => {
    call("startQuiz"); // ← 既存の関数も呼び出す
    router.push("/about"); // ← ページ遷移
  };

  return (
    <div className="title-page">
      <div className="app-container">
        <h1></h1>

        <div id="quiz-area">
          <h2 id="question"></h2>

          <div className="button-container">
            <button className="menu-button" onClick={handleStart}>
              スタート
            </button>
            <button className="menu-button">ランキング</button>
          </div>
        </div>

        <div
          id="result-area"
          className="result-container"
          style={{ display: "none" }}
        >
          <p id="result-text"></p>
          <p id="score-text"></p>
          <button
            className="restart-btn"
            onClick={() => call("restartQuiz")}
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}
