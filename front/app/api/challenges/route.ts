// app/api/challenges/route.ts
import { NextRequest } from "next/server";
import { CHALLENGES } from "@/app/server/data/challenges";

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  const items = id ? CHALLENGES.filter(c => c.id === id) : CHALLENGES;
  // 公開フィールドのみ返す
  const publicItems = items.map(({ id, title, prompt_user, version }) => ({
    id, title, prompt_user, version,
  }));
  return Response.json(publicItems);
}
