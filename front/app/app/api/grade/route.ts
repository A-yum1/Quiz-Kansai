// app/api/grade/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { CHALLENGES } from "@/server/data/challenges";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Zod スキーマ（型も同時に得られる）
const GradingResult = z.object({
  score: z.number(),
  passed: z.boolean(),
  reasoning: z.string(),
  criteria_breakdown: z.array(z.object({
    id: z.string(),
    name: z.string(),
    weight: z.number(),
    points: z.number(),
    comments: z.string(),
  })),
});
type GradingResult = z.infer<typeof GradingResult>;

export async function POST(req: NextRequest) {
  const { challengeId, answer } = await req.json();

  const challenge = CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return new Response("not found", { status: 404 });

  // 評価者プロンプト
  const SYSTEM = `
あなたは厳格で公平な採点官です。出力は必ず指定のJSONスキーマに一致させてください。
採点はルーブリックに基づき、観点ごとの配点を明示します。
忖度せず、根拠（reasoning）を具体例とともに短く示してください。
`;

  // ルーブリック + 手順（非公開）
  const DEV = `
# ルーブリック(JSON)
${JSON.stringify(challenge.rubric, null, 2)}

# 採点手順
1) criteria[].weight と max_score を使い、各観点の満点 = weight * max_score とする
2) 減点・加点の根拠を短く書く
3) 合計 score, 合否 passed(score >= pass_threshold) を算出
4) 出力は JSON スキーマに厳密一致
`;

  // ユーザー提出
  const USER = `# 提出
${answer}
`;

  // ★ Zod で構造化出力をパースして返す
  const resp = await client.responses.parse({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: SYSTEM },
      { role: "system", content: DEV },
      { role: "user", content: USER },
    ],
    response_format: zodResponseFormat(GradingResult, "grading_result"),
  });

// ...existing code...
const data = [
  {
    reasoning: "AIの回答の理由",
    score: 85,
    passed: true,
    criteria_breakdown: [
      {
        id: "1",
        name: "正確性",
        weight: 0.5,
        points: 42.5,
        comments: "正確な回答でした"
      },
      // 必要に応じて他のcriteriaを追加
    ]
  }
];
// ...existing code...

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
