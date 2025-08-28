import { PublicChallenge } from "@/app/situation1/types";

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
      <h1 className="text-2xl font-bold">お題で採点</h1>

      <div className="space-y-2">
        <label className="block font-medium">お題を選択</label>
        <select
         className="border rounded px-3 py-2" 
         value={selected} 
         onChange={(e) => onSelect(e.target.value)}>
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
          <div  className="font-semibold mb-2">お題</div>
          <p>{current.prompt_user}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          className="w-full border rounded p-3 min-h-[160px]"
          placeholder="ここに回答を入力"
          value={answer}
          onChange={(e) => onChangeAnswer(e.target.value)}
        />
        <button 
          type="submit" 
          disabled={!selected || !answer || loading} 
          className="border rounded px-4 py-2"
          >
            {loading ? "お待ちください…" : "採点する"}
        </button>
      </form>
    </div>
  );
}
