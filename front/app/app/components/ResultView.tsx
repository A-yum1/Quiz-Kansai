"use client";
import { use, useMemo } from "react";
import { useScopedStylesheet } from "@/app/hooks/useScopedStylesheet";
import { Theme, pickTheme, themeConfig } from "@/app/hooks/themeConfig";

type Props = {
  score: number;
  onBack: () => void;     // 選択画面に戻る
  onRestart: () => void;  // もう一度
};

export default function ResultView({ score, onBack, onRestart }: Props) {
  const theme = useMemo(() => pickTheme(score), [score]);
  const config = themeConfig[theme];

  useScopedStylesheet(config.css, config.name);

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

      <div id="result-area" className="result-container">
        <p id="result-text">{config.messages.result}</p>
        <p id="score-text">スコア：{score}</p>
        <button className="restart-btn" onClick={onRestart}>
          もう一度診断する
        </button>
      </div>
    </div>
  );
}
