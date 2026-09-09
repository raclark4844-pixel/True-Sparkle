import {
  KAYZ_URL,
  NAP_LINE,
  PARENT_URL,
  SISTER_SENTENCE,
  STUDIO_CONTACT,
  STUDIO_EMAIL,
  STUDIO_EST,
  STUDIO_LOCATION,
  STUDIO_ADDRESS,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/seo";
import { SocialLinks } from "@/components/social-links";
import { ShopLinks } from "@/components/shop-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-muted sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl text-fg">True Sparkle</p>
          <p className="mt-1 max-w-sm">
            Original diamond painting kits and custom photo-to-kit from a Black-owned,
            woman-led family studio in Cleveland.
          </p>
          <p className="mt-3 max-w-sm text-fg">{SISTER_SENTENCE}</p>
          <p className="mt-2">
            {STUDIO_ADDRESS}
          </p>
          <p className="mt-1">
            {STUDIO_LOCATION} · {STUDIO_EST}
          </p>
          <p className="mt-2 text-fg">{STUDIO_CONTACT}</p>
          <a href={`mailto:${STUDIO_EMAIL}`} className="mt-1 block hover:text-fg">
            {STUDIO_EMAIL}
          </a>
          <a href={`tel:${STUDIO_PHONE_TEL}`} className="mt-1 block hover:text-fg">
            {STUDIO_PHONE}
          </a>
          <SocialLinks className="mt-3 -ml-1" />
        </div>
        <div className="flex flex-col gap-2">
          <a href="/kits" className="hover:text-fg">
            Original diamond painting kits
          </a>
          <a href="/kits/beginner" className="hover:text-fg">
            Beginner diamond painting kits
          </a>
          <a href="/custom" className="hover:text-fg">
            Custom photo diamond painting
          </a>
          <a href="/how-it-works" className="hover:text-fg">
            How to start diamond painting
          </a>
          <a href="/shipping-and-lead-time" className="hover:text-fg">
            Shipping and lead time
          </a>
          <a href="/about" className="hover:text-fg">
            About
          </a>
          <a href="/contact" className="hover:text-fg">
            Contact
          </a>
          <a href={PARENT_URL} className="hover:text-fg">
            Parent studio
          </a>
          <a href={KAYZ_URL} className="hover:text-fg">
            KayzCharmzz
          </a>
          <div className="pt-3">
            <p className="text-xs uppercase tracking-[0.16em] text-champagne">Sister shops</p>
            <ShopLinks className="mt-2" />
          </div>
        </div>
      </div>
      <p className="mt-8 border-t border-line px-4 py-5 text-center text-xs text-muted">
        {NAP_LINE}
      </p>
    </footer>
  );
}
