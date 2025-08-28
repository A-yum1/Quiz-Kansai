"use client";
import { useMemo } from "react";
import { useThemeStylesheet } from "@/app/hooks/useThemeStylesheet";

type Props = {
  score: number;
  onBack: () => void;
  onRestart: () => void;
};

function pickThemeHref(score: number) {
  if (score >= 80) return "/themes/high-score.css";
  if (score >= 60) return "/themes/middle-score.css";
  return "/themes/low-score.css";
}

export default function ResultView({ score, onBack, onRestart }: Props) {
  const href = useMemo(() => pickThemeHref(score), [score]);
  useThemeStylesheet(href); // ここで <link id="theme-css" href="..."> を差し替え
  console.log("ResultView score", score, href);

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
        <p id="score-text">スコア: {score}</p>
        <button className="restart-btn" onClick={onRestart}>
          もう一度診断する
        </button>
      </div>
    </div>
  );
}
