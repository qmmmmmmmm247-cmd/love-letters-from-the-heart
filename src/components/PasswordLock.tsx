import { useEffect, useState, type ReactNode } from "react";
import { Heart, Lock, Sparkles } from "lucide-react";
import { StarField } from "./StarField";

const PASSWORD = "662007";
const STORAGE_KEY = "nabd_unlocked_v1";

export function PasswordLock({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  if (!hydrated) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <StarField count={120} />
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-cosmic-violet/30 blur-3xl animate-pulse-glow" />
      </div>
      <form
        onSubmit={submit}
        className={`glass-strong relative z-10 w-full max-w-md rounded-[2rem] p-8 text-center ${
          shake ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        style={{ animationName: shake ? "shake" : undefined }}
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent glow-rose">
          <Lock className="h-9 w-9 text-primary-foreground" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gradient-rose">صفحة العمر me</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          المكان ده ليكي إنتي بس يا روحي.. ادخلي كلمة السر علشان تفتحي قلبي 💗
        </p>

        <div className="relative mb-3">
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="••••••"
            className="w-full rounded-2xl border-2 border-border bg-input/40 px-5 py-4 text-center text-2xl font-bold tracking-[0.6em] outline-none transition-all focus:border-primary focus:bg-input/60 focus:glow-rose"
          />
        </div>

        {error && (
          <p className="mb-3 text-xs font-bold text-rose-400">
            مش هي.. فكري تاني يا ست الكل 💕
          </p>
        )}

        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-accent to-cosmic-pink px-6 py-3.5 text-base font-bold text-primary-foreground glow-rose transition-transform hover:scale-[1.02]"
        >
          <Heart className="h-5 w-5 animate-heartbeat fill-current" />
          افتحي القلب
          <Sparkles className="h-4 w-4" />
        </button>

        <p className="mt-6 text-[11px] text-muted-foreground">
          تلميح: أحلى يوم جابك للدنيا 🎂
        </p>
      </form>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
