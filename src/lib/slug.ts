/**
 * Slug URL d'une marque : "TP-Link" -> "tp-link".
 * Isolé ici pour être importable côté client sans embarquer fetchFunction.
 */
export function brandSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
