import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "آلة الزمن - نبض قلبي" },
      { name: "description", content: "كل لحظة مهمة من حكايتنا على خط الزمن" },
    ],
  }),
  component: TimelinePage,
});

const events = [
  { date: "6 أغسطس 2025", emoji: "💬", title: "أول رسالة", desc: "بدايه كل حاجه حلوه في حياتي معاكي يبنوتي 💗😍" },
  { date: "أغسطس - سبتمبر 2025", emoji: "🌸", title: "نتعرف على بعض", desc: "كل يوم كان اجمل لحظه بتمر وانتي معايا ينور عيني 💗" },
  { date: "أكتوبر 2025", emoji: "✨", title: "أول هدية", desc: "نتي هديتي في الدنيا ينور عيني الدنيا ادتهالي 🥰😍💗" },
  { date: "نوفمبر 2025", emoji: "💝", title: "ابتدينا نحس", desc: "الكلام بقى أعمق، والإحساس بقى أوضح. مش صدفة كل ده" },
  { date: "1 فبراير 2025", emoji: "💍", title: "يوم الارتباط", desc: "ده اليوم الي بقيتي فيه ملكي خلاص يروحي 🥰💗" },
  { date: "مارس 2026", emoji: "📱", title: "مكالمات لا تنتهي", desc: "بنتكلم لحد الصبح.. كل ليلة وكأنها أول مرة" },
  { date: "23 أبريل 2026 - 2:08 ص", emoji: "💋", title: "أول لقاء", desc: "الحظه الي جت عيني في عينك لاول مره ينور عيني 😍😍💗" },
  { date: "بكرة", emoji: "💫", title: "كل اللي جاي", desc: "كل حاجه جايه حنعيشها مع بعض سوا 💗🥰✨" },
];

function TimelinePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold shimmer-text sm:text-5xl">آلة الزمن</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          ارجعي معايا.. لحظة لحظة، من البداية لحد دلوقتي
        </p>
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Center line */}
        <div className="absolute right-1/2 top-0 h-full w-px translate-x-1/2 bg-gradient-to-b from-transparent via-primary/60 to-transparent" />

        <div className="space-y-8">
          {events.map((e, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative flex items-center ${isRight ? "justify-end" : "justify-start"}`}
                style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}
              >
                {/* Dot */}
                <div className="absolute right-1/2 top-6 z-10 h-4 w-4 translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow ring-4 ring-background" />

                <div className={`glass-strong w-[calc(50%-1.5rem)] rounded-2xl p-5 ${isRight ? "ml-6" : "mr-6"}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">{e.emoji}</span>
                    <span className="text-xs font-bold text-cosmic-gold">{e.date}</span>
                  </div>
                  <h3 className="mb-1 text-base font-bold">{e.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
