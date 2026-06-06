import { useEffect, useState } from "react";
import { Cake, Heart, Infinity as InfinityIcon, Sparkles } from "lucide-react";

// التواريخ المهمة
// عيد ميلاد بنوتي: 6 / 6 / 2007
// عيد ميلادي: 23 / 1
// بداية رحلتنا: 23 / 1 / 2026
const HER_BIRTHDAY = { day: 6, month: 6, year: 2007 };
const HIS_BIRTHDAY = { day: 23, month: 1 };
const RELATIONSHIP_START = new Date(2026, 0, 23, 0, 0, 0);

function diff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const totalMs = to.getTime() - from.getTime();
  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000));
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  return { years, months, days, hours, minutes, seconds, totalDays, totalHours, totalMinutes, totalSeconds };
}

function nextBirthday(now: Date, month: number, day: number) {
  let year = now.getFullYear();
  let next = new Date(year, month - 1, day, 0, 0, 0);
  if (next.getTime() <= now.getTime() - 24 * 3600 * 1000) {
    next = new Date(year + 1, month - 1, day, 0, 0, 0);
  }
  return next;
}

function isBirthdayToday(now: Date, month: number, day: number) {
  return now.getMonth() === month - 1 && now.getDate() === day;
}

function pad(n: number) { return n.toString().padStart(2, "0"); }

function Stat({ value, label, accent }: { value: string | number; label: string; accent?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${
      accent ? "from-primary/20 via-accent/10 to-cosmic-violet/20" : "from-white/[0.04] to-white/[0.01]"
    } p-4 text-center backdrop-blur-md`}>
      <div className={`text-3xl font-extrabold tabular-nums sm:text-4xl ${accent ? "shimmer-text" : "text-foreground"}`}>
        {value}
      </div>
      <div className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">{label}</div>
    </div>
  );
}

export function OurTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 text-center text-muted-foreground">جاري حساب كل ثانية حلوة معاكي... 💗</div>;
  }

  const together = diff(RELATIONSHIP_START, now);

  const herNext = nextBirthday(now, HER_BIRTHDAY.month, HER_BIRTHDAY.day);
  const tilHer = diff(now, herNext);
  const herToday = isBirthdayToday(now, HER_BIRTHDAY.month, HER_BIRTHDAY.day);

  const hisNext = nextBirthday(now, HIS_BIRTHDAY.month, HIS_BIRTHDAY.day);
  const tilHis = diff(now, hisNext);
  const hisToday = isBirthdayToday(now, HIS_BIRTHDAY.month, HIS_BIRTHDAY.day);

  return (
    <section className="space-y-8">
      {/* عداد العمر معاكي */}
      <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-cosmic-gold">
            <InfinityIcon className="h-4 w-4" /> من 23 يناير 2026
          </div>
          <h2 className="text-center text-3xl font-bold text-gradient-rose sm:text-4xl">
            عُمرنا مع بعض
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            كل ثانية معاكي بتتحسب.. وكل واحدة منهم بتساوي الدنيا 💗
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            <Stat value={together.years} label="سنين" accent />
            <Stat value={together.months} label="شهور" accent />
            <Stat value={together.days} label="أيام" />
            <Stat value={pad(together.hours)} label="ساعات" />
            <Stat value={pad(together.minutes)} label="دقايق" />
            <Stat value={pad(together.seconds)} label="ثواني" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            <Stat value={together.totalDays.toLocaleString("ar-EG")} label="إجمالي الأيام" />
            <Stat value={together.totalHours.toLocaleString("ar-EG")} label="إجمالي الساعات" />
            <Stat value={together.totalMinutes.toLocaleString("ar-EG")} label="إجمالي الدقايق" />
            <Stat value={together.totalSeconds.toLocaleString("ar-EG")} label="إجمالي الثواني" />
          </div>
        </div>
      </div>

      {/* عيد ميلاد بنوتي */}
      <div className={`glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8 ${herToday ? "ring-2 ring-cosmic-gold glow-rose" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cosmic-gold/20 to-transparent" />
        <div className="relative">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Cake className="h-4 w-4" /> تاريخ ميلاد بنوتي
          </div>
          <div className="text-center text-sm font-bold text-cosmic-gold">6 / 6 / 2007</div>
          <h2 className="mt-3 text-center text-3xl font-bold shimmer-text sm:text-4xl">
            {herToday ? "🎂 عيد ميلادك النهارده 🎂" : "باقي على عيد ميلادك"}
          </h2>

          {herToday ? (
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-primary/20 via-cosmic-pink/20 to-accent/20 p-6 text-center">
              <Sparkles className="mx-auto mb-3 h-10 w-10 animate-float text-cosmic-gold" />
              <p className="text-lg font-bold leading-relaxed text-foreground sm:text-xl">
                كل سنة وانتي طيبة يا بنوتي يا صغيرة 💗
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
                كل عام مليون سنة وانتي جنبي ينور عيني، ومايحرمنيش منك أبدًا يا مراتي 🥰
              </p>
              <div className="mt-4 text-4xl">🎉🎂💖🎈✨</div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                باقي على أحلى يوم في السنة... اليوم اللي جابك للدنيا 🎂
              </p>
              <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
                <Stat value={tilHer.totalDays} label="يوم" accent />
                <Stat value={pad(tilHer.hours)} label="ساعة" />
                <Stat value={pad(tilHer.minutes)} label="دقيقة" />
                <Stat value={pad(tilHer.seconds)} label="ثانية" />
              </div>
              <p className="mt-6 text-center text-sm leading-relaxed text-foreground/90">
                <Heart className="ml-1 inline h-4 w-4 animate-heartbeat fill-primary text-primary" />
                كل سنة وانتي طيبة يا بنوتي يا صغيرة، كل عام مليون سنة وانتي جنبي،
                ومايحرمنيش منك أبدًا يا مراتي 💗
              </p>
            </>
          )}
        </div>
      </div>

      {/* عيد ميلادي */}
      <div className={`glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8 ${hisToday ? "ring-2 ring-cosmic-gold glow-rose" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/20 to-transparent" />
        <div className="relative">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
            <Cake className="h-4 w-4" /> تاريخ ميلادي
          </div>
          <div className="text-center text-sm font-bold text-cosmic-gold">23 / 1</div>
          <h2 className="mt-3 text-center text-3xl font-bold text-gradient-rose sm:text-4xl">
            {hisToday ? "🎂 عيد ميلادي النهارده 🎂" : "باقي على عيد ميلادي"}
          </h2>

          {hisToday ? (
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-accent/20 via-cosmic-violet/20 to-primary/20 p-6 text-center">
              <Sparkles className="mx-auto mb-3 h-10 w-10 animate-float text-cosmic-gold" />
              <p className="text-lg font-bold leading-relaxed text-foreground sm:text-xl">
                نفس يوم ارتباطنا 💗 أحلى هدية في حياتي إنك جنبي
              </p>
              <div className="mt-4 text-4xl">🎉🎂💖🎈✨</div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                فاضل قد إيه على عيد ميلادي... ونفس اليوم اللي ارتبطنا فيه 💗
              </p>
              <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
                <Stat value={tilHis.totalDays} label="يوم" accent />
                <Stat value={pad(tilHis.hours)} label="ساعة" />
                <Stat value={pad(tilHis.minutes)} label="دقيقة" />
                <Stat value={pad(tilHis.seconds)} label="ثانية" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
