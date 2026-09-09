import { createServerFn } from "@tanstack/react-start";
import { LEGACY_HOSTS, SITE_ORIGIN } from "@/lib/seo";

const LOCAL = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

export function canonicalRedirectUrl(requestUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(requestUrl);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/:\d+$/, "");
  if (LOCAL.has(host) || host.endsWith(".localhost")) return null;
  const canonicalHost = new URL(SITE_ORIGIN).hostname;
  if (host === canonicalHost) return null;
  const shouldMove =
    LEGACY_HOSTS.includes(host as (typeof LEGACY_HOSTS)[number]) ||
    host.endsWith(".vercel.app");
  if (!shouldMove) return null;
  return `${SITE_ORIGIN}${url.pathname}${url.search}`;
}

export const getCanonicalRedirect = createServerFn({ method: "GET" }).handler(async () => {
  const { getRequest } = await import("@tanstack/react-start/server");
  const request = getRequest();
  const forwarded = request.headers.get("x-forwarded-host");
  const host = (forwarded || request.headers.get("host") || "").split(":")[0];
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const url = new URL(request.url);
  return canonicalRedirectUrl(`${proto}://${host}${url.pathname}${url.search}`);
});
