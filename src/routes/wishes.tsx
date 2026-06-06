import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/wishes")({
  head: () => ({
    meta: [
      { title: "جدار الأمنيات - نبض قلبي" },
      { name: "description", content: "اكتب أمنيتك للمستقبل وخليها تطير للنجوم" },
    ],
  }),
  component: WishesPage,
});

const colors = [
  { id: "rose", label: "وردي", gradient: "from-rose-500/40 to-pink-400/30" },
  { id: "violet", label: "بنفسجي", gradient: "from-violet-500/40 to-fuchsia-400/30" },
  { id: "gold", label: "ذهبي", gradient: "from-amber-400/40 to-yellow-400/30" },
  { id: "ocean", label: "أزرق", gradient: "from-cyan-500/40 to-blue-400/30" },
];

interface Wish {
  id: string;
  author: string;
  content: string;
  color: string;
  created_at: string;
}

function WishesPage() {
  const qc = useQueryClient();
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("rose");

  const { data: wishes, isLoading } = useQuery({
    queryKey: ["wishes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Wish[];
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("wishes").insert({
        content: content.trim(),
        author: author.trim() || "حبيبي",
        color,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("الأمنية طارت للنجوم ✨");
      setContent("");
      qc.invalidateQueries({ queryKey: ["wishes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold shimmer-text sm:text-5xl">جدار الأمنيات</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          اكتبي أمنية للمستقبل.. وخليها تنضم لباقي الأمنيات بين النجوم
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!content.trim()) return;
          add.mutate();
        }}
        className="glass-strong mx-auto max-w-2xl space-y-4 rounded-3xl p-6"
      >
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="اسمك (اختياري)"
          className="w-full rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="اكتبي أمنيتك هنا.. حلم، رجاء، أو حتى دعوة من القلب"
          rows={3}
          className="w-full resize-none rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setColor(c.id)}
                className={`h-8 w-8 rounded-full bg-gradient-to-br ${c.gradient} transition-all ${
                  color === c.id ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110" : ""
                }`}
                aria-label={c.label}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={add.isPending || !content.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-primary-foreground glow-rose disabled:opacity-50"
          >
            {add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            أرسل الأمنية
          </button>
        </div>
      </form>

      {/* Wall */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : !wishes?.length ? (
          <div className="glass mx-auto max-w-md rounded-2xl p-8 text-center">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-cosmic-gold" />
            <p className="text-sm text-muted-foreground">
              لسه مفيش أمنيات.. كوني أول واحدة تكتب
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {wishes.map((w, i) => {
              const c = colors.find((x) => x.id === w.color) ?? colors[0];
              return (
                <div
                  key={w.id}
                  className="glass-strong relative mb-4 break-inside-avoid overflow-hidden rounded-2xl p-5"
                  style={{ animation: `fade-up 0.5s ease-out ${Math.min(i, 10) * 0.05}s both` }}
                >
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${c.gradient}`} />
                  <Sparkles className="mb-2 h-4 w-4 text-cosmic-gold" />
                  <p className="mb-3 whitespace-pre-wrap text-sm leading-relaxed">{w.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-bold text-primary">— {w.author}</span>
                    <span>{new Date(w.created_at).toLocaleDateString("ar-EG")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
