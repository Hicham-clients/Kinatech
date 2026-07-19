import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Images de fond des sections de l'accueil.
 *
 * Dépose simplement les fichiers à ces emplacements :
 *   next/public/images/featured/apple-banner.webp
 *   next/public/images/featured/gamer-banner.webp
 *
 * Tant qu'un fichier est absent, la section retombe sur son dégradé CSS
 * — pas d'image cassée. Dès qu'il est là, il est utilisé automatiquement.
 *
 * Format conseillé : ~1920x600, WebP, sujet centré (le texte est centré
 * par-dessus, avec un voile de lisibilité déjà appliqué).
 */
export const BANNER_APPLE = "/images/featured/apple-banner.webp";
export const BANNER_GAMER = "/images/featured/gamer-banner.webp";

/**
 * Ne renvoie le chemin que si le fichier existe réellement dans /public.
 * Appelable uniquement depuis un composant serveur.
 */
export function bannerIfExists(publicPath: string): string | undefined {
  const filePath = path.join(process.cwd(), "public", publicPath);

  return existsSync(filePath) ? publicPath : undefined;
}
