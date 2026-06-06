import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "رحلة الكواكب - نبض قلبي" },
      { name: "description", content: "كل كوكب مرحلة من رحلة حبنا" },
    ],
  }),
  component: JourneyPage,
});

const planets = [
  {
    id: "earth",
    name: "كوكب البداية",
    period: "أغسطس 2025",
    color: "from-blue-400 to-emerald-500",
    glow: "oklch(0.65 0.18 220)",
    size: 90,
    story: "كانت أجمل بداية في حياتي، متخيلتش إن الرسالة هتبقى سبب فرحتي للدرجة دي. وجودك جنبي منور عيني، وبحبك يا روحي. 💗",
    emoji: "🌍",
  },
  {
    id: "venus",
    name: "كوكب الكلام الحلو",
    period: "الأشهر الأولى",
    color: "from-amber-300 to-orange-400",
    glow: "oklch(0.75 0.18 70)",
    size: 70,
    story: "فاكر كل كلمة حلوة قولتيهالي، فعلًا إنتِ أجمل حاجة حصلتلي. رجعتيلي الثقة من تاني، وأول مرة أشوف حب بجد. بعشقك يا منور عيني. 💗",
    emoji: "🪐",
  },
  {
    id: "moon",
    name: "كوكب الارتباط",
    period: "1 فبراير 2026",
    color: "from-rose-400 to-pink-300",
    glow: "oklch(0.78 0.2 5)",
    size: 80,
    story: "اليوم اللي كان الأجمل حرفيًا. كل الأيام حلوة معاكي، بس اليوم ده مستحيل يتنسي. يا رب يكملنا على خير يا منور عيني، يا بنتي يا صغيرة. 🥰💗",
    emoji: "🌙",
  },
  {
    id: "mars",
    name: "كوكب اللقاء",
    period: "23 أبريل 2026 - 2:08 ص",
    color: "from-red-400 to-rose-500",
    glow: "oklch(0.65 0.22 25)",
    size: 100,
    story: "لحظة قلبي كان بيدق فيها بسرعة، وفي نفس الوقت كان فرحان علشان شاف حبيبه اللي بقاله مدة مشافهوش. كانت لحظة نفسي متخلصش أبدًا. بحبك يا مراتي. 🥰💗",
    emoji: "❤️",
  },
  {
    id: "saturn",
    name: "كوكب الذكريات",
    period: "كل يوم معاكي",
    color: "from-amber-500 to-yellow-400",
    glow: "oklch(0.85 0.18 85)",
    size: 95,
    story: "كل ذكرى حلوة معاكي ليها مكان خاص في قلبي يا روحي. وحتى النكد والمشاكل بتاعتك زي العسل. بنتي الصغيرة تعمل اللي هي عايزاه. بحبك يا بنوتي. 🥰💗",
    emoji: "🪐",
  },
  {
    id: "future",
    name: "كوكب المستقبل",
    period: "بكرة وأبعد",
    color: "from-violet-500 to-fuchsia-400",
    glow: "oklch(0.6 0.25 290)",
    size: 110,
    story: "ده بقى الكوكب اللي لسه ما زرناهوش، لكنه أجمل كوكب مستنينا. فيه بيتنا وعيالنا وأحفادنا وكل حاجة حلوة بنحلم بيها. يا منور عيني، ده الكوكب اللي عمره ما هيخلص إن شاء الله. بحبك يا روحي. 💗",
    emoji: "💫",
  },
];

function JourneyPage() {
  const [active, setActive] = useState<(typeof planets)[number] | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold shimmer-text sm:text-5xl">رحلة الكواكب</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          كل كوكب يحكي مرحلة من حكايتنا.. اضغطي على أي كوكب وارجعي معايا للذكرى
        </p>
      </div>

      <div className="relative grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {planets.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className="group relative flex flex-col items-center transition-all hover:scale-110"
            style={{ animation: `fade-up 0.6s ease-out ${i * 0.12}s both` }}
          >
            {/* Orbit ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              style={{ width: p.size + 60, height: p.size + 60 }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              style={{ width: p.size + 100, height: p.size + 100 }} />

            <div
              className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${p.color} shadow-2xl animate-float`}
              style={{
                width: p.size,
                height: p.size,
                animationDelay: `${i * 0.5}s`,
                boxShadow: `0 0 60px -5px ${p.glow}, inset -10px -10px 20px rgba(0,0,0,0.3)`,
              }}
            >
              <span className="text-4xl drop-shadow-lg">{p.emoji}</span>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-base font-bold">{p.name}</h3>
              <p className="text-xs text-muted-foreground">{p.period}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="glass-strong relative max-w-lg rounded-3xl p-8 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute left-3 top-3 rounded-full p-2 text-muted-foreground hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex justify-center">
              <div
                className={`flex items-center justify-center rounded-full bg-gradient-to-br ${active.color} h-32 w-32 shadow-2xl animate-float`}
                style={{ boxShadow: `0 0 80px -5px ${active.glow}` }}
              >
                <span className="text-6xl">{active.emoji}</span>
              </div>
            </div>

            <h2 className="mb-1 text-center text-2xl font-bold text-gradient-rose">{active.name}</h2>
            <p className="mb-6 text-center text-xs text-cosmic-gold">{active.period}</p>
            <p className="text-center text-base leading-relaxed text-foreground/90">{active.story}</p>
          </div>
        </div>
      )}
    </div>
  );
}
