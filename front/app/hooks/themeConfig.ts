export type Theme = "low" | "middle" | "high";

export const themeConfig: Record<Theme, { css: string; name: string, messages: { result: string } }> = {
  low: {
    css: "/themes/low-score.css",
    name: "low-score.css",
    messages: { result: "まだまだこれからやで！" },
  },
  middle: {
    css: "/themes/middle-score.css",
    name: "middle-score.css",
    messages: { result: "なかなかやるやん！" },
  },
  high: {
    css: "/themes/high-score.css",
    name: "high-score.css",
    messages: { result: "完璧や！あんた関西人やな！" },
  },
};

export function pickTheme(score: number): Theme {
  if (score >= 80) return "high";
  if (score >= 60) return "middle";
  return "low";
}
