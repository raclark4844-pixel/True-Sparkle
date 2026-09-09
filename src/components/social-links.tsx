import { Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/cn";
import { SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, SOCIAL_TIKTOK } from "@/lib/studio";

export const SOCIALS = [
  {
    href: SOCIAL_INSTAGRAM,
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: SOCIAL_FACEBOOK,
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: SOCIAL_TIKTOK,
    label: "TikTok",
    icon: TikTokIcon,
  },
  {
    href: "https://www.youtube.com/@kaythecreator-zc7dl",
    label: "YouTube",
    icon: Youtube,
  },
] as const;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M14.5 3c.4 2.6 1.8 4.5 4.3 4.8v2.7c-1.5 0-2.9-.5-4.1-1.3v6.6c0 3.4-2.7 6.2-6.2 6.2S2.3 19.2 2.3 15.7 5 9.5 8.5 9.5c.4 0 .8 0 1.1.1v2.8c-.3-.1-.7-.2-1.1-.2-1.9 0-3.4 1.6-3.4 3.5s1.5 3.5 3.4 3.5 3.4-1.6 3.4-3.5V3h2.6Z" />
    </svg>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {SOCIALS.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:text-fg"
        >
          <s.icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
