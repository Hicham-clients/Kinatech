import { getProducts } from "@/lib/fetchFunction";
import { BANNER_APPLE, bannerIfExists } from "./banners";
import FeaturedSection from "./FeaturedSection";

const AppleServer = async () => {
  const response = await getProducts({ brand: "Apple" });
  const products = (response?.data ?? []).slice(0, 8);

  return (
    <FeaturedSection
      theme="apple"
      eyebrow="Apple chez Kinatech"
      title="Pensé différemment. Livré au Maroc."
      description="MacBook, iPhone, iPad et Apple Watch — produits authentiques, garantis et disponibles immédiatement."
    
      // bannerImage={bannerIfExists(BANNER_APPLE)}
      bannerImage={bannerIfExists(BANNER_APPLE)}
      bannerAlt=""
      href="/marque/apple"
      ctaLabel="Découvrir l'univers Apple"
      products={products}
    />
  );
};
export default AppleServer;
