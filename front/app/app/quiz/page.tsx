"use client";
import { useEffect, useState } from "react";
import ChallengeView from "@/app/components/ChallengeView";
import ResultView from "@/app/components/ResultView";
import { PublicChallenge, GradingResult } from "@/app/types";

export default function Page() {
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [selected, setSelected] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<GradingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"challenge" | "result">("challenge");

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
      body: JSON.stringify({ challengeId: selected, answer }),
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
    <main>
      {mode === "challenge" && (
        <ChallengeView
          challenges={challenges}
          selected={selected}
          answer={answer}
          loading={loading}
          onSelect={setSelected}
          onChangeAnswer={setAnswer}
          onSubmit={onGrade}
        />
      )}
      {mode === "result" && result && (
        <ResultView result={result} onBack={onBack} />
      )}
    </main>
  );
}
