/** Contact, photo uploads, and FormSubmit all use this inbox. */
export const STUDIO_EMAIL = "lana@ikscharmsandtwosparkles.com";
export const STUDIO_PHONE = "216-309-0331";
export const STUDIO_PHONE_TEL = "+12163090331";
export const STUDIO_LOCATION = "Cleveland, Ohio";
export const STUDIO_EST = "Est. 2021";
export const SOCIAL_INSTAGRAM = "https://www.instagram.com/kayzcharmzz";
export const SOCIAL_FACEBOOK = "https://www.facebook.com/kayzcharmzz";
export const SOCIAL_TIKTOK = "https://www.tiktok.com/@mamk40";

/** Sister-shop header/footer buttons are hidden. Set true and restore ShopLinks to unhide. */
export const SHOW_SISTER_SHOPS = false;

export const LIVE_SHOPS = [] as const;

export const studioJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "True Sparkle",
  description:
    "Original diamond painting kits from a Black-owned, woman-led family studio in Cleveland, Ohio. Turn your photos into a kit.",
  email: STUDIO_EMAIL,
  telephone: STUDIO_PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cleveland",
    addressRegion: "OH",
    addressCountry: "US",
  },
  sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_TIKTOK],
  parentOrganization: {
    "@type": "Organization",
    name: "IK’s Charms & True Sparkle",
  },
} as const;
