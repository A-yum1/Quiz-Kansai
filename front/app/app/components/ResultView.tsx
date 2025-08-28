import { GradingResult } from "@/types";

type Props = {
  result: GradingResult;
  onBack: () => void;
};

export default function ResultView({ result, onBack }: Props) {
  const totalPoints = result.criteria_breakdown.reduce(
    (sum, c) => sum + c.points,
    0
  );

  // 3段階評価
  const threshold1 = 60;
  const threshold2 = 80;
  let message = "";
  if (totalPoints >= threshold2) {
    message = "とてもよくできました 🎉";
  } else if (totalPoints >= threshold1) {
    message = "よくできました 👍";
  } else {
    message = "がんばりましょう 💪";
  }

  return (
    <div>
      <div>
        スコア: {result.score} {result.passed ? "✅" : "❌"}
      </div>
      <div>理由: {result.reasoning}</div>
      <div>ポイント合計: {totalPoints}</div>
      <div>{message}</div>

      <div>
        <div>コメント一覧</div>
        <ul>
          {result.criteria_breakdown.map((c) => (
            <li key={c.id}>
              {c.comments}（{c.name}: {c.points}点）
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onBack}>出題画面に戻る</button>
    </div>
  );
}
