import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function StarField({ count = 80 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }));
    setStars(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: `0 0 ${s.size * 4}px var(--star)`,
          }}
        />
      ))}
      {/* shooting star */}
      <div
        className="absolute h-px w-32 bg-gradient-to-l from-transparent via-white to-transparent opacity-70"
        style={{
          top: "15%",
          left: "-10%",
          animation: "shooting 8s linear infinite",
        }}
      />
      <style>{`
        @keyframes shooting {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(40vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
