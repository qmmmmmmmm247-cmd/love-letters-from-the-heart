import { useEffect, useState } from "react";
import { Heart, Trophy } from "lucide-react";

const STORAGE_KEY = "heart_hunt_v1";
const TOTAL_HEARTS = 7;

// Pseudo-random positions on the page (will be sprinkled across routes)
const HEART_SPOTS = [
  { id: "h1", top: "12%", left: "4%" },
  { id: "h2", top: "45%", right: "3%" },
  { id: "h3", top: "75%", left: "8%" },
  { id: "h4", top: "25%", right: "6%" },
  { id: "h5", top: "60%", left: "20%" },
  { id: "h6", top: "88%", right: "15%" },
  { id: "h7", top: "8%", left: "50%" },
];

export function HiddenHearts() {
  const [found, setFound] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(stored)) setFound(stored);
    } catch {}
  }, []);

  const onFind = (id: string) => {
    if (found.includes(id)) return;
    const next = [...found, id];
    setFound(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (next.length === TOTAL_HEARTS) setShowCelebration(true);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30">
        {HEART_SPOTS.map((spot) => {
          const isFound = found.includes(spot.id);
          if (isFound) return null;
          return (
            <button
              key={spot.id}
              onClick={() => onFind(spot.id)}
              className="pointer-events-auto absolute h-6 w-6 cursor-pointer opacity-30 transition-all hover:scale-150 hover:opacity-100"
              style={spot}
              aria-label="قلب مخفي"
            >
              <Heart className="h-full w-full fill-primary text-primary drop-shadow-[0_0_8px_var(--cosmic-pink)]" />
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div className="glass fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
        <Trophy className="h-3.5 w-3.5 text-cosmic-gold" />
        <span className="text-muted-foreground">قلوب مخفية:</span>
        <span className="font-bold text-primary">
          {found.length} / {TOTAL_HEARTS}
        </span>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setShowCelebration(false)}
        >
          <div className="glass-strong mx-4 max-w-md rounded-3xl p-8 text-center animate-fade-up">
            <div className="mb-4 text-6xl">🏆</div>
            <h2 className="mb-3 text-2xl font-bold shimmer-text">مبروك! لقيتي كل القلوب</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              زي ما لقيتي القلوب المخفية في الموقع، كذلك لقيت حبك جوايا كل ثانية وكل لحظة. أنتي
              الكنز اللي مفيش بحث بيوصل لقيمته الحقيقية ❤️✨
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="mt-6 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2 text-sm font-bold text-primary-foreground glow-rose"
            >
              شكراً يا حياتي
            </button>
          </div>
        </div>
      )}
    </>
  );
}
