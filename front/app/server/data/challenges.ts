// server/data/challenges.ts
export type Rubric = {
  scale: { min: number; max: number; pass_threshold?: number };
  criteria: Array<{
    id: string;
    name: string;
    weight: number;        // 重み 0~1 の合計1想定
    description: string;   // 何を観るか
    deductions?: string[]; // 減点例
    examples?: { good?: string; bad?: string };
  }>;
};

export type Challenge = {
  id: string;
  title: string;
  prompt_user: string; // UIに表示する「お題」
  rubric: Rubric;      // 採点基準（サーバ専用）
  max_score: number;
  version: number;
};

export const CHALLENGES: Challenge[] = [
  {
    id: "writing-001",
    title: "メール文章（敬語）",
    prompt_user: "上司に会議の延期を依頼するメール文を200〜300字で書いてください。",
    max_score: 100,
    version: 1,
    rubric: {
      scale: { min: 0, max: 100, pass_threshold: 70 },
      criteria: [
        { id: "politeness", name: "敬語・礼節", weight: 0.35,
          description: "敬語の適切さ、失礼がないか",
          deductions: ["ぞんざいな言い回し", "謝罪/お願いの不足"] },
        { id: "clarity", name: "要件の明確さ", weight: 0.35,
          description: "延期理由・候補日時などが明確",
          deductions: ["理由不明確", "代替提案なし"] },
        { id: "format", name: "形式・読みやすさ", weight: 0.2,
          description: "件名/挨拶/署名などの形式、段落構成" },
        { id: "length", name: "分量遵守", weight: 0.1,
          description: "200~300字か", deductions: ["極端な過不足"] }
      ]
    }
  }
];
