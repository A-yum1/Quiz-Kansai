"use client";
import DialogueBox from "@/app/components/dialoguebox";
import TextTyper from "@/app/components/TextTyper";

export default function TakoyakiPartyPage3() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/takoyaki-bg.jpg')" }}
    >
      <DialogueBox>
        <TextTyper text="みんなでたこ焼きパーティーを始めた！アツアツのたこ焼きが机いっぱいに並んでいる！" />
      </DialogueBox>
    </div>
  );
}
