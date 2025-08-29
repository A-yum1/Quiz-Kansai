export type PublicChallenge = {
  id: string;
  title: string;
  prompt_user: string;
  version: number;
};

export type Criterion = {
  id: string;
  name: string;
  weight: number;
  points: number;
  comments: string;
};

export type GradingResult = {
  score: number;
  passed: boolean;
  reasoning: string;
  criteria_breakdown: Criterion[];
};
