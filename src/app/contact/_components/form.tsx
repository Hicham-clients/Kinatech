"use client";
import clsx from "clsx";
import { Send } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { container, item, once } from "@/animations/variants";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation("common");
  const formFields = t("formFields", { returnObjects: true }) as Record<
    string,
    string
  >;
  const formValidation = t("formValidation", { returnObjects: true }) as Record<
    string,
    Record<string, string>
  >;
  //ZOD
  const contactSchema = z.object({
    name: z.string().min(1, formValidation.name.required),
    email: z.string().email(formValidation.email.email),
    subject: z.string().min(5, formValidation.subject.min),
    message: z.string().min(10, formValidation.message.min),
    phone: z
      .string()
      .min(1, formValidation.phone.min)
      .regex(/^\+?\d{10,15}$/, formValidation.phone.regex),
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
        alert("Message sent successfully");
        reset();
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={once}
      className="soriac-container font-[500] flex gap-20 md:gap-x-10 flex-col md:flex-row py-32"
    >
      <motion.div
        variants={{ ...item, hidden: { ...item.hidden, rotate: 0 } }}
        key={1}
        className="w-full border-t border-[#eeeded] md:w-1/2  flex flex-col gap-y-5 rounded-xl shadow-2xl shadow-[#d9d5d5c9] p-5"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-B text-center md:text-left font-semibold  tracking-wide">
          {t("sendusmessage")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-1">
              <input
                {...register("name")}
                name="name"
                className={clsx(
                  errors.name
                    ? "border-[red] placeholder:text-[#ff000083]"
                    : "border-gray-300 ",
                  "form-input"
                )}
                placeholder={formFields.name}
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
                placeholder={formFields.email}
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
                  placeholder={formFields.phone}
                  type="tel"
                />
                {errors.phone && (
                  <p className="error-input">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <input
                {...register("subject")}
                name="subject"
                className={clsx(
                  errors.subject
                    ? "border-[red] placeholder:text-[#ff000083]"
                    : "border-gray-300 ",
                  "form-input"
                )}
                placeholder={formFields.subject}
                type="text"
              />
              {errors.subject && (
                <p className="error-input">{errors.subject.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <textarea
              {...register("message")}
              name="message"
              className={clsx(
                errors.name
                  ? "border-[red] placeholder:text-[#ff000083]"
                  : "border-gray-300 ",
                "form-input   px-4 py-3 h-32 resize-none"
              )}
              placeholder={formFields.message}
            ></textarea>
            {errors.message && (
              <p className="error-input">{errors.message.message}</p>
            )}
          </div>
          <button className="w-full sm:w-auto px-6 py-3 bg-main text-white text-base font-bold rounded-lg hover:bg-black transitionclass flex items-center justify-center gap-x-2  font-B ">
            {t("sendmessage")}
            <Send
              className={clsx(
                isSubmitting && "-translate-y-10 translate-x-10",
                " transition-all duration-[2s]"
              )}
            />
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={{ ...item, hidden: { ...item.hidden, rotate: 0 } }}
        key={2}
        className="rounded-xl   overflow-hidden shadow-2xl w-full md:w-1/2 md:h-auto h-[400px]  shadow-[#c9c9c9a7]"
      >
        <iframe
          src="https://www.google.com/maps?q=Soriac+Sarl+Berrechid+Morocco@33.2493762,-7.5863355&z=15&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};
export default ContactForm;
