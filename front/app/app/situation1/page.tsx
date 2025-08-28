"use client";
import { useEffect, useState } from "react";
import ChallengeView from "@/app/components/ChallengeView";
import ResultView from "@/app/components/ResultView";
import { PublicChallenge, GradingResult } from "@/app/situation1/types";

export default function Page() {
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<GradingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"challenge" | "result">("challenge");

  // このページのお題ID
  const situationId = "situation-001";

  useEffect(() => {
    fetch("/api/challenges")
      .then((r) => r.json())
      .then(setChallenges);
  }, []);

  const onGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId: situationId, answer }),
    });
    const json = await res.json();
    setResult(json.parsed ?? json);
    setLoading(false);
    setMode("result");
  };

  const onBack = () => {
    setResult(null);
    setAnswer("");
    setMode("challenge");
  };

  return (
    <div>
        {mode === "challenge" && (
        <ChallengeView
          challenges={challenges}
          situationId={situationId}
          answer={answer}
          loading={loading}
          onChangeAnswer={setAnswer}
          onSubmit={onGrade}  
        />
      )}
      {mode === "result" && result && (
        <ResultView result={result} challengeId={situationId} onBack={onBack} />
      )}
    </div>
  );
}
