import { useState } from "react";
import { Check, X, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

const questions = [
  {
    q: "إمتى كانت أول مرة اتقابلنا فيها؟",
    options: ["20 أبريل 2026", "23 أبريل 2026", "25 أبريل 2026", "1 مايو 2026"],
    correct: 1,
  },
  {
    q: "الساعة كام كانت أول لقاء؟",
    options: ["1:30 ص", "2:08 ص", "3:00 ص", "2:30 ص"],
    correct: 1,
  },
  {
    q: "إمتى أول رسالة بينّا؟",
    options: ["6 يوليو", "6 أغسطس", "1 أغسطس", "10 أغسطس"],
    correct: 1,
  },
  {
    q: "تاريخ ارتباطنا؟",
    options: ["1 يناير", "1 فبراير", "14 فبراير", "1 مارس"],
    correct: 1,
  },
  {
    q: "إيه أكتر حاجة بحبها فيكي؟",
    options: ["ضحكتك", "صوتك", "قلبك الطيب", "كله مع بعض"],
    correct: 3,
  },
  {
    q: "بتحبي مين أكتر؟ النوم ولا الأكل والمسلسلات ولا أنا؟",
    options: ["النوم", "الأكل والمسلسلات", "أنا", "كله بنفس القد"],
    correct: 2,
  },
  {
    q: "لو طلبت منك أمنية واحدة، هتقولي إيه؟",
    options: ["إنك دايماً معايا", "إن قلبك يفضل ليّا", "إننا نعيش العمر سوا", "كل اللي فوق"],
    correct: 3,
  },
];

export function QuizGame() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const current = questions[idx];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correct) {
      setScore((s) => s + 1);
      toast.success("صح يا روحي 💗", {
        description: "إنتي فعلاً بتعرفيني 🥰",
      });
      setTimeout(() => {
        if (idx + 1 >= questions.length) setDone(true);
        else {
          setIdx(idx + 1);
          setSelected(null);
        }
      }, 1400);
    } else {
      toast.error("لا يا يم دماغ 😒💗", {
        description: "جربي تاني واختاري الصح 😂💗",
      });
      // wrong answer: reset selection so she can try again, do NOT advance
      setTimeout(() => {
        setSelected(null);
      }, 1400);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setSelected(null);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const msg =
      pct >= 80 ? "بطلة! بتعرفيني أكتر من نفسي ❤️"
      : pct >= 50 ? "كويس بس فيه حاجات تانية لازم تعرفيها 😊"
      : "محتاجين نتعرف أكتر يا قلبي 💕";

    return (
      <div className="glass-strong mx-auto max-w-md rounded-3xl p-8 text-center">
        <Trophy className="mx-auto mb-4 h-16 w-16 text-cosmic-gold animate-float" />
        <h2 className="mb-2 text-2xl font-bold text-gradient-rose">انتهت اللعبة!</h2>
        <p className="mb-4 text-4xl font-bold shimmer-text">
          {score} / {questions.length}
        </p>
        <p className="mb-6 text-sm text-muted-foreground">{msg}</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-primary-foreground glow-rose"
        >
          <RotateCcw className="h-4 w-4" /> العبي تاني
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">سؤال {idx + 1} من {questions.length}</span>
        <span className="font-bold text-cosmic-gold">النقاط: {score}</span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${((idx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="mb-6 mt-6 text-xl font-bold sm:text-2xl">{current.q}</h3>

      <div className="space-y-3">
        {current.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === current.correct;
          const show = selected !== null;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={`group flex w-full items-center justify-between rounded-2xl border-2 p-4 text-right text-sm font-medium transition-all ${
                show && isCorrect
                  ? "border-emerald-500 bg-emerald-500/20"
                  : show && isSelected && !isCorrect
                  ? "border-rose-500 bg-rose-500/20"
                  : "border-border bg-input/30 hover:border-primary hover:bg-primary/10"
              }`}
            >
              <span>{opt}</span>
              {show && isCorrect && <Check className="h-5 w-5 text-emerald-400" />}
              {show && isSelected && !isCorrect && <X className="h-5 w-5 text-rose-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
