import { useMemo } from "react";

const moods = [
  { emoji: "😊", label: "سعيد", color: "from-amber-400 to-yellow-300" },
  { emoji: "❤️", label: "مشتاق", color: "from-rose-500 to-pink-400" },
  { emoji: "✨", label: "متحمس", color: "from-violet-500 to-fuchsia-400" },
  { emoji: "🌙", label: "هادي", color: "from-indigo-500 to-violet-400" },
  { emoji: "🌸", label: "رومانسي", color: "from-pink-500 to-rose-300" },
] as const;

export function EmotionalWeather() {
  const today = useMemo(() => {
    const d = new Date();
    const seed = d.getDate() + d.getMonth() * 31;
    return moods[seed % moods.length];
  }, []);

  return (
    <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
      <span className="text-base">{today.emoji}</span>
      <span className="text-muted-foreground">طقس اليوم العاطفي:</span>
      <span className={`bg-gradient-to-r ${today.color} bg-clip-text font-bold text-transparent`}>
        {today.label}
      </span>
    </div>
  );
}
