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
    //作問者コメント：京都の碁盤の目の街並みを理解して、観光客に道案内できるかを問う問題。大阪みたいに適当な擬音で進めるのはNG。
    //道の名前は必須ではない(覚え歌を知ってる京都人じゃないと厳しい)が、言えるとより良い。
    id: "situation-001",
    title: "京都で観光客に道聞かれた時",
    prompt_user: "観光客に道を聞かれた！その場所は、今の場所(烏丸御池)から『2ブロック北、4ブロック西の交差点より少し西』にある。京都人らしく教えてあげよう。",
    rubric: {
      scale: { min: 0, max: 100, pass_threshold: 60 },
      criteria: [
        {
          id: "politeness",
          name: "丁寧さ",
          weight: 0.3,
          description: "丁寧で礼儀正しい表現を使っているか",
          deductions: ["失礼な表現", "命令形", "カジュアルすぎる"],
          examples: { good: "〜ですよ ,～ますよ", bad: "〜しなさい, ～しろ" }
        },
        {
          id: "expression",
          name: "表現",
          weight: 0.3,
          description: "京都らしい表現で道順を示せているか",
          deductions: ["京都らしくない表現"],
          examples: {good: "上る, ～しはる, 西入る", bad: "進む, ～する" }
        },
        {id: "geography",
          name: "地理の理解",
          description: "碁盤の目の街並みを理解して、それを伝えられるか。御池通の2本北は二条通, 烏丸通の4本西は新町通。道の名前は必須ではないが、言えるとより良い。",
          weight: 0.2,
          deductions: ["方角やブロック数の間違い, 道の名前の間違い"],
          examples: { good: "烏丸, 御池, 二条, 新町, まっすぐ", bad: "知らない, わからない, どこか"}
        },
        {id: "emotion",
          name: "感情",
          description: "親切に教えてあげようという気持ちが伝わるか。相手を不安にさせないか",
          weight: 0.2,
          deductions: ["冷たい, 事務的, 無関心"],
          examples: { good: "お気をつけて, いってらっしゃい", bad: "はい, じゃあね" }
        }
      ]
    },
    max_score: 100,
    version: 1,
  }
];
