import "../css/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Metadata } from "next";
import { Providers } from "@/store/Providers";
import Whatsapp from "@/components/Whatsapp";
import MenuServer from "@/components/partials/Menu/MenuServer";
import FooterServer from "@/components/partials/footer/FooterServer";
import BrandServer from "./_components/brands/BrandServer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

//SEO OPTIMIZATION
export const metadata: Metadata = {
  title: {
    default: "KINATECH | Boutique high-tech au Maroc",
    // Le nom de marque va en fin de titre : Google tronque vers 60 caractères
    // et c'est le sujet de la page qui doit rester visible.
    template: "%s | KINATECH",
  },
  description:
    "Découvrez KINATECH, votre boutique en ligne au Maroc pour acheter ordinateurs, smartphones, accessoires et produits high-tech de qualité. Livraison rapide et service client professionnel.",
  openGraph: {
    title: "KINATECH | Boutique high-tech au Maroc",
    description:
      "Achetez vos produits électroniques, ordinateurs portables, smartphones et gadgets au meilleur prix sur KINATECH. Qualité garantie et livraison rapide partout au Maroc.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/kinatech/og-image.webp",
        width: 1200,
        height: 630,
        alt: "KINATECH - Boutique high-tech au Maroc",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  // Google ignore meta keywords depuis 2009 ; on garde une liste courte
  // pour les autres moteurs plutôt que 32 variantes de la même requête.
  keywords: [
    "KINATECH",
    "boutique high-tech Maroc",
    "ordinateur portable Maroc",
    "PC gamer Maroc",
    "smartphone Maroc",
    "accessoires informatiques Maroc",
    "boutique informatique Casablanca",
  ],
  twitter: {
    card: "summary_large_image",
    title: "KINATECH | Boutique high-tech au Maroc",
    description:
      "Achetez vos produits électroniques, ordinateurs portables, smartphones et gadgets au meilleur prix sur KINATECH.",
    images: ["/images/kinatech/og-image.webp"],
  },
  authors: [{ name: "Elloutfi Hicham" }],
  creator: "Elloutfi Hicham",
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  // Pas de `alternates.canonical` ici : en App Router la metadata du layout
  // racine est héritée par toute page qui n'en définit pas, ce qui faisait
  // pointer /contact, /cart, /products_categories... vers l'accueil.
  icons: {
    icon: "/favicon.ico",
  },
    robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },


};

// Identité du site pour le Knowledge Panel et la sitelinks searchbox.
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/kinatech/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr-MA",
    publisher: { "@id": `${SITE_URL}/#organization` },
    // Pas de SearchAction : la recherche est un dropdown client sans URL
    // dédiée, déclarer une sitelinks searchbox pointerait dans le vide.
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <head>
      <meta name="google-site-verification" content="Yd5vbMKnOgqxfm4Ff4HIupEAHWOM5f2DB-Tad3hRWjQ" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
    </head>
      <body>
        <Providers>
          <ReactQueryProvider>
            <header>
              <MenuServer />
            </header>
            <main className="min-h-[80vh]">
              {children}

              <Whatsapp />
            </main>

            <footer>
              <BrandServer />
              <FooterServer />
            </footer>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
