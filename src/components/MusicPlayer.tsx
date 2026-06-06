import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music2 } from "lucide-react";
import song from "@/assets/hob-kol-hayaty.mp3.asset.json";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={song.url}
        loop
        preload="metadata"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      <div className="fixed bottom-3 left-1/2 z-50 w-[min(420px,calc(100vw-1.5rem))] -translate-x-1/2">
        <div className="glass-strong flex items-center gap-3 rounded-full border border-white/10 px-3 py-2 shadow-glow">
          <button
            onClick={toggle}
            aria-label={playing ? "إيقاف" : "تشغيل"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground glow-rose transition-transform hover:scale-105"
          >
            {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-1.5 truncate text-xs">
              <Music2 className="h-3 w-3 shrink-0 text-cosmic-gold" />
              <span className="truncate font-bold">حب كل حياتي</span>
              <span className="truncate text-muted-foreground">— إليسا</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tabular-nums text-muted-foreground">{fmt(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (audioRef.current) audioRef.current.currentTime = v;
                  setProgress(v);
                }}
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-[hsl(var(--primary))]"
              />
              <span className="text-[10px] tabular-nums text-muted-foreground">{fmt(duration)}</span>
            </div>
          </div>

          <button
            onClick={() => setMuted((m) => !m)}
            aria-label="كتم"
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground sm:flex"
            onClickCapture={() => {
              if (audioRef.current) audioRef.current.muted = !muted;
            }}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </>
  );
}
