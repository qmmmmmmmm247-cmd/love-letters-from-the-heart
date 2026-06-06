import { useEffect, useState } from "react";
import { Moon, Sun, Sunrise, Sunset, X } from "lucide-react";

interface TimeMessage {
  icon: typeof Moon;
  title: string;
  message: string;
  color: string;
}

function getMessage(hour: number): TimeMessage {
  if (hour >= 0 && hour < 5) {
    return {
      icon: Moon,
      title: "رسالة منتصف الليل",
      message: "النجوم سهرانة معاك دلوقتي.. زيي بالظبط. مش قادر أنام وأنا فاكرك. تصبح على خير يا أحلى نبضة في قلبي 🌙💫",
      color: "from-indigo-500/40 to-violet-500/30",
    };
  }
  if (hour >= 5 && hour < 12) {
    return {
      icon: Sunrise,
      title: "صباح القلب",
      message: "صباحك ورد وفل وياسمين، وقلبي بيقولك صباح الخير. النهار بدون رسالة منك ناقص ☀️🌸",
      color: "from-amber-400/40 to-rose-400/30",
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      icon: Sun,
      title: "في عزّ النهار",
      message: "وسط زحمة اليوم بفكر فيكي.. أنتي السكينة وسط الضجيج. كل ثانية بتعدي وأنا مشتاقلك أكتر ❤️",
      color: "from-orange-400/40 to-pink-400/30",
    };
  }
  if (hour >= 17 && hour < 20) {
    return {
      icon: Sunset,
      title: "وقت الغروب",
      message: "الغروب أحلى لما أكون فاكرك. الشمس بتنام والقمر بيصحى.. وقلبي مش بينام أبداً وهو فاكرك 🌇",
      color: "from-rose-500/40 to-amber-500/30",
    };
  }
  return {
    icon: Moon,
    title: "مساء النور",
    message: "المسا اللي مش فيه صوتك مش مسا. تعالي نسهر مع بعض حتى لو من بعيد.. أنا هنا 🌙✨",
    color: "from-violet-500/40 to-pink-500/30",
  };
}

export function TimeMessage() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(() => getMessage(new Date().getHours()));

  useEffect(() => {
    setMsg(getMessage(new Date().getHours()));
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;
  const Icon = msg.icon;
  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-[340px] animate-fade-up">
      <div className={`glass-strong relative overflow-hidden rounded-2xl p-4 shadow-cosmic`}>
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${msg.color}`} />
        <button
          onClick={() => setOpen(false)}
          className="absolute left-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-white/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-white/10 p-2">
            <Icon className="h-5 w-5 text-cosmic-gold" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-bold text-gradient-rose">{msg.title}</h3>
            <p className="text-xs leading-relaxed text-foreground/90">{msg.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
