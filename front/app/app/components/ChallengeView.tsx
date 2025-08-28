import { PublicChallenge } from "@/app/types";

type Props = {
  challenges: PublicChallenge[];
  selected: string;
  answer: string;
  loading: boolean;
  onSelect: (id: string) => void;
  onChangeAnswer: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ChallengeView({
  challenges,
  selected,
  answer,
  loading,
  onSelect,
  onChangeAnswer,
  onSubmit,
}: Props) {
  const current = challenges.find((c) => c.id === selected);

  return (
    <div>
      <h1>お題で採点</h1>

      <div>
        <label>お題を選択</label>
        <select value={selected} onChange={(e) => onSelect(e.target.value)}>
          <option value="">-- 選択してください --</option>
          {challenges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}（v{c.version}）
            </option>
          ))}
        </select>
      </div>

      {current && (
        <div>
          <div>お題</div>
          <p>{current.prompt_user}</p>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <textarea
          placeholder="ここに回答を入力"
          value={answer}
          onChange={(e) => onChangeAnswer(e.target.value)}
        />
        <button type="submit" disabled={!selected || !answer || loading}>
          {loading ? "お待ちください…" : "採点する"}
        </button>
      </form>
    </div>
  );
}
