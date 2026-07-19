"use client";
import Icon from "@/components/IconComponent";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  /** "rupture" = stock épuisé (ambre), "erreur" = panne technique (rouge) */
  variant: "rupture" | "erreur";
  message: string;
  /** Articles concernés, uniquement pour une rupture */
  articles?: string[];
  onClose: () => void;
  onRetry?: () => void;
};

const OrderErrorModal = ({
  variant,
  message,
  articles = [],
  onClose,
  onRetry,
}: Props) => {
  const isRupture = variant === "rupture";

  // Échap ferme la modale, et le fond ne défile pas derrière
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-error-title"
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50 p-0 font-A sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        // Le clic à l'intérieur ne doit pas fermer la modale
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-x-3">
            <span
              className={`flexCenter h-11 w-11 shrink-0 rounded-full text-2xl ${
                isRupture
                  ? "bg-second/15 text-second"
                  : "bg-[red]/10 text-[red]"
              }`}
            >
              <Icon name={isRupture ? "Package" : "WarningCircle"} />
            </span>
            <h2
              id="order-error-title"
              className={`font-D text-xl ${
                isRupture ? "text-blk" : "text-[red]"
              }`}
            >
              {isRupture
                ? articles.length === 1
                  ? "Cet article vient d'être épuisé"
                  : "Articles épuisés"
                : "La commande n'a pas pu être enregistrée"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="scale-minus-hover shrink-0 text-2xl text-grey"
          >
            <Icon name="X" />
          </button>
        </div>

        <p className="pt-4 text-sm text-blk/80">{message}</p>

        {isRupture && articles.length > 0 && (
          <ul className="mt-3 list-disc rounded-2xl bg-second/10 py-3 pl-9 pr-4 text-sm text-blk/80">
            {articles.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}

        <p className="pt-3 text-xs text-grey">
          {isRupture ? (
            <>
              Le stock a changé pendant votre commande.{" "}
              <strong className="text-blk">
                Aucune commande n&apos;a été enregistrée
              </strong>{" "}
              et vous n&apos;avez rien à payer.
            </>
          ) : (
            <>
              Votre panier et vos informations ont été conservés — rien
              n&apos;a été perdu.
            </>
          )}
        </p>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
          {isRupture ? (
            <>
              <Link
                href="/cart"
                className="kinatech-btn w-full bg-main bg-main-hover font-D text-sm text-white"
              >
                Modifier mon panier
              </Link>
              <Link
                href="/products_categories"
                className="kinatech-btn w-full border border-[#e5e5e5] bg-white font-D text-sm text-blk bg-gray-hover"
              >
                Voir d&apos;autres produits
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onRetry ?? onClose}
                className="kinatech-btn w-full bg-main bg-main-hover font-D text-sm text-white"
              >
                <span className="text-lg">
                  <Icon name="ArrowClockwise" />
                </span>
                Réessayer
              </button>
              <a
                href={`https://wa.me/212661613561?text=${encodeURIComponent(
                  "Bonjour KINATECH, je n'arrive pas à valider ma commande sur le site."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="kinatech-btn w-full border border-[#e5e5e5] bg-white font-D text-sm text-blk bg-gray-hover"
              >
                Commander par WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderErrorModal;
