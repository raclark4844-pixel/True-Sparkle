import { Link, useRouter } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { STORE_URL } from "@/lib/products";
import { ShopLinks } from "@/components/shop-links";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/lib/catalog-fns";

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
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Current cart"
            className="inline-flex size-11 items-center justify-center text-fg transition-colors hover:text-primary"
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}
