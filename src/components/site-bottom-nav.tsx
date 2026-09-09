import { useRouterState } from "@tanstack/react-router";
import { BookOpen, Gem, House, Landmark, Mail, Sparkles, Store } from "lucide-react";
import { cn } from "@/lib/cn";
import { KAYZ_URL, PARENT_URL, SHOW_SISTER_SHOPS } from "@/lib/studio";

const tabs = [
  { id: "home", href: "/", label: "Home", icon: House },
  { id: "shop", href: "/kits", label: "Kits", icon: Store },
  { id: "custom", href: "/custom", label: "Custom", icon: Gem },
  { id: "about", href: "/about", label: "About", icon: BookOpen },
  { id: "contact", href: "/contact", label: "Contact", icon: Mail },
  {
    id: "kayz",
    href: KAYZ_URL,
    label: "Kayz",
    icon: Sparkles,
    external: true,
    ariaLabel: "KayzCharmzz handmade gifts",
  },
  {
    id: "parent",
    href: PARENT_URL,
    label: "Parent",
    icon: Landmark,
    external: true,
    ariaLabel: "IK’s Charms & True Sparkle",
  },
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
  const items = SHOW_SISTER_SHOPS ? tabs : tabs.filter((tab) => !("external" in tab && tab.external));

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className={cn("mx-auto grid max-w-6xl", items.length === 7 ? "grid-cols-7" : "grid-cols-5")}>
        {items.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          const external = "external" in tab && tab.external;
          return (
            <li key={tab.id}>
              <a
                href={tab.href}
                rel={external ? "noopener" : undefined}
                aria-label={"ariaLabel" in tab ? tab.ariaLabel : undefined}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[0.6rem] tracking-wide transition-colors",
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
