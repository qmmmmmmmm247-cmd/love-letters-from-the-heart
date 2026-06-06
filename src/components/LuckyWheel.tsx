import { useState } from "react";
import { Sparkles } from "lucide-react";

const surprises = [
  { emoji: "💌", text: "افتحي شات إنستجرام دلوقتي.. فيه رسالة منتظراك" },
  { emoji: "🌹", text: "أنتي أحلى وردة في حديقتي.. وأنتي عارفة كده" },
  { emoji: "💋", text: "لو كنت قدامي دلوقتي كنت بسلم عليكي بشكل مختلف ❤️" },
  { emoji: "🎁", text: "فكرة هدية صغيرة جايالك قريب.. مفاجأة" },
  { emoji: "📸", text: "ارجعي لأول صورة جمعتنا.. وتذكري اللحظة دي" },
  { emoji: "🎵", text: "اسمعي الأغنية اللي بتفكرنا ببعض.. وحسي إني معاكي" },
  { emoji: "💫", text: "خدي لحظة وقفي.. أنتي أهم حاجة في حياتي" },
  { emoji: "☕", text: "تستاهلي قهوة على حسابي.. اطلبيها وقوليلي" },
  { emoji: "🌙", text: "الليلة قبل ما تنامي.. ابعتيلي حلم جميل" },
  { emoji: "✨", text: "كل دقيقة معاكي = ألف ذكرى مش هتنسى" },
  { emoji: "🏆", text: "إنجاز جديد: 'فتحتي قلب حد بالكامل' - أنا!" },
  { emoji: "💍", text: "تذكير: إنتي اختياري كل يوم.. مش بس مرة واحدة" },
];

export function LuckyWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<(typeof surprises)[number] | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const segments = surprises.length;
    const segAngle = 360 / segments;
    const winIdx = Math.floor(Math.random() * segments);
    const target = 360 * 6 + (360 - winIdx * segAngle - segAngle / 2);
    setRotation((prev) => prev + target);
    setTimeout(() => {
      setResult(surprises[winIdx]);
      setSpinning(false);
    }, 4200);
  };

  return (
    <div className="glass-strong mx-auto max-w-md rounded-3xl p-6 text-center">
      <h2 className="mb-2 text-xl font-bold text-gradient-rose">عجلة المفاجآت</h2>
      <p className="mb-6 text-xs text-muted-foreground">دوريها وشوفي إيه مستخبي لكي 🎁</p>

      <div className="relative mx-auto mb-6 h-64 w-64">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1">
          <div className="h-0 w-0 border-x-8 border-t-[16px] border-x-transparent border-t-primary drop-shadow-lg" />
        </div>

        <div
          className="relative h-full w-full rounded-full transition-transform duration-[4000ms] ease-out shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${surprises
              .map((_, i) => {
                const hue = (i * 360) / surprises.length;
                const start = (i / surprises.length) * 360;
                const end = ((i + 1) / surprises.length) * 360;
                return `oklch(0.65 0.2 ${hue}) ${start}deg ${end}deg`;
              })
              .join(", ")})`,
            boxShadow: `0 0 60px -5px var(--cosmic-pink)`,
          }}
        >
          {surprises.map((s, i) => {
            const angle = (i / surprises.length) * 360 + 360 / surprises.length / 2;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  height: "50%",
                }}
              >
                <span className="text-xl">{s.emoji}</span>
              </div>
            );
          })}
        </div>

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-bold text-primary-foreground glow-rose disabled:opacity-50"
      >
        {spinning ? "..." : "دوّر العجلة"}
      </button>

      {result && (
        <div className="glass mt-6 rounded-2xl p-4 animate-fade-up">
          <div className="mb-2 text-4xl">{result.emoji}</div>
          <p className="text-sm leading-relaxed">{result.text}</p>
        </div>
      )}
    </div>
  );
}
