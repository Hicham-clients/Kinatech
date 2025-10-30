import "../css/globals.css";
import Menu from "@/components/partials/Menu";
import Footer from "@/components/partials/Footer";
import Brands from "./_components/brands";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Metadata } from "next";
import { Providers } from "@/store/Providers";

//SEO OPTIMIZATION
export const metadata: Metadata = {
  title: {
    default: "KINATECH",
    template: " KINATECH | %s",
  },
  description:
    "Découvrez KINATECH, votre boutique en ligne au Maroc pour acheter ordinateurs, smartphones, accessoires et produits high-tech de qualité. Livraison rapide et service client professionnel.",
  openGraph: {
    title: "KINATECH | Boutique high-tech au Maroc",
    description:
      "Achetez vos produits électroniques, ordinateurs portables, smartphones et gadgets au meilleur prix sur KINATECH. Qualité garantie et livraison rapide partout au Maroc.",
    url: "https://www.kinatech.ma",
    siteName: "KINATECH",
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
  keywords: [
    "KINATECH",
    "boutique électronique Maroc",
    "magasin high-tech Maroc",
    "achat smartphone Maroc",
    "achat ordinateur portable Maroc",
    "meilleures offres high-tech Maroc",
    "accessoires informatiques Maroc",
    "vente en ligne Maroc",
    "boutique en ligne Maroc",
    "site e-commerce Maroc",
    "produits électroniques Maroc",
    "ordinateurs portables pas chers",
    "smartphones pas chers",
    "tablettes Maroc",
    "casques audio Maroc",
    "montres connectées Maroc",
    "périphériques PC Maroc",
    "écrans PC Maroc",
    "gaming Maroc",
    "produits high-tech pas chers",
    "livraison rapide Maroc",
    "meilleure boutique high-tech",
    "boutique technologie Casablanca",
    "boutique informatique Maroc",
    "ordinateur de bureau Maroc",
    "PC gamer Maroc",
    "composants PC Maroc",
    "boutique téléphone Maroc",
    "vente accessoires téléphone",
    "produits connectés Maroc",
    "innovation technologique Maroc",
    "boutique en ligne fiable Maroc",
  ],
  authors: [{ name: "Elloutfi Hicham" }],
  creator: "Elloutfi Hicham",
  publisher: "KINATECH",
  metadataBase: new URL("https://www.kinatech.ma"),
  alternates: {
    canonical: "https://www.kinatech.ma",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <ReactQueryProvider>
            <header>
              <Menu />
            </header>
            <main className="min-h-[80vh]">{children}</main>

            <footer>
              <Brands />
              <Footer />
            </footer>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
