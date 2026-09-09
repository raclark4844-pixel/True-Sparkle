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
  STUDIO_ADDRESS_LINES,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_TIKTOK,
  organizationJsonLd,
} from "@/lib/seo";

export {
  STUDIO_CONTACT,
  STUDIO_EMAIL,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  STUDIO_LOCATION,
  STUDIO_ADDRESS,
  STUDIO_ADDRESS_LINES,
  STUDIO_EST,
  SOCIAL_INSTAGRAM,
  SOCIAL_FACEBOOK,
  SOCIAL_TIKTOK,
  PARENT_URL,
  KAYZ_URL,
  NAP_LINE,
  SISTER_SENTENCE,
};

export const studioJsonLd = organizationJsonLd;

/** Sister-shop header/footer buttons. Set false to hide. */
export const SHOW_SISTER_SHOPS = true;

export const LIVE_SHOPS = [
  { name: "KayzCharmzz", href: KAYZ_URL },
  { name: "IK's Charms", href: PARENT_URL },
] as const;
