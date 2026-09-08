import { useRouterState } from "@tanstack/react-router";
import { BookOpen, Gem, House, Mail, Store } from "lucide-react";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "home", href: "/", label: "Home", icon: House },
  { id: "shop", href: "/#shop", label: "Shop", icon: Store },
  { id: "why", href: "/#why", label: "Why", icon: Gem },
  { id: "about", href: "/about", label: "About", icon: BookOpen },
  { id: "contact", href: "/contact", label: "Contact", icon: Mail },
] as const;

function useActiveTab() {
  const location = useRouterState({ select: (s) => s.location });
  const path = location.pathname;
  const hash = (location.hash || "").replace("#", "");
  const search = location.search as { kit?: string };

  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/contact")) return "contact";
  if (path === "/" && search?.kit) return "shop";
  if (hash === "shop" || hash === "how") return "shop";
  if (hash === "why") return "why";
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
