import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[0.75rem] text-sm font-medium tracking-wide transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96] h-11 px-5",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-soft",
        ghost:
          "border border-line bg-transparent text-fg hover:border-champagne hover:text-cream",
        cream: "bg-cream text-ink hover:bg-champagne",
      },
      size: {
        md: "h-11 px-5",
        sm: "h-10 px-3",
        xs: "h-9 px-2.5 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

/** Compact luxury pairing: shrink-wrap, 8px gap, wrap only if they cannot sit in one row. */
export function CtaGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  );
}
