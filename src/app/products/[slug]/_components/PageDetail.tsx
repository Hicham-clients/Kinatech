"use client";
import { Product } from "@/hooks/useDetail";
import { useStock } from "@/hooks/useStock";
import DetailComponent from "./DetailComponent";

type Props = {
  data: Product;
  slug: string;
};

/**
 * `data` arrive du serveur en ISR (API statique, cache 24h).
 * Le stock est récupéré ici, côté client, sur l'API dynamique — jamais caché.
 */
const PageDetail = ({ data, slug }: Props) => {
  const { data: stock, isLoading: stockLoading } = useStock(slug);

  if (!data) return null;

  return (
    <DetailComponent
      product={data}
      stock={stock ?? null}
      stockLoading={stockLoading}
    />
  );
};
export default PageDetail;
