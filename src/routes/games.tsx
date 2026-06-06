import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizGame } from "@/components/QuizGame";
import { LuckyWheel } from "@/components/LuckyWheel";
import { TimeCapsule } from "@/components/TimeCapsule";
import { DrawingBoard } from "@/components/DrawingBoard";
import { HelpCircle, Disc3, Lock, Palette } from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "ألعابنا الصغيرة - نبض قلبي" },
      { name: "description", content: "ألعاب وأنشطة تفاعلية بينّا" },
    ],
  }),
  component: GamesPage,
});

const tabs = [
  { id: "quiz", label: "قد إيه تعرفني", icon: HelpCircle },
  { id: "wheel", label: "عجلة الحظ", icon: Disc3 },
  { id: "capsule", label: "كبسولة زمنية", icon: Lock },
  { id: "draw", label: "رسمة من القلب", icon: Palette },
] as const;

function GamesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("quiz");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold shimmer-text sm:text-5xl">ألعابنا الصغيرة</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          العب، اسأل، وشوفي اللي مستخبي لك 🎮
        </p>
      </div>

      {/* Tabs */}
      <div className="glass-strong mx-auto flex max-w-2xl flex-wrap justify-center gap-2 rounded-2xl p-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                active
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground glow-rose"
                  : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div key={tab} className="animate-fade-up">
        {tab === "quiz" && <QuizGame />}
        {tab === "wheel" && <LuckyWheel />}
        {tab === "capsule" && <TimeCapsule />}
        {tab === "draw" && <DrawingBoard />}
      </div>
    </div>
  );
}
