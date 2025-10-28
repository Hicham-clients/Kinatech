"use client";
import clsx from "clsx";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { ToggleSummary, ViderCart } from "@/store/productSlice";
import Link from "next/link";
import Image from "next/image";
const Checkout = () => {
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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const onSubmit = async (commande: ContactFormData) => {
    const products = cart.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    const myData = {
      commande,
      products,
    };

    try {
      const res = await axiosInstance.post(
        "/api/commandes/store",
        JSON.stringify(myData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status == 201) {
        dispatch(ToggleSummary(false));

        const timer = setTimeout(() => {
          dispatch(ViderCart()); 
                  dispatch(ToggleSummary(true));

          reset();
        }, 12000);
        return ()=>clearTimeout(timer)
      }
    } catch (err) {
      alert("il y a un erreur réssayer");
    }
  };

  return isSubmitSuccessful ? (
    <div className=" md:w-1/2 mx-auto flex select-none  justify-center items-center font-A  flex-col gap-y-5">
      <div className="relative h-52 w-52 ">
        <Image
          fill
          alt="icon confirmation"
          src={
            "/images/cart/iconconfirm.webp"
          }
          className="w-full h-full absolute pointer-events-none object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="   text-center font-D text-2xl">
          Votre commande a été enregistrée avec succès.
        </h1>
        <p className="text-center max-w-md text-grey">
          Nous vous contacterons par téléphone pour confirmer votre commande
        </p>
      </div>
      <Link
        href={"/products_categories"}
        className="w-fit text-sm flex bg-second-hover font-D  border p-2 rounded-lg text-center bg-second text-white"
      >
        Continuer vos achats
      </Link>
    </div>
  ) : (
    <div className="flex flex-col gap-y-5 w-full">
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
          <button className="bg-main bg-main-hover kinatech-btn">
            {isSubmitting ? "chargement..." : "Envoyer La commande"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default Checkout;
