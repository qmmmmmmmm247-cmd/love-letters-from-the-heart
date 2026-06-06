import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Unlock, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Capsule {
  id: string;
  title: string;
  message: string;
  unlock_at: string;
  author: string;
  created_at: string;
}

export function TimeCapsule() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [unlockAt, setUnlockAt] = useState("");

  const { data: capsules, isLoading } = useQuery({
    queryKey: ["capsules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_capsules")
        .select("*")
        .order("unlock_at", { ascending: true });
      if (error) throw error;
      return data as Capsule[];
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("time_capsules").insert({
        title: title.trim(),
        message: message.trim(),
        author: author.trim() || "حبيبي",
        unlock_at: new Date(unlockAt).toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("الكبسولة اتقفلت 🔒 - هتفتح في موعدها");
      setTitle("");
      setMessage("");
      setUnlockAt("");
      qc.invalidateQueries({ queryKey: ["capsules"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !message.trim() || !unlockAt) return;
          add.mutate();
        }}
        className="glass-strong space-y-3 rounded-3xl p-6"
      >
        <h2 className="mb-2 text-xl font-bold text-gradient-rose">اكتبي كبسولة زمنية</h2>
        <p className="text-xs text-muted-foreground">
          الكبسولة هتتقفل لحد التاريخ اللي تختاريه.. بعدها أي حد يقدر يفتحها
        </p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان الكبسولة (مثلاً: لما توصلي 25 سنة)"
          className="w-full rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="رسالتك المخفية..."
          rows={4}
          className="w-full resize-none rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="من؟ (اختياري)"
            className="rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            type="datetime-local"
            value={unlockAt}
            onChange={(e) => setUnlockAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={add.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-primary-foreground glow-rose disabled:opacity-50"
        >
          {add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          اقفل الكبسولة
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {capsules?.map((c) => {
            const unlockDate = new Date(c.unlock_at);
            const locked = unlockDate.getTime() > Date.now();
            return (
              <div key={c.id} className="glass-strong relative overflow-hidden rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  {locked ? (
                    <Lock className="h-5 w-5 text-cosmic-gold" />
                  ) : (
                    <Unlock className="h-5 w-5 text-emerald-400" />
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {unlockDate.toLocaleDateString("ar-EG")}
                  </span>
                </div>
                <h3 className="mb-2 font-bold">{c.title}</h3>
                {locked ? (
                  <div className="rounded-xl bg-black/30 p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      🔒 الرسالة مقفولة لحد {unlockDate.toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{c.message}</p>
                )}
                <p className="mt-3 text-xs text-primary">— {c.author}</p>
              </div>
            );
          })}
          {!capsules?.length && (
            <p className="col-span-full text-center text-sm text-muted-foreground">
              لسه مفيش كبسولات.. كوني الأولى
            </p>
          )}
        </div>
      )}
    </div>
  );
}
