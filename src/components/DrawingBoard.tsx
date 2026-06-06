import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Send, Paintbrush } from "lucide-react";
import { toast } from "sonner";

interface Drawing {
  id: string;
  author: string;
  image_data: string;
  caption: string | null;
  created_at: string;
}

const palette = ["#ff4d8a", "#ffffff", "#ffd166", "#a78bfa", "#34d399", "#60a5fa"];

export function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(palette[0]);
  const [size, setSize] = useState(4);
  const [drawing, setDrawing] = useState(false);
  const [caption, setCaption] = useState("");
  const [author, setAuthor] = useState("");
  const qc = useQueryClient();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#1a0f2e";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * c.width;
    const y = ((e.clientY - rect.top) / rect.height) * c.height;
    return { x, y };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };
  const end = () => setDrawing(false);

  const clear = () => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#1a0f2e";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  const { data: drawings } = useQuery({
    queryKey: ["drawings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("drawings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data as Drawing[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      const c = canvasRef.current!;
      const dataUrl = c.toDataURL("image/png");
      const { error } = await supabase.from("drawings").insert({
        image_data: dataUrl,
        caption: caption.trim() || null,
        author: author.trim() || "حبيبي",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("الرسمة اتحفظت 🎨");
      setCaption("");
      clear();
      qc.invalidateQueries({ queryKey: ["drawings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="glass-strong rounded-3xl p-4 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <Paintbrush className="h-4 w-4 text-cosmic-gold" />
          <h2 className="text-lg font-bold text-gradient-rose">ارسمي حاجة من قلبك</h2>
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full touch-none cursor-crosshair rounded-2xl border border-border bg-[#1a0f2e]"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex gap-1.5">
            {palette.map((p) => (
              <button
                key={p}
                onClick={() => setColor(p)}
                className={`h-7 w-7 rounded-full transition-all ${color === p ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}`}
                style={{ background: p }}
              />
            ))}
          </div>
          <input
            type="range"
            min={1}
            max={16}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="flex-1 min-w-[100px] max-w-[160px]"
          />
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-white/5"
          >
            <Trash2 className="h-3 w-3" /> مسح
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="اسمك (اختياري)"
            className="rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="عنوان للرسمة (اختياري)"
            className="rounded-2xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-primary-foreground glow-rose disabled:opacity-50"
        >
          {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          احفظي الرسمة
        </button>
      </div>

      {!!drawings?.length && (
        <div>
          <h3 className="mb-3 text-sm font-bold text-muted-foreground">معرض الرسومات</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {drawings.map((d) => (
              <div key={d.id} className="glass overflow-hidden rounded-2xl">
                <img src={d.image_data} alt={d.caption || "رسمة"} className="aspect-[3/2] w-full object-cover" />
                <div className="p-2">
                  <p className="truncate text-xs">{d.caption || "بدون عنوان"}</p>
                  <p className="text-[10px] text-muted-foreground">— {d.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
