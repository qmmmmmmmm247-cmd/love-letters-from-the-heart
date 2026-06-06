import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StarField } from "../components/StarField";
import { NavBar } from "../components/NavBar";
import { TimeMessage } from "../components/TimeMessage";
import { HiddenHearts } from "../components/HiddenHearts";
import { PasswordLock } from "../components/PasswordLock";
import { Toaster } from "sonner";
import { MusicPlayer } from "../components/MusicPlayer";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <StarField count={60} />
      <div className="glass-strong relative z-10 max-w-md rounded-3xl p-8 text-center">
        <div className="mb-4 text-6xl">🌌</div>
        <h1 className="mb-2 text-3xl font-bold shimmer-text">ضعت في الكون</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          الصفحة دي مش موجودة.. بس قلبي موجود وهيرجعك للبداية
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-primary-foreground glow-rose"
        >
          ارجع للبداية
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-gradient-rose">حصل خطأ صغير</h1>
        <p className="mb-6 text-sm text-muted-foreground">جرب تاني وقلبي معاك</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-bold text-primary-foreground"
          >
            حاول مرة أخرى
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2 text-sm hover:bg-white/5">
            البداية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "نبض قلبي - عالمنا الخاص" },
      { name: "description", content: "موقع رومانسي يجمع كل الذكريات والأمنيات والتفاصيل الصغيرة بين قلبين" },
      { name: "theme-color", content: "#040714" },
      { name: "author", content: "نبض قلبي" },
      { property: "og:title", content: "نبض قلبي - عالمنا الخاص" },
      { property: "og:description", content: "كل لحظة، كل ذكرى، كل أمنية.. في مكان واحد" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❤️</text></svg>" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PasswordLock>
        <StarField count={100} />
        <div className="relative z-10 mx-auto max-w-7xl px-3 pb-20 sm:px-6">
          <NavBar />
          <main className="pt-6">
            <Outlet />
          </main>
        </div>
        <TimeMessage />
        <HiddenHearts />
        <MusicPlayer />
        <Toaster position="top-center" theme="dark" richColors />
      </PasswordLock>
    </QueryClientProvider>
  );
}
