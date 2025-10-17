"use client";
import { container, item, once } from "@/animations/variants";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faLocationDot,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
//type data
type contactInfoType = {
  icon: IconDefinition;
  color: string;
  value: string[];
  href: string;
};
export const contactInfo: contactInfoType[] = [
  {
    icon: faPhoneAlt,
    color: "var(--main)",
    value: [" +212 522 336 290"],
    href: "tel:+212522336290",
  },
  {
    icon: faLocationDot,

    color: "var(--third)",

    value: ["Zone industrielle., rte de Marrakech 26100 Berrechid – Maroc"],
    href: "https://maps.app.goo.gl/qEF4oFhSeCD4wPna8",
  },

  {
    icon: faEnvelope,

    color: "var(--secondary)",

    value: ["contact@soriac.ma", "Info@soriac.ma"],
    href: "mailto:contact@soriac.ma",
  },
];

const Card = ({ icon, color, value, href }: contactInfoType) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (value.length > 1) {
      const interval = setInterval(() => {
        if (value.length - 1 > index) {
          setIndex((p) => p + 1);
        } else {
          setIndex(0);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [index, value.length]);
  return (
    <motion.a
      variants={item}
      href={href}
      target="_blank"
      whileHover={{ y: -20 }}
      style={{ border: "1px slid " + color }}
      className="bg-white    flex-col font-B rounded-2xl  transitionclass  flex justify-center items-center gap-3 p-10"
    >
      <div className="h-full">
        <span
          style={{ background: color }}
          className="p-5 text-2xl rounded-full flex justify-center items-center w-16 h-16"
        >
         
          <FontAwesomeIcon className="text-white" icon={icon} />
        </span>
      </div>
      <h3 className="max-w-sm  text-gray-600 text-center ">{value[index]}</h3>
    </motion.a>
  );
};
const ContactInfo = () => {
  return (
    <div className="px-5 lg:px-20 py-32 bg-gray-100 ">
      <motion.div
        whileInView={"visible"}
        viewport={once}
        initial={"hidden"}
        variants={container}
        className="  grid gap-10 sm:grid-cols-2 lg:grid-cols-3 soriac-container  "
      >
        {contactInfo.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </motion.div>
    </div>
  );
};
export default ContactInfo;
