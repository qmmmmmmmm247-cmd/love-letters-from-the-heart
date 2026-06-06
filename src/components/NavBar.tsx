import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, Map, Sparkles, Gamepad2, Flower2, Clock, Infinity as InfinityIcon } from "lucide-react";

const links = [
  { to: "/", label: "البداية", icon: Home },
  { to: "/our-time", label: "عُمرنا", icon: InfinityIcon },
  { to: "/journey", label: "الرحلة", icon: Map },
  { to: "/timeline", label: "آلة الزمن", icon: Clock },
  { to: "/wishes", label: "الأمنيات", icon: Sparkles },
  { to: "/garden", label: "الحديقة", icon: Flower2 },
  { to: "/games", label: "ألعاب", icon: Gamepad2 },
] as const;

export function NavBar() {
  const { location } = useRouterState();
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-strong mx-auto mt-3 flex max-w-5xl items-center justify-between gap-2 rounded-full px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold">
          <Heart className="h-5 w-5 animate-heartbeat fill-primary text-primary" />
          <span className="text-gradient-rose hidden sm:inline">نبض قلبي</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const Icon = l.icon;
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                  active
                    ? "bg-primary/20 text-primary glow-rose"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{l.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
