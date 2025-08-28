"use client";
import "./title.css";

export default function Page() {
  // 既存 script.js のグローバル関数を呼ぶ（存在しなければ何もしない）
  const call = (name: "startQuiz" | "restartQuiz") =>
    (window as any)?.[name]?.();

  return (
    <div className="app-container">
      <h1></h1>

      <div id="quiz-area">
        <h2 id="question"></h2>

        <div className="button-container">
          <button className="menu-button" onClick={() => call("startQuiz")}>
            スタート
          </button>
          <button className="menu-button">ランキング</button>
        </div>
      </div>

      <div id="result-area" className="result-container" style={{ display: "none" }}>
        <p id="result-text"></p>
        <p id="score-text"></p>
        <button className="restart-btn" onClick={() => call("restartQuiz")}>
          もう一度診断する
        </button>
      </div>
    </div>
  );
}
