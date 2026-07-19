// Source unique du domaine public : le layout utilisait www.store.kinatech.ma
// pendant que le sitemap, robots.txt et les canonicals de page utilisaient
// store.kinatech.ma — deux versions du même site pour Google.
export const SITE_URL = "https://store.kinatech.ma";
export const SITE_NAME = "KINATECH";

/** URL absolue à partir d'un chemin ("/promos" → "https://store.kinatech.ma/promos"). */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const productUrl = (url: string) => absoluteUrl(`/products/${url}`);
