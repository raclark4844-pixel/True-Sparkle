import { STORE_URL } from "@/lib/products";
import {
  STUDIO_CONTACT,
  STUDIO_EMAIL,
  STUDIO_EST,
  STUDIO_LOCATION,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/studio";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-muted sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl text-fg">True Sparkle</p>
          <p className="mt-1 max-w-sm">
            Modern catalog from a Black-owned, woman-led family studio. Checkout
            still lives on the current store until the new shop is ready.
          </p>
          <p className="mt-2">
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
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="/#shop" className="hover:text-fg">
            Catalog
          </a>
          <a href="/custom" className="hover:text-fg">
            Turn your photo into a kit
          </a>
          <a href="/#why" className="hover:text-fg">
            Why we paint
          </a>
          <a href="/about" className="hover:text-fg">
            About
          </a>
          <a href="/contact" className="hover:text-fg">
            Contact
          </a>
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            Live cart
          </a>
        </div>
      </div>
    </footer>
  );
}
