import { Metadata } from "next";
import WhyKinatech from "./_components/WhyKinatech";
import { HeroSectionType } from "@/hooks/useHero";
import LatestServer from "./_components/latest/LatestServer";
import Hero from "./_components/Hero";
import SuggestionServer from "./_components/suggestions/SuggestionServer";
import PromoServer from "./_components/promo/PromoServer";
import AppleServer from "./_components/featured/AppleServer";
import GamerServer from "./_components/featured/GamerServer";
import { urlApi } from "@/lib/axios";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  // `absolute` court-circuite le template : évite "KINATECH | KINATECH".
  title: {
    absolute: "KINATECH | Boutique high-tech au Maroc",
  },
  description:
    "Découvrez KINATECH, votre boutique en ligne au Maroc pour acheter ordinateurs, smartphones, accessoires et produits high-tech de qualité. Livraison rapide et service client professionnel.",
  alternates: {
    canonical: SITE_URL,
  },
};

export async function getHeros(
  sectiontype: string
): Promise<HeroSectionType[]> {
  try {
    const res = await fetch(
      `${urlApi}/api/herosections/${sectiontype}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("getHeros error:", error);
    return [];
  }
}

const Home = async () => {
  const data = await getHeros("hero section");


  return (
    <>

      {/* Le Hero n'est qu'un carrousel d'images : sans ce titre la page
          d'accueil ne contenait aucun h1 exploitable par les crawlers. */}
      <h1 className="sr-only">
        KINATECH — Boutique high-tech au Maroc : ordinateurs, smartphones et
        accessoires
      </h1>
      <Hero data={data} />
      <SuggestionServer />
      <AppleServer />
      <LatestServer />
      <GamerServer />
      <PromoServer />
      <WhyKinatech />
    </>
  );
};
export default Home;
