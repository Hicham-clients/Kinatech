import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Tunnel d'achat et routes API : rien à indexer, et le crawl des
        // URLs filtrées épuise le budget sur des pages dupliquées.
        disallow: ["/cart", "/api/", "/*?*min_price=", "/*?*page="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
