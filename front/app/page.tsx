"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1.5rem",
      }}
    >
    <h1 style={{ margin: 0, padding: 0 }}>クイズアプリへようこそ！</h1>
      <button
        onClick={() => router.push("/about")}
        style={{
      padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          borderRadius: "6px",
          cursor: "pointer",
          background: "#ffffff",
          color: "var(--foreground)",
          border: "1px solid rgba(0,0,0,0.12)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      minWidth: "160px",
          whiteSpace: "nowrap",
          lineHeight: "1",
          zIndex: 1,
        }}
        aria-label="このアプリについてへ移動"
      >
        このアプリについて
      </button>
    </main>
  );
}