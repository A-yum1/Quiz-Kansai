"use client";
import React from "react";

interface DialogueBoxProps {
  children: React.ReactNode;
}

export default function DialogueBox({ children }: DialogueBoxProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-black text-white border-4 border-white rounded-lg p-4 font-mono text-lg leading-relaxed shadow-lg">
      {children}
    </div>
  );
}}