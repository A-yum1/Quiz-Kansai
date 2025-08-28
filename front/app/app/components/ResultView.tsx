import { GradingResult } from "@/app/types";

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
    <div className="p-4 rounded border space-y-3">
      <div className="font-semibold">
        スコア: {result.score} {result.passed ? "✅" : "❌"}
      </div>
      <div>理由: {result.reasoning}</div>
      <div>ポイント合計: {totalPoints}</div>
      <div>{message}</div>

      <div>
        <div className="font-medium mb-1">コメント一覧</div>
        <ul className="list-disc ml-6">
          {result.criteria_breakdown.map((c) => (
            <li key={c.id}>
              {c.comments}（{c.name}: {c.points}点）
            </li>
          ))}
        </ul>
      </div>
      <button className="border rounded px-4 py-2" onClick={onBack}>出題画面に戻る</button>
    </div>
  );
}
