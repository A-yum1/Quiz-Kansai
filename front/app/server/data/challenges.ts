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
    //作問者コメント：基本的に関西感がどれだけあるかなので、京都や大阪などの区別なく基準を作成する。
    id: "situation-001",
    title: "道案内",
    prompt_user: "道に迷っている人に、関西弁で道案内をする",
    rubric: {
      scale: { min: 0, max: 100, pass_threshold: 60 },
      criteria: [
        {
          id: "politeness",
          name: "丁寧さ",
          weight: 0.4,
          description: "いい加減であり、かつ不適切でない言葉がつかえているか",
          deductions: ["丁寧な表現", "具体的な説明", "優しい言葉使い"],
          examples: { good: "～やねん, いったらええねん", bad: "～です、～つきますよ" }
        },
        {
          id: "expression",
          name: "表現",
          weight: 0.4,
          description: "関西人らしい表現で道順を示せているか",
          deductions: ["関西人らしくない表現"],
          examples: {good: "上る, ～しはる, ～やねん", bad: "～ください、～ありますよ" }
        },
        {
          id: "appropriateness",
          name: "適切さ",
          description: "不適切な表現を使っていないか",
          weight: 0.2,
          deductions: ["下ネタ", "暴力的な表現"],
          examples: { good: "進む, いったらええねん", bad: "どっか行けや, ぶっ飛ばすぞ" }
        }
      ]
    },
    max_score: 100,
    version: 1,
  },
  {
    id: "situation-002",
    title: "たこ焼き",
    prompt_user: "友達とたこ焼きをやく",
    rubric: {
      scale: { min: 0, max: 100, pass_threshold: 60 },
      criteria: [
        {
          id: "positivity",
          name: "積極性",
          weight: 0.4,
          description: "自ら進んで作業を行っているか",
          deductions: ["待つ", "丁寧", "受け身"],
          examples: { good: "銀だこ店員のように焼く", bad: "待っている" }
        },
        {
          id: "expression",
          name: "表現",
          weight: 0.3,
          description: "ユーモアを交えた行動ができているか",
          deductions: ["関西人らしくない行動"],
          examples: {good: "たこ焼きを焼くときに笑いを交える,手際がいい", bad: "無表情で焼く" }
        },
        {
          id: "appropriateness",
          name: "適切さ",
          weight: 0.3,
          description: "状況に応じた行動ができているか",
          deductions: ["不適切な行動", "下ネタ", "暴力的な表現"],
          examples: { good: "タコを焼く, 待つ", bad: "焼けてないたこ焼きを食べる,タコ焼き機をひっくり返す,帰る" }
        },
      ]
    },
    max_score: 100,
    version: 1,
  },
  {
    id: "situation-003",
    title: "試食コーナーを見つけたとき",
    prompt_user: "試食コーナーを見つけたときの行動を考えてください。",
    rubric: {
      scale: { min: 0, max: 100, pass_threshold: 60 },
      criteria: [
        {
          id: "素早さ",
          name: "素早さ",
          weight: 0.4,
          description: "素早く行動できているか",
          deductions: ["遅い", "ためらい", "無駄な動き,行かない"],
          examples: { good: "すぐに試食コーナーに向かう", bad: "迷っている,行かない" }
        },
        {
          id: "expression",
          name: "表現",
          weight: 0.4,
          description: "ユーモアを感じることができるか",
          deductions: ["試食しない", "関西人らしくない行動"],
          examples: {good: "いっぱい食べる,商品を買わない", bad: "試食しない,商品を買う" }
        },
        {
          id: "appropriateness",
          name: "適切さ",
          weight: 0.2,
          description: "不適切な表現を使っていないか",
          deductions: ["下ネタ", "暴力的な表現"],
          examples: {good: "うまい, 最高", bad: "クソ, まずい" }
        },
      ]
    },
    max_score: 100,
    version: 1,
  },
  {
    id: "situation-004",
    title: "野球観戦",
    prompt_user: "阪神タイガースの応援に行ったとき、どんな行動をするか。例を挙げてください。",
    rubric: {
      scale: { min: 0, max: 100, pass_threshold: 60 },
      criteria: [
        {
          id: "enthusiasm",
          name: "熱意",
          weight: 0.4,
          description: "阪神タイガースへの熱い思いが表れているか",
          deductions: ["応援していない", "無関心", "冷たい態度"],
          examples: { good: "大声で応援する,ヤジを飛ばす,審判に怒る", bad: "黙っている,仕方がないと考える" }
        },
        {
          id: "expression",
          name: "表現",
          weight: 0.4,
          description: "汚い言葉がつかえているか",
          deductions: ["汚い言葉を使わない", "品のない言葉を使わない"],
          examples: {good: "打てやボケ,目ついてんのか,どう考えてもストライクやろ", bad: "惜しい,すごい,やったー" }
        },
        {
          id: "appropriateness",
          name: "適切さ",
          weight: 0.2,
          description: "下ネタを使わず、暴力的な表現ができているか",
          deductions: ["下ネタ"],
          examples: {good: "打てやボケ,目ついてんのか,どう考えてもストライクやろ", bad: "下ネタ" }
        },
      ]
    },
    max_score: 100,
    version: 1,
  },
];
