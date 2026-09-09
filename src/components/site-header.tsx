import { Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { ShopLinks } from "@/components/shop-links";
import { adminLogout } from "@/lib/catalog-fns";
import { KAYZ_URL, PARENT_URL } from "@/lib/seo";

export function SiteHeader({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter();
  const logout = useServerFn(adminLogout);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/gem.jpg"
            alt=""
            className="size-9 shrink-0 rounded-full object-cover ring-1 ring-primary/50"
          />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:inline">
            True Sparkle
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          <Link to="/kits" className="text-xs uppercase tracking-[0.16em] text-cream/80 hover:text-fg">
            Kits
          </Link>
          <Link to="/custom" className="text-xs uppercase tracking-[0.16em] text-cream/80 hover:text-fg">
            Custom
          </Link>
          <Link
            to="/how-it-works"
            className="text-xs uppercase tracking-[0.16em] text-cream/80 hover:text-fg"
          >
            How it works
          </Link>
          <a href={KAYZ_URL} className="text-xs uppercase tracking-[0.16em] text-cream/80 hover:text-fg">
            KayzCharmzz
          </a>
        </nav>
        <div className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
          <ShopLinks size="xs" className="sm:hidden" />
          <ShopLinks size="sm" className="hidden sm:flex" />
          {isAdmin ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={async () => {
                await logout();
                await router.invalidate({ sync: true });
              }}
            >
              Sign out
            </Button>
          ) : null}
          <a
            href={PARENT_URL}
            className="hidden text-[0.65rem] uppercase tracking-[0.14em] text-champagne sm:inline"
          >
            Parent studio
          </a>
        </div>
      </div>
    </header>
  );
}
