"use client";
import clsx from "clsx";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageTitle from "@/components/PageTitle";
// import { container, item, once } from "@/animations/variants";

const ContactForm = () => {
  //ZOD
  const contactSchema = z.object({
    name: z.string().min(1, "Ce champ est requis"),
    email: z.string().email("Email invalide"),
    subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
    message: z
      .string()
      .min(10, "Le message doit contenir au moins 10 caractères"),
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
  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("Message a été  envoyé avec succés");
        reset();
      } else {
        alert("il y a un erreur");
      }
    } catch (err) {
      console.error(err);
      alert("Essayer after");
    }
  };

  return (
    <div className="p-paddingPhone kinatech-container  flex flex-col gap-y-20 py-paddingPC lg:px-paddingPC">
     <PageTitle title='Contactez-nous' text=' Nous serions ravis d’avoir de vos nouvelles. Remplissez le formulaire
          ci‑dessous et nous vous répondrons dès que possible'/>
      
      <motion.div
      
        className="  flexCenter  "
      >
        <motion.div
          key={1}
          className="w-full border-t border-[#eeeded] md:w-1/2  flex flex-col gap-y-5 rounded-xl shadow-2xl shadow-[#d9d5d5c9] p-5"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-1">
                <input
                  placeholder="Entrez votre nom et prénom..."
                  {...register("name")}
                  name="name"
                  className={clsx(
                    errors.name
                      ? "border-[red] placeholder:text-[#ff000083]"
                      : "border-gray-300 ",
                    "form-input"
                  )}
                  type="text"
                />
                {errors.name && (
                  <p className="error-input">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-1">
                <input
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
                  placeholder="Entrez  Le sujet..."
                  {...register("subject")}
                  name="subject"
                  className={clsx(
                    errors.subject
                      ? "border-[red] placeholder:text-[#ff000083]"
                      : "border-gray-300 ",
                    "form-input"
                  )}
                  type="text"
                />
                {errors.subject && (
                  <p className="error-input">{errors.subject.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <textarea
                placeholder="Entrez Le message..."
                {...register("message")}
                name="message"
                className={clsx(
                  errors.name
                    ? "border-[red] placeholder:text-[#ff000083]"
                    : "border-gray-300 ",
                  "form-input   px-4 py-3 h-32 resize-none"
                )}
              ></textarea>
              {errors.message && (
                <p className="error-input">{errors.message.message}</p>
              )}
            </div>
            <button className="bg-main bg-main-hover kinatech-btn">
             {isSubmitting?'chargement...':'Envoyer'} 
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ContactForm;
