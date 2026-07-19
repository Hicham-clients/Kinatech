import type { Product } from "@/hooks/useCategories";
import Link from "next/link";
import FeaturedCard from "./FeaturedCard";
import Image from "next/image";

export type FeaturedTheme = "apple" | "gamer";

type ThemeTokens = {
  /** Fond de la section entière */
  page: string;
  /** Fond du banner */
  banner: string;
  /** Bordure du banner */
  border: string;
  /** Halos colorés superposés au banner */
  glow: string;
  /** Texture par-dessus la grille (scanlines gaming) */
  texture: string;
  /** Voile posé sur l'image de fond pour garder le texte lisible */
  imageScrim: string;
  /** Dégradé appliqué au titre */
  titleGradient: string;
  /** Couleur de l'accroche */
  eyebrow: string;
  /** Bouton d'appel à l'action */
  cta: string;
  /** Couleur des prix sur les cartes */
  accent: string;
  /** Police du titre */
  titleFont: string;
};

const THEMES: Record<FeaturedTheme, ThemeTokens> = {
  // Palette Apple : noirs profonds, gris système (#f5f5f7 / #86868b),
  // une seule touche de bleu froid. Aucune couleur saturée.
  apple: {
    page: "bg-black",
    banner:
      "bg-[radial-gradient(120%_120%_at_50%_0%,#1d1d1f_0%,#0a0a0c_45%,#000000_100%)]",
    border: "border-white/10",
    glow: "bg-[radial-gradient(closest-side_at_50%_-10%,rgba(120,160,255,0.22),transparent_70%)]",
    texture: "",
    imageScrim:
      "bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.72)_55%,rgba(0,0,0,0.9)_100%)]",
    titleGradient: "bg-gradient-to-b from-white via-[#f5f5f7] to-[#86868b]",
    eyebrow: "text-[#86868b]",
    cta: "bg-[#f5f5f7] text-black hover:bg-white",
    accent: "#f5f5f7",
    titleFont: "font-B",
  },
  // Palette gaming : violet électrique + cyan néon sur noir bleuté.
  gamer: {
    page: "bg-[#07060d]",
    banner:
      "bg-[radial-gradient(120%_120%_at_20%_0%,#2a1155_0%,#12082a_45%,#07060d_100%)]",
    border: "border-[#7c3aed]/30",
    glow: "bg-[radial-gradient(closest-side_at_15%_0%,rgba(124,58,237,0.45),transparent_70%),radial-gradient(closest-side_at_85%_20%,rgba(34,211,238,0.28),transparent_70%)]",
    texture: "gamer-scanlines",
    imageScrim:
      "bg-[linear-gradient(180deg,rgba(7,6,13,0.6)_0%,rgba(18,8,42,0.78)_55%,rgba(7,6,13,0.92)_100%)]",
    titleGradient: "bg-gradient-to-r from-[#22d3ee] via-white to-[#c084fc]",
    eyebrow: "text-[#22d3ee]",
    cta: "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white hover:brightness-115",
    accent: "#22d3ee",
    titleFont: "font-D",
  },
};

type Props = {
  theme: FeaturedTheme;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  /** Petites accroches affichées sous le titre du banner */
  highlights?: string[];
  /**
   * Image de fond du banner. Absente → le dégradé CSS sert de fond,
   * donc aucune image cassée tant que le fichier n'est pas déposé.
   */
  bannerImage?: string;
  bannerAlt?: string;
  products: Product[];
};

const FeaturedSection = ({
  theme,
  eyebrow,
  title,
  description,
  href,
  ctaLabel,
  highlights = [],
  bannerImage,
  bannerAlt,
  products,
}: Props) => {
  if (products.length === 0) return null;

  const t = THEMES[theme];

  return (
    <section className={`${t.page} px-paddingPhone py-16 lg:px-paddingPC`}>
      <div className="kinatech-container flex flex-col gap-y-10">
        {/* ---------------------------------------------------- BANNER */}
        <div
          className={`premium-hairline relative overflow-hidden rounded-[28px] border ${t.border} ${t.banner}`}
        >
          {/* Image de fond, quand elle est fournie.
              <img> et non next/image : l'URL peut être externe et n'est pas
              déclarée dans les remotePatterns. Une fois le fichier déposé
              dans /public, passer à <Image fill priority /> pour bénéficier
              de l'optimisation — voir le README des sections. */}
          {bannerImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={bannerImage}
                alt={bannerAlt ?? ""}
                aria-hidden={bannerAlt ? undefined : true}
                loading="lazy"
                decoding="async" 
                fill
                className="pointer-events-none  inset-0 h-full w-full object-cover"
              />
              {/* Voile de lisibilité : sans lui le titre passe mal sur une photo */}
              <div
                className={`pointer-events-none absolute inset-0 ${t.imageScrim}`}
              />
            </>
          )}

          {/* Couches décoratives, aucune n'intercepte le curseur */}
          <div className={`pointer-events-none absolute inset-0 ${t.glow}`} />
          <div className="premium-grid pointer-events-none absolute inset-0" />
          {t.texture && (
            <div
              className={`${t.texture} pointer-events-none absolute inset-0 opacity-60`}
            />
          )}

          <div className="relative flex flex-col gap-y-6 px-6 py-14 text-center md:px-14 md:py-20">
            <span
              className={`font-B text-[11px] uppercase tracking-[0.35em] ${t.eyebrow}`}
            >
              {eyebrow}
            </span>

            <h2
              className={`text-gradient mx-auto max-w-3xl ${t.titleGradient} ${t.titleFont} text-4xl leading-[1.1] tracking-tight md:text-6xl`}
            >
              {title}
            </h2>

            <p className="mx-auto max-w-xl font-A text-sm leading-relaxed text-white/55 md:text-base">
              {description}
            </p>

            {highlights.length > 0 && (
              <ul className="mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-A text-[11px] tracking-wide text-white/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={href}
              className={`mx-auto mt-2 w-fit rounded-full px-7 py-3 font-D text-sm transition duration-300 ${t.cta}`}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* -------------------------------------------------- PRODUITS */}
        {/* Scroll horizontal sur mobile, grille sur desktop */}
        <div
          className="-mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-4
                     md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0
                     lg:grid-cols-4"
        >
          {products.map((product) => (
            <FeaturedCard key={product.id} {...product} accent={t.accent} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedSection;
