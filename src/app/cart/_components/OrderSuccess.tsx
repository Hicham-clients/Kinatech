"use client";
import Icon from "@/components/IconComponent";
import Image from "next/image";
import Link from "next/link";

const ETAPES = [
  {
    titre: "Commande reçue",
    texte: "Nous préparons votre commande.",
    icon: "Package" as const,
  },
  {
    titre: "Appel de confirmation",
    texte: "Un conseiller vous appelle pour valider les détails.",
    icon: "PhoneCall" as const,
  },
  {
    titre: "Livraison",
    texte: "Expédition à l'adresse que vous avez indiquée.",
    icon: "Truck" as const,
  },
];

export type Partiel = {
  name: string;
  demande: number;
  disponible: number;
};

type Props = {
  numeroCommande: number | null;
  indisponibles: string[];
  partiels?: Partiel[];
};

const RuptureNotice = ({
  indisponibles,
  partiels = [],
}: {
  indisponibles: string[];
  partiels?: Partiel[];
}) => (
  <div className="w-full rounded-2xl border border-second/40 bg-second/10 p-4 text-sm">
    {indisponibles.length > 0 && (
      <>
        <p className="font-D text-blk">
          {indisponibles.length === 1
            ? "Un article n'a pas pu être retenu :"
            : "Certains articles n'ont pas pu être retenus :"}
        </p>
        <ul className="list-disc pl-5 pt-1 text-blk/80">
          {indisponibles.map((name) => (
            <li key={name}>{name} — plus en stock</li>
          ))}
        </ul>
      </>
    )}

    {partiels.length > 0 && (
      <>
        <p className={`font-D text-blk ${indisponibles.length > 0 ? "pt-3" : ""}`}>
          Quantité réduite faute de stock :
        </p>
        <ul className="list-disc pl-5 pt-1 text-blk/80">
          {partiels.map((item) => (
            <li key={item.name}>
              {item.name} — {item.disponible} sur {item.demande} demandé
              {item.demande > 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </>
    )}

    <p className="pt-2 text-xs text-grey">
      Le reste de votre commande est bien enregistré.
    </p>
  </div>
);

const Actions = ({ className = "" }: { className?: string }) => (
  <div className={`flex w-full flex-col gap-3 sm:flex-row ${className}`}>
    <Link
      href={"/products_categories"}
      className="kinatech-btn w-full bg-main bg-main-hover font-D text-white"
    >
      Continuer vos achats
    </Link>
    <Link
      href={"/"}
      className="kinatech-btn w-full border border-[#e5e5e5] bg-white font-D text-blk bg-gray-hover"
    >
      Retour à l&apos;accueil
    </Link>
  </div>
);

/**
 * Confirmation de commande.
 * Deux mises en page distinctes plutôt qu'une seule étirée : la carte
 * centrée fonctionne sur mobile, mais devient une colonne perdue au milieu
 * d'un écran large. Sur desktop on passe donc en bandeau pleine largeur.
 */
const OrderSuccess = ({ numeroCommande, indisponibles, partiels = [] }: Props) => {
  return (
    <>
      {/* ------------------------------------------------------ MOBILE */}
      <div className="flex w-full select-none flex-col items-center gap-y-6 rounded-3xl border border-main/20 bg-white p-6 font-A shadow-xl shadow-main/5 sm:p-8 md:hidden">
        <div className="relative h-40 w-40">
          <Image
            fill
            sizes="200px"
            alt="Commande confirmée"
            src={"/images/cart/iconconfirm.webp"}
            className="pointer-events-none absolute h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <span className="rounded-full bg-main/10 px-4 py-1 font-D text-xs uppercase tracking-[0.2em] text-main">
            Commande confirmée
          </span>
          <h1 className="text-center font-D text-2xl text-blk">
            Votre commande est enregistrée.
          </h1>
        
        </div>

        <ol className="w-full divide-y divide-[#f0f0f0] rounded-2xl bg-[#fafafa] text-sm">
          {ETAPES.map((etape, i) => (
            <li key={etape.titre} className="flex items-center gap-x-3 p-4">
              <span className="flexCenter h-6 w-6 shrink-0 rounded-full bg-main font-D text-xs text-white">
                {i + 1}
              </span>
              <span className="text-blk">{etape.texte}</span>
            </li>
          ))}
        </ol>

        {(indisponibles.length > 0 || partiels.length > 0) && (
          <RuptureNotice indisponibles={indisponibles} partiels={partiels} />
        )}

        <Actions />
      </div>

      {/* ------------------------------------------- TABLETTE + DESKTOP */}
      {/* Pas de carte ni d'encadré : le contenu respire directement sur la
          page, la confirmation n'a pas besoin d'être "posée" dans une boîte. */}
      <div className="hidden w-full select-none font-A md:block">
        <div className="flex items-center gap-x-8 lg:gap-x-12">
          <div className="relative h-32 w-32 shrink-0 lg:h-44 lg:w-44">
            <Image
              fill
              sizes="200px"
              alt="Commande confirmée"
              src={"/images/cart/iconconfirm.webp"}
              className="pointer-events-none absolute h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col gap-y-3">
            <span className="font-B text-xs uppercase tracking-[0.3em] text-main">
              Commande confirmée
            </span>
            <h1 className="font-D text-3xl leading-tight text-blk lg:text-5xl">
              Votre commande est enregistrée.
            </h1>
            <p className="max-w-2xl text-grey">
              Nous vous contacterons par téléphone pour confirmer votre
              commande et convenir de la livraison.
            </p>
           
          </div>
        </div>

        {/* Étapes séparées par de simples filets verticaux */}
        <ol className="mt-12 grid grid-cols-3 gap-x-10 border-t border-[#ececec] pt-10">
          {ETAPES.map((etape, i) => (
            <li
              key={etape.titre}
              className={`flex flex-col gap-y-3 ${
                i > 0 ? "border-l border-[#ececec] pl-10" : ""
              }`}
            >
              <div className="flex items-center gap-x-3">
                <span className="text-3xl text-main">
                  <Icon name={etape.icon} />
                </span>
                <span className="font-B text-xs uppercase tracking-widest text-grey">
                  Étape {i + 1}
                </span>
              </div>
              <h2 className="font-D text-lg text-blk">{etape.titre}</h2>
              <p className="text-sm leading-relaxed text-grey">{etape.texte}</p>
            </li>
          ))}
        </ol>

        {(indisponibles.length > 0 || partiels.length > 0) && (
          <div className="pt-10">
            <RuptureNotice indisponibles={indisponibles} partiels={partiels} />
          </div>
        )}

        <Actions className="max-w-lg pt-10" />
      </div>

    </>
  );
};
export default OrderSuccess;
