import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Gem, House, Mail, Store } from "lucide-react";
import { cn } from "@/lib/cn";
import { LIVE_SHOPS, SHOW_SISTER_SHOPS } from "@/lib/studio";

const tabs = [
  { id: "home", href: "/", label: "Home", icon: House },
  { id: "shop", href: "/kits", label: "Kits", icon: Store },
  { id: "custom", href: "/custom", label: "Custom", icon: Gem },
  { id: "about", href: "/about", label: "About", icon: BookOpen },
  { id: "contact", href: "/contact", label: "Contact", icon: Mail },
] as const;

function useActiveTab() {
  const location = useRouterState({ select: (s) => s.location });
  const path = location.pathname;

  if (path.startsWith("/about") || path.startsWith("/how-it-works")) return "about";
  if (path.startsWith("/contact") || path.startsWith("/shipping")) return "contact";
  if (path.startsWith("/custom")) return "custom";
  if (path.startsWith("/kits") || path.startsWith("/kit")) return "shop";
  if (path === "/") return "home";
  return "";
}

export function SiteBottomNav() {
  const active = useActiveTab();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      {SHOW_SISTER_SHOPS ? (
        <div className="grid grid-cols-2 gap-2 border-b border-line px-3 py-2">
          {LIVE_SHOPS.map((shop) => (
            <a
              key={shop.href}
              href={shop.href}
              rel="noopener"
              className="inline-flex h-9 items-center justify-center gap-1 rounded-full border border-champagne/45 px-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-champagne hover:border-champagne hover:text-cream"
            >
              <span className="truncate">{shop.name}</span>
              <ArrowUpRight className="size-3 shrink-0" aria-hidden />
            </a>
          ))}
        </div>
      ) : null}
      <ul className="mx-auto grid max-w-6xl grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <li key={tab.id}>
              <a
                href={tab.href}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 text-[0.65rem] tracking-wide transition-colors",
                  isActive ? "text-primary" : "text-muted hover:text-fg",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
