"use client";
import { use, useMemo } from "react";
import { useScopedStylesheet } from "@/app/hooks/useScopedStylesheet";
import { Theme, pickTheme, themeConfig } from "@/app/hooks/themeConfig";

type Props = {
  score: number;
  onBack: () => void;     // 選択画面に戻る
};

export default function ResultView({ score, onBack}: Props) {
  const theme = useMemo(() => pickTheme(score), [score]);
  const config = themeConfig[theme];

  useScopedStylesheet(config.css, config.name);

  return (
    <div className="app-container">
      <div className="button-container">
      <div id="quiz-area">
        <p id="score-text">{score}点</p>
          <button className="menu-button" onClick={onBack}>
            選択画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
