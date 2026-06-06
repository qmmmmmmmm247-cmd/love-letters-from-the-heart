export const SPECIAL_DATES = [
  {
    id: "first-kiss",
    title: "أول مرة اتقابلنا فيها",
    subtitle: "اللحظة اللي اتغير فيها كل شيء",
    date: new Date("2026-04-23T02:08:00"),
    emoji: "💋",
    color: "from-rose-500/30 to-pink-500/20",
  },
  {
    id: "first-talk",
    title: "أول كلمة بينّا",
    subtitle: "بداية كل الحكاية",
    date: new Date("2025-08-06T00:00:00"),
    emoji: "💬",
    color: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    id: "engagement",
    title: "يوم ارتباطنا",
    subtitle: "اليوم اللي صرنا فيه واحد",
    date: new Date("2026-02-01T00:00:00"),
    emoji: "💍",
    color: "from-amber-500/30 to-rose-500/20",
  },
] as const;

export type SpecialDate = (typeof SPECIAL_DATES)[number];
