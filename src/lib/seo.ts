export { gaId, trackEvent } from "@/lib/analytics";

export const SITE_NAME = "True Sparkle";
export const SITE_ORIGIN = "https://www.truesparkles.com";
export const PARENT_URL = "https://www.ikscharmsandtwosparkles.com";
export const KAYZ_URL = "https://www.kayzcharmzz.com";
export const SITE_TITLE = "Original Diamond Painting Kits | Custom Photo Kits | True Sparkle";
export const SITE_DESCRIPTION =
  "Original diamond painting kits from a Cleveland studio — glam, wildlife, heroes, holidays, and custom photo-to-kit. Choose round or square drills and start tonight.";

export const STUDIO_CONTACT = "Lana Moss";
export const STUDIO_EMAIL = "lana@ikscharmsandtwosparkles.com";
export const STUDIO_PHONE = "216-309-0331";
export const STUDIO_PHONE_TEL = "+12163090331";
export const STUDIO_STREET = "35966 Detroit Rd";
export const STUDIO_UNIT = "#1022";
export const STUDIO_CITY = "Avon";
export const STUDIO_STATE = "Ohio";
export const STUDIO_STATE_CODE = "OH";
export const STUDIO_ZIP = "44011";
export const STUDIO_LOCATION = "Avon, Ohio";
export const STUDIO_ADDRESS = "35966 Detroit Rd #1022, Avon, Ohio 44011";
export const STUDIO_ADDRESS_LINES = ["35966 Detroit Rd", "#1022", "Avon, Ohio 44011"] as const;
export const STUDIO_MAP_QUERY = "35966 Detroit Rd #1022, Avon, Ohio 44011";
export const STUDIO_EST = "Est. 2021";
export const NAP_LINE = `IK’s Charms & True Sparkle · ${STUDIO_ADDRESS} · ${STUDIO_EMAIL} · ${STUDIO_PHONE}`;
export const SISTER_SENTENCE =
  "KayzCharmzz and True Sparkle are sister brands under IK’s Charms & True Sparkle.";

export const SOCIAL_INSTAGRAM = "https://www.instagram.com/kayzcharmzz";
export const SOCIAL_FACEBOOK = "https://www.facebook.com/kayzcharmzz";
export const SOCIAL_TIKTOK = "https://www.tiktok.com/@mamk40";

export const LEGACY_HOSTS = [
  "aurora-brook-zest-cosmic.grok.me",
  "true-sparkle.vercel.app",
  "truesparkles.com",
] as const;

export const THEMES = [
  { id: "glam", mood: "glam", path: "/kits/glam", label: "Glam", title: "Glam Diamond Painting Kits" },
  { id: "wildlife", mood: "wildlife", path: "/kits/wildlife", label: "Wildlife", title: "Wildlife Diamond Painting Kits" },
  { id: "holiday", mood: "seasonal", path: "/kits/holiday", label: "Holiday", title: "Holiday Diamond Painting Kits" },
  { id: "heroes", mood: "heroes", path: "/kits/heroes", label: "Heroes", title: "Heroes & Game Day Diamond Painting Kits" },
  { id: "beginner", mood: "fun", path: "/kits/beginner", label: "Beginner", title: "Beginner Diamond Painting Kits" },
  { id: "fun", mood: "fun", path: "/kits/fun", label: "Fun", title: "Fun Diamond Painting Kits" },
  { id: "seasonal", mood: "seasonal", path: "/kits/seasonal", label: "Seasonal", title: "Seasonal Diamond Painting Kits" },
  { id: "tools", mood: "tools", path: "/kits/tools", label: "Tools", title: "Diamond Painting Tools" },
] as const;

export const MOOD_PATH: Record<string, string> = {
  all: "/kits",
  glam: "/kits/glam",
  wildlife: "/kits/wildlife",
  fun: "/kits/fun",
  seasonal: "/kits/seasonal",
  heroes: "/kits/heroes",
  tools: "/kits/tools",
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized === "/" ? "/" : normalized}`;
}

export function pageHead({
  title,
  description,
  path,
  image = "/og.jpg",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}) {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: SITE_NAME },
      { name: "geo.region", content: "US-OH" },
      { name: "geo.placename", content: "Avon" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Store", "HobbyShop"],
      "@id": `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME,
      url: SITE_ORIGIN,
      image: absoluteUrl("/og.jpg"),
      email: STUDIO_EMAIL,
      telephone: STUDIO_PHONE_TEL,
      description: SITE_DESCRIPTION,
      slogan: "Create it. Sparkle it. Make it yours.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "35966 Detroit Rd #1022",
        addressLocality: "Avon",
        addressRegion: "OH",
        postalCode: "44011",
        addressCountry: "US",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "IK’s Charms & True Sparkle",
        url: PARENT_URL,
      },
      sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_TIKTOK, PARENT_URL, KAYZ_URL],
    },
  ],
} as const;
