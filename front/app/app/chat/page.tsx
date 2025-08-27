"use client";

import { useState, useRef, useEffect } from "react";

type Role = "user" | "assistant" | "system";

type Message = {
  id: string;
  role: Role;
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send only role & content in the order shown in the chat
          messages: messages
            .concat(userMsg)
            .map(({ role, content }) => ({ role, content })),
          // You can swap models if your route supports it
          model: "gpt-4o-mini",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const replyContent: string =
        data?.choices?.[0]?.message?.content ?? "(no content)";

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: replyContent,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl flex-1 bg-white/70 dark:bg-zinc-900/60 backdrop-blur rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <header className="px-4 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">AI Chat</h1>
          <div className="text-xs text-zinc-500">/api/chat → OpenAI</div>
        </header>

        <main className="h-[60vh] sm:h-[65vh] overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-12">
              こんにちは！メッセージを入力してチャットを始めてください。
            </div>
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="inline-block h-2 w-2 rounded-full bg-zinc-400 animate-pulse" />
              モデルが考え中...
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        <footer className="px-4 sm:px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
          <form onSubmit={sendMessage} className="flex items-end gap-3">
            <textarea
              className="flex-1 resize-none rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
              rows={2}
              placeholder="メッセージを入力…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl px-4 py-2 bg-indigo-600 text-white font-medium shadow hover:bg-indigo-500 disabled:opacity-40"
            >
              送信
            </button>
          </form>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <p className="mt-2 text-[11px] text-zinc-500">
            注意: このサンプルは <code>chat/completions</code> のレスポンスをそのまま使用しています。
            ルート <code>app/api/chat/route.ts</code> が OpenAI のレスポンスを JSON で返す前提です。
          </p>
        </footer>
      </div>
    </div>
  );
}

function MessageBubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      aria-label={isUser ? "User message" : "Assistant message"}
    >
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 text-zinc-900 rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}