"use client";
import clsx from "clsx";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  setOrderConfirmed,
  ToggleSummary,
  ViderCart,
} from "@/store/productSlice";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/IconComponent";
import OrderSuccess, { type Partiel } from "./OrderSuccess";
import OrderErrorModal from "./OrderErrorModal";
const CheckoutComponent = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  //ZOD
  const contactSchema = z.object({
    fullName: z.string().min(1, "Le nom complet est requis"),
    email: z.string().email("Email invalide"),
    city: z.string().min(1, "La ville est requis").max(50),
    adress: z.string().min(10, "L'adress doit contenir au moins 10 caractères"),
    phone: z
      .string()
      .min(1, "Le téléphone est requis")
      .regex(/^\+?\d{10,15}$/, "Numéro de téléphone invalide"),
  });
  type ContactFormData = z.infer<typeof contactSchema>;

  //use form hook
  const {
    register,

    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  // Succès explicite : `isSubmitSuccessful` de react-hook-form passe à true
  // dès que onSubmit se termine sans lever d'exception — donc aussi quand
  // l'API a échoué et qu'on a intercepté l'erreur. Il ne peut pas servir ici.
  const [orderSuccess, setOrderSuccess] = useState(false);
  // Message d'échec affiché dans le formulaire (remplace l'alert() natif)
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Articles retirés faute de stock, renvoyés par l'API
  const [indisponibles, setIndisponibles] = useState<string[]>([]);
  // Numéro de commande renvoyé par l'API, affiché sur la confirmation
  const [numeroCommande, setNumeroCommande] = useState<number | null>(null);
  // Rupture de stock détectée au moment de commander (réponse 409).
  // Distinct de submitError : ce n'est pas une panne, c'est un stock épuisé.
  const [rupture, setRupture] = useState<string[] | null>(null);
  // Articles servis en quantité réduite faute de stock suffisant
  const [partiels, setPartiels] = useState<Partiel[]>([]);

  const onSubmit = async (commande: ContactFormData) => {
    const products = cart.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    const myData = {
      commande,
      products,
    };

    setSubmitError(null);
    setRupture(null);

    try {
      const res = await axiosInstance.post(
        "/api/commandes/store",
        JSON.stringify(myData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status !== 201) {
        // L'API ne confirme pas la création : on ne vide surtout pas le panier.
        setSubmitError(
          "La commande n'a pas pu être confirmée. Veuillez réessayer."
        );
        return;
      }

      setIndisponibles(res.data?.indisponibles ?? []);
      setPartiels(res.data?.partiels ?? []);
      setNumeroCommande(res.data?.commande?.id ?? null);
      setOrderSuccess(true);
      reset();

      // Le panier est vidé tout de suite : la commande est enregistrée.
      // Aucun setTimeout ici — la confirmation reste affichée jusqu'à ce
      // que l'utilisateur choisisse lui-même de quitter la page.
      dispatch(setOrderConfirmed(true));
      dispatch(ViderCart());
      dispatch(ToggleSummary(false));
    } catch (error: unknown) {
      // Le panier est conservé pour que le client puisse réessayer.
      let message =
        "Impossible d'enregistrer votre commande. Vérifiez votre connexion et réessayez.";

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const apiMessage = error.response?.data?.message;

        // 409 = rupture de stock : traité à part, avec la liste des articles
        // concernés et une invitation à modifier le panier.
        if (status === 409) {
          setRupture(error.response?.data?.indisponibles ?? []);
          return;
        }

        if (status === 422) {
          message =
            apiMessage ??
            "Certaines informations sont invalides. Vérifiez le formulaire.";
        } else if (apiMessage) {
          message = apiMessage;
        }
      }

      setSubmitError(message);
    }
  };
  // En quittant la page, on retire le drapeau : sinon un panier vide
  // continuerait d'afficher le contenu au lieu de la page "panier vide".
  useEffect(() => {
    return () => {
      dispatch(setOrderConfirmed(false));
    };
  }, [dispatch]);

  //Protected Route
  useEffect(() => {
    // `orderSuccess` neutralise la redirection : vider le panier après une
    // commande réussie rendrait ce garde-fou actif et chasserait
    // l'utilisateur de sa propre page de confirmation.
    if (cart.length == 0 && !orderSuccess) {
      router.push("/products_categories");
    }
  }, [cart, router, orderSuccess]);
  return orderSuccess ? (
    <OrderSuccess
      numeroCommande={numeroCommande}
      indisponibles={indisponibles}
      partiels={partiels}
    />
  ) : (
    <div className="flex flex-col gap-y-5 w-full">
      {/* Les échecs passent en modale : dans le formulaire, l'encart était
          souvent hors écran après un envoi depuis le bas de la page. */}
      {rupture && (
        <OrderErrorModal
          variant="rupture"
          message={
            rupture.length > 0
              ? "Le stock de ces articles vient de tomber à zéro pendant votre commande."
              : "Les articles de votre panier ne sont plus disponibles."
          }
          articles={rupture}
          onClose={() => setRupture(null)}
        />
      )}

      {submitError && (
        <OrderErrorModal
          variant="erreur"
          message={submitError}
          onClose={() => setSubmitError(null)}
          onRetry={() => {
            setSubmitError(null);
            handleSubmit(onSubmit)();
          }}
        />
      )}

      <h1 className=" font-D text-3xl tracking-wider">
        Validation de la commande
      </h1>
      <motion.div
        key={1}
        className=" border-t border-[#eeeded]   flex flex-col gap-y-5 rounded-xl shadow-2xl shadow-[#d9d5d5c9] p-5 w-full"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-1">
              <input
                autoComplete="name"
                placeholder="Entrez votre nom et prénom..."
                {...register("fullName")}
                name="fullName"
                className={clsx(
                  errors.fullName
                    ? "border-[red] placeholder:text-[#ff000083]"
                    : "border-gray-300 ",
                  "form-input"
                )}
                type="text"
              />
              {errors.fullName && (
                <p className="error-input">{errors.fullName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <input
                autoComplete="email"
                {...register("email")}
                name="email"
                className={clsx(
                  errors.email
                    ? "border-[red] placeholder:text-[#ff000083]"
                    : "border-gray-300 ",
                  "form-input"
                )}
                placeholder="Entrez votre Email..."
                type="email"
              />
              {errors.email && (
                <p className="error-input">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="w-full flex flex-col gap-y-1">
              <div className="flex flex-col gap-y-1">
                <input
                  autoComplete="tel"
                  {...register("phone")}
                  name="phone"
                  className={clsx(
                    errors.phone
                      ? "border-[red] placeholder:text-[#ff000083]"
                      : "border-gray-300 ",
                    "form-input"
                  )}
                  type="tel"
                  placeholder="Entrez votre Téléphone..."
                />
                {errors.phone && (
                  <p className="error-input">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <input
                autoComplete="address-level1"
                placeholder="Entrez  La ville..."
                {...register("city")}
                name="city"
                className={clsx(
                  errors.city
                    ? "border-[red] placeholder:text-[#ff000083]"
                    : "border-gray-300 ",
                  "form-input"
                )}
                type="text"
              />
              {errors.city && (
                <p className="error-input">{errors.city.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <textarea
              autoComplete="address-level1"
              placeholder="Entrez L'adress..."
              {...register("adress")}
              name="adress"
              className={clsx(
                errors.adress
                  ? "border-[red] placeholder:text-[#ff000083]"
                  : "border-gray-300 ",
                "form-input   px-4 py-3 h-32 resize-none"
              )}
            ></textarea>
            {errors.adress && (
              <p className="error-input">{errors.adress.message}</p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className={clsx(
              isSubmitting && "cursor-wait opacity-70",
              submitError ? "bg-second bg-second-hover" : "bg-main bg-main-hover",
              "kinatech-btn w-full font-D text-white shadow-md sm:w-fit sm:px-10"
            )}
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Envoi en cours...
              </>
            ) : submitError ? (
              <>
                <span className="text-xl">
                  <Icon name="ArrowClockwise" />
                </span>
                Réessayer
              </>
            ) : (
              <>
                <span className="text-xl">
                  <Icon name="ShoppingBag" />
                </span>
                Commander
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default CheckoutComponent;
