import { createRootRoute, HeadContent, Outlet, Scripts, redirect } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteBottomNav } from "@/components/site-bottom-nav";
import { JsonLd } from "@/components/json-ld";
import { getAdminStatus } from "@/lib/catalog-fns";
import { getCanonicalRedirect } from "@/lib/canonical-host";
import { gaId, organizationJsonLd, pageHead, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  loader: () => getAdminStatus(),
  beforeLoad: async () => {
    if (typeof window !== "undefined") return;
    const dest = await getCanonicalRedirect();
    if (dest) throw redirect({ href: dest });
  },
  head: () => {
    const seo = pageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: "/",
    });
    const id = gaId();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0c0708" },
        ...seo.meta,
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@400;500;600&display=swap",
        },
        ...seo.links,
      ],
      scripts: id
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${id}`, async: true },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`,
            },
          ]
        : [],
    };
  },
  component: RootComponent,
});

function RootComponent() {
  const { isAdmin } = Route.useLoaderData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader isAdmin={isAdmin} />
          <Outlet />
          <SiteFooter />
          <SiteBottomNav />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
