import { cn } from "@/lib/cn";
import { THEMES } from "@/lib/seo";

const EXTRA = [
  { id: "all", path: "/kits", label: "All kits" },
  { id: "custom", path: "/custom", label: "Custom art" },
] as const;

export function CategoryButtons({ current }: { current?: string }) {
  const items = [
    EXTRA[0],
    ...THEMES,
    EXTRA[1],
  ];

  return (
    <nav aria-label="Kit categories" className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => {
        const selected = current === item.id;
        return (
          <a
            key={item.id}
            href={item.path}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-[0.75rem] border px-4 text-sm font-medium",
              selected
                ? "border-primary bg-primary text-white"
                : "border-line text-fg hover:border-champagne",
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
