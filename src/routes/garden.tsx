import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/garden")({
  head: () => ({
    meta: [
      { title: "حديقة الذكريات - نبض قلبي" },
      { name: "description", content: "كل وردة فيها ذكرى من ذكرياتنا" },
    ],
  }),
  component: GardenPage,
});

const roses = [
  { id: 1, memory: "أول صورة بعتيهالي.. لسه محفوظة في موبايلي لحد دلوقتي 📸", color: "from-rose-500 to-pink-400" },
  { id: 2, memory: "أول مرة ضحكتي ضحكتك دي اللي بتكسر قلبي.. عرفت إن دي ضحكتي المفضلة 😊", color: "from-pink-500 to-rose-300" },
  { id: 3, memory: "ليلة قعدنا نتكلم لحد الفجر.. مكناش حاسين بالوقت خالص ⭐", color: "from-violet-500 to-pink-400" },
  { id: 4, memory: "أول هدية بعتهالك.. كنت متخوف توصل ولا لأ، وفرحتك كانت أحلى رد 🎁", color: "from-amber-400 to-rose-400" },
  { id: 5, memory: "أول مرة قلتيلي 'بحبك'.. الكلمة دي غيرت كل حاجة جوايا ❤️", color: "from-red-500 to-pink-500" },
  { id: 6, memory: "الخروجة اللي مشينا فيها على البحر.. الموج كان بيغني لينا 🌊", color: "from-cyan-400 to-rose-400" },
  { id: 7, memory: "يوم اتخانقنا وصلحنا.. عرفت إن حبنا أقوى من أي حاجة 💪", color: "from-orange-400 to-rose-400" },
  { id: 8, memory: "الرسالة الصوتية اللي بعتيهالي وأنا تعبان.. كانت أحسن دوا 🎵", color: "from-fuchsia-500 to-pink-400" },
  { id: 9, memory: "كل صبح بتقوليلي 'صباح الخير' بأسلوبك الحلو ☀️", color: "from-amber-300 to-pink-400" },
  { id: 10, memory: "أول مرة لمست إيدك.. حسيت إن العالم كله وقف ✋", color: "from-rose-400 to-amber-300" },
  { id: 11, memory: "كل مرة بتقوليلي 'وحشتني' بحس إني أهم واحد في الدنيا 💝", color: "from-pink-400 to-violet-500" },
  { id: 12, memory: "حلمنا اللي قلناه سوا.. اللي هنحققه يوم ورا التاني 💫", color: "from-violet-400 to-fuchsia-500" },
];

function GardenPage() {
  const [active, setActive] = useState<(typeof roses)[number] | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold shimmer-text sm:text-5xl">حديقة الذكريات</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          كل وردة فيها ذكرى.. اضغطي على أي وردة وشوفي اللي جواها 🌹
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 py-8 sm:grid-cols-4 lg:grid-cols-6">
        {roses.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setActive(r)}
            className="group relative flex flex-col items-center transition-all hover:scale-125"
            style={{ animation: `fade-up 0.5s ease-out ${i * 0.06}s both` }}
          >
            {/* Stem */}
            <div className="absolute bottom-0 h-16 w-1 rounded bg-gradient-to-b from-emerald-500 to-emerald-700" />
            {/* Leaf */}
            <div className="absolute bottom-4 right-1/2 h-3 w-5 translate-x-3 rotate-45 rounded-full bg-emerald-500" />
            {/* Bloom */}
            <div
              className={`relative z-10 mb-16 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${r.color} shadow-glow animate-float`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <span className="text-2xl drop-shadow">🌹</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="glass-strong relative max-w-md rounded-3xl p-8 text-center animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute left-3 top-3 rounded-full p-2 text-muted-foreground hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
            <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${active.color} shadow-glow`}>
              <span className="text-4xl">🌹</span>
            </div>
            <p className="text-base leading-relaxed text-foreground/95">{active.memory}</p>
          </div>
        </div>
      )}
    </div>
  );
}
