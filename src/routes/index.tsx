import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Map, Flower2, Gamepad2, Clock, ArrowLeft } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { EmotionalWeather } from "@/components/EmotionalWeather";
import { SPECIAL_DATES } from "@/lib/special-dates";
import { Achievements } from "@/components/Achievements";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نبض قلبي - عالمنا الخاص" },
      { name: "description", content: "كل لحظة، كل ذكرى، كل أمنية بينّا.. في عالم واحد ❤️" },
      { property: "og:title", content: "نبض قلبي - عالمنا الخاص" },
      { property: "og:description", content: "كل لحظة، كل ذكرى، كل أمنية بينّا" },
    ],
  }),
  component: HomePage,
});

const sections = [
  {
    to: "/journey" as const,
    icon: Map,
    title: "رحلة الكواكب",
    desc: "كل مرحلة من حكايتنا في كوكب مختلف",
    gradient: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    to: "/timeline" as const,
    icon: Clock,
    title: "آلة الزمن",
    desc: "كل لحظة مهمة على خط الزمن",
    gradient: "from-indigo-500/30 to-violet-500/20",
  },
  {
    to: "/wishes" as const,
    icon: Sparkles,
    title: "جدار الأمنيات",
    desc: "اكتب أمنية وخليها تطير للنجوم",
    gradient: "from-amber-500/30 to-rose-500/20",
  },
  {
    to: "/garden" as const,
    icon: Flower2,
    title: "حديقة الذكريات",
    desc: "كل وردة فيها ذكرى لنا",
    gradient: "from-pink-500/30 to-rose-500/20",
  },
  {
    to: "/games" as const,
    icon: Gamepad2,
    title: "ألعابنا الصغيرة",
    desc: "أسئلة، عجلة حظ، ومفاجآت",
    gradient: "from-emerald-500/30 to-cyan-500/20",
  },
];

function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-20">
      {/* HERO */}
      <section className="relative pt-8 text-center sm:pt-16">
        <div className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
        <div className="mb-4 flex justify-center">
          <EmotionalWeather />
        </div>
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-glow animate-float">
          <Heart className="h-10 w-10 animate-heartbeat fill-white text-white" />
        </div>
        <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-6xl">
          <span className="shimmer-text">نبض قلبي</span>
        </h1>
        <p className="mx-auto mb-2 max-w-md text-base text-foreground/80 sm:text-lg">
          عالمنا الخاص اللي مفيهوش غيرنا
        </p>
        <p className="mx-auto max-w-lg text-xs text-muted-foreground sm:text-sm">
          كل ذكرى، كل تاريخ، كل أمنية.. محفوظة هنا بين النجوم ✨
        </p>
      </section>

      {/* Special Dates Countdowns */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-gradient-rose sm:text-3xl">
          تواريخنا اللي مش هننساها
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {SPECIAL_DATES.map((d, i) => (
            <div
              key={d.id}
              className="glass-strong relative overflow-hidden rounded-3xl p-6 text-center transition-all hover:scale-[1.02]"
              style={{ animation: `fade-up 0.8s ease-out ${i * 0.15}s both` }}
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${d.color}`} />
              <div className="mb-2 text-4xl">{d.emoji}</div>
              <h3 className="mb-1 text-lg font-bold">{d.title}</h3>
              <p className="mb-4 text-xs text-muted-foreground">{d.subtitle}</p>
              <p className="mb-4 text-xs font-medium text-cosmic-gold">
                {d.date.toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {d.id === "first-kiss" && " - 2:08 ص"}
              </p>
              <Countdown target={d.date} accent={i === 0 ? "rose" : i === 1 ? "violet" : "gold"} />
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <Achievements />

      {/* Sections gallery */}
      <section>
        <h2 className="mb-2 text-center text-2xl font-bold text-gradient-rose sm:text-3xl">
          استكشفي عالمنا
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          كل قسم فيه مفاجأة.. اختاري وانطلقي
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="glass-strong group relative overflow-hidden rounded-3xl p-6 transition-all hover:scale-[1.03] hover:glow-rose"
                style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${s.gradient} opacity-60`} />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-6 w-6 text-cosmic-gold" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{s.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-primary transition-all group-hover:gap-3">
                  ادخل <ArrowLeft className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Love note footer */}
      <section className="text-center">
        <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-8">
          <div className="mb-3 text-3xl">💫</div>
          <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
            "في عالم مليان ناس، أنتي اللي قلبي اختاركي.. ومن يومها وأنا مش قادر أفكر في غيرك"
          </p>
          <p className="mt-4 text-xs text-muted-foreground">— بحبك ❤️</p>
        </div>
      </section>
    </div>
  );
}
