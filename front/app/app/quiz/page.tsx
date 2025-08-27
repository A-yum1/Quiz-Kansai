"use client";
import { useEffect, useState } from "react";

type PublicChallenge = {
  id: string;
  title: string;
  prompt_user: string;
  version: number;
};

type Criterion = {
  id: string;
  name: string;
  weight: number;
  points: number;
  comments: string;
};

type GradingResult = {
  score: number;
  passed: boolean;
  reasoning: string;
  criteria_breakdown: Criterion[];
};

export default function Page() {
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<GradingResult | null>(null);

  useEffect(() => {
    fetch("/api/challenges")
      .then((r) => r.json())
      .then(setChallenges);
  }, []);

  const onGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId: selected, answer }),
    });
    const json = await res.json();

    // API 側で "parsed" に入って返ってくる場合があるのでハンドリング
    setResult(json.parsed ?? json);
  };

  const current = challenges.find((c) => c.id === selected);

  // ポイント合計を算出
  const totalPoints =
    result?.criteria_breakdown?.reduce((sum, c) => sum + c.points, 0) ?? 0;

  return (
    <main className="mx-auto max-w-[800px] p-6 space-y-6">
      <h1 className="text-2xl font-bold">お題で採点</h1>

      <div className="space-y-2">
        <label className="block font-medium">お題を選択</label>
        <select
          className="border rounded px-3 py-2"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- 選択してください --</option>
          {challenges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}（v{c.version}）
            </option>
          ))}
        </select>
      </div>

      {current && (
        <div className="p-4 rounded border">
          <div className="font-semibold mb-2">お題</div>
          <p>{current.prompt_user}</p>
        </div>
      )}

      <form onSubmit={onGrade} className="space-y-3">
        <textarea
          className="w-full border rounded p-3 min-h-[160px]"
          placeholder="ここに回答を入力"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          type="submit"
          disabled={!selected || !answer}
          className="border rounded px-4 py-2"
        >
          採点する
        </button>
      </form>

      {result && (
        <div className="p-4 rounded border space-y-3">
          <div className="font-semibold">
            スコア: {result.score} {result.passed ? "✅" : "❌"}
          </div>
          <div>理由: {result.reasoning}</div>
          <div>ポイント合計: {totalPoints}</div>

          <div>
            <div className="font-medium mb-1">コメント一覧</div>
            <ul className="list-disc ml-6">
              {result.criteria_breakdown?.map((c) => (
                <li key={c.id}>
                  {c.comments}（{c.name}: {c.points}点）
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
