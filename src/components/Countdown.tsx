import { useEffect, useState } from "react";

function diff(target: Date) {
  const now = Date.now();
  const t = target.getTime();
  const ahead = t > now;
  const ms = Math.abs(t - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { ahead, days, hours, minutes, seconds };
}

export function Countdown({ target, accent = "rose" }: { target: Date; accent?: "rose" | "violet" | "gold" }) {
  const [d, setD] = useState(() => diff(target));
  useEffect(() => {
    const i = setInterval(() => setD(diff(target)), 1000);
    return () => clearInterval(i);
  }, [target]);

  const color =
    accent === "violet" ? "text-cosmic-violet" : accent === "gold" ? "text-cosmic-gold" : "text-primary";

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-muted-foreground">
        {d.ahead ? "باقي على هذا اليوم" : "مرّ من هذا اليوم"}
      </p>
      <div className="flex gap-2 sm:gap-3">
        {[
          { label: "يوم", value: d.days },
          { label: "ساعة", value: d.hours },
          { label: "دقيقة", value: d.minutes },
          { label: "ثانية", value: d.seconds },
        ].map((u) => (
          <div key={u.label} className="glass flex min-w-[60px] flex-col items-center rounded-2xl px-3 py-2">
            <span className={`text-xl font-bold tabular-nums sm:text-2xl ${color}`}>
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted-foreground">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
