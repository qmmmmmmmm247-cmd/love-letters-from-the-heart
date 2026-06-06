import { Trophy, MessageCircle, Heart, Gift, MapPin, Crown, Star } from "lucide-react";

const achievements = [
  { icon: MessageCircle, title: "أول كلمة", desc: "6 أغسطس - بداية الحكاية", date: "2025-08-06", unlocked: true },
  { icon: Heart, title: "أول لقاء", desc: "23 أبريل - 2:08 ص", date: "2026-04-23", unlocked: true },
  { icon: Crown, title: "يوم الارتباط", desc: "1 فبراير - صرنا واحد", date: "2026-02-01", unlocked: true },
  { icon: Gift, title: "أول هدية", desc: "هدية من القلب", unlocked: true },
  { icon: MapPin, title: "أول خروجة", desc: "ذكرى مش هنّساها", unlocked: true },
  { icon: Star, title: "100 يوم سوا", desc: "وقفة على طريق طويل", unlocked: true },
];

export function Achievements() {
  return (
    <section>
      <div className="mb-6 text-center">
        <div className="mb-2 inline-flex items-center gap-2">
          <Trophy className="h-6 w-6 text-cosmic-gold" />
          <h2 className="text-2xl font-bold text-gradient-rose sm:text-3xl">إنجازات علاقتنا</h2>
        </div>
        <p className="text-sm text-muted-foreground">كل لحظة من حكايتنا.. شارة ذهبية في القلب</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={a.title}
              className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-white/5"
              style={{ animation: `fade-up 0.5s ease-out ${i * 0.08}s both` }}
            >
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/40 to-rose-400/30 blur-md" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold">{a.title}</h3>
                <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
              </div>
              <div className="text-lg">🏆</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
