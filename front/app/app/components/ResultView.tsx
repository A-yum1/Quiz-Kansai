"use client";
import { useMemo } from "react";
import { useScopedStylesheet } from "@/app/hooks/useScopedStylesheet";

type Props = {
  score: number;
  onBack: () => void;     // 選択画面に戻る
  onRestart: () => void;  // もう一度
};

function pickCssHref(score: number) {
  // 得点に応じて読み込むCSSを切り替え
  if (score >= 80) return "/themes/high-score.css";
  if (score >= 60) return "/themes/middle-score.css";
  return "/themes/bad-score.css";
}

export default function ResultView({ score, onBack, onRestart }: Props) {
  const href = useMemo(() => pickCssHref(score), [score]);
  // ここでこの画面の間だけCSSを適用。離れたら自動で外れる。
  useScopedStylesheet(href, "high-score-css");

  return (
    <div className="app-container">
      <h1></h1>

      <div id="quiz-area">
        <h2 id="question"></h2>

        <div className="button-container">
          <button className="menu-button" onClick={onBack}>
            選択画面に戻る
          </button>
        </div>
      </div>

      <div id="result-area" className="result-container" style={{ display: "none" }}>
        <p id="result-text"></p>
        <p id="score-text">スコア：{score}</p>
        <button className="restart-btn" onClick={onRestart}>
          もう一度診断する
        </button>
      </div>
    </div>
  );
}
