import { ArrowUpRight } from "lucide-react";
import { LIVE_SHOPS, SHOW_SISTER_SHOPS } from "@/lib/studio";
import { Button, CtaGroup } from "@/components/ui/button";

export function ShopLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "sm" | "xs";
}) {
  if (!SHOW_SISTER_SHOPS) return null;
  return (
    <CtaGroup className={className}>
      {LIVE_SHOPS.map((shop) => (
        <Button key={shop.href} asChild size={size} variant="ghost">
          <a href={shop.href} target="_blank" rel="noopener noreferrer">
            {shop.name}
            <ArrowUpRight
              className={size === "xs" ? "size-3" : "size-3.5"}
              aria-hidden
            />
          </a>
        </Button>
      ))}
    </CtaGroup>
  );
}
