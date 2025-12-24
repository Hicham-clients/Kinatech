"use client";
import Icon from "@/components/IconComponent";
import { Category, useMenuCategories } from "@/hooks/useMenuCategories";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  IconWeight,
  InstagramLogo,
  WhatsappLogo,
} from "phosphor-react";
import React from "react";
const iconsize: { size: string; weight: IconWeight } = {
  size: "1.75rem",
  weight: "regular",
};
const social: {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    name: "Facebook",
    url: "https://web.facebook.com/Kinatech1",
    icon: <FacebookLogo {...iconsize} />,
    color: "blue",
  },
  {
    name: "Instagram",
    url: "",
    icon: <InstagramLogo {...iconsize} />,
    color: "purple",
  },
  {
    name: "WhatsAPP",
    url: "https://wa.me/212661613561",
    icon: <WhatsappLogo {...iconsize} />,
    color: "green",
  },
];

const contact = [
  "kinatech.maroc@gmail.com",
  "kinatech@kinatech.ma",
  "(+212) 5 22 35 69 69 ",
  "(+212) 5 22 67 20 01 ",
];

const links = [
  { name: "Accueil", url: "/" },
  { name: "Panier", url: "/cart" },
  { name: "Nos produits", url: "/products_categories" },
  { name: "Marques", url: "/products_categories?brand=apple" },
  { name: "Contactez nous", url: "/contact" },
];

const Title = ({ value }: { value: string }) => {
  return (
    <h1 className="text-left 2xl:text-lg  capitalize   tracking-wider  font-D ">
      {value}
    </h1>
  );
};

const Footer = ({data}:{data:Category[]}) => {
  // const { data } = useMenuCategories();

  return (
    <footer className="cursor-context-menu   border-t    text-blk  md:p-5 md:py-16 font-A text-sm select-none ">
      <div className="flex p-5 lg:px-20    flex-col gap-y-20 kinatech-container ">
        <div className="flex  flex-col gap-10 md:flex-row justify-between  ">
          <div className="flex  flex-col gap-y-4  w-fit">
           <Image
  src="/images/kinatech/logo.png"
  alt="kinatech"
  width={80}
  height={80}
  className="pointer-events-none object-contain"
/>
            <div className="flex font-D  items-center gap-x-2 leading-relaxed  max-w-xs   md:items-start">
          <span className="text-lg"><Icon name="MapPin" weight="bold" /></span> 131, Allee des mimoza ain sbaa 20 000 Casablanca
            </div>
          </div>

          <div className="flex  flex-col gap-y-4  w-fit">
            <Title value="Liens" />
            <div className="flex flex-col   gap-y-2  items-start md:items-start">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="underline-hover capitalize 2xl:text-base transitionclass text-main-hover  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex  flex-col gap-y-4  w-fit">
            <Title value="Catégories" />
            <div className="flex flex-col   gap-y-2  items-start md:items-start">
              {data?.map((item, index) => (
                <Link
                  key={index}
                  href={`/products_categories?category=${item.url}`}
                  className="underline-hover  capitalize 2xl:text-base transitionclass text-main-hover  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex  flex-col gap-y-4  w-fit">
            <Title value="contact" />
            <ul className="flex flex-col   w-fit  md:items-start gap-y-2  ">
              {contact.map((item, index) => {
                return (
                  <Link
                    href={item.includes("@") ? `mailto:${item}` : `tel:${item}`}
                    className=" underline-hover 2xl:text-base transitionclass text-main-hover  "
                    key={index}
                  >
                    {item}
                  </Link>
                );
              })}
            </ul>
            <ul className="flex  text-xl gap-x-6 ">
              {social.map((item) => {
                return (
                  <li
                    className={`hover:text-[${item.color}] transitionclass  hover:text-main hover:scale-[1.1]`}
                    key={item.name}
                    title={item.name}
                  >
                    <a target="_blank" href={item.url}>
                      {item.icon}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col-reverse gap-y-2  pb-20 md:pb-0  justify-between items-center">
          <div className=" text-sm">
            Tous droits reservés. Kinatech {new Date().getFullYear()} &copy;
          </div>

          <a
            target="_blank" 
            href="https://www.elloutfi.com"
            className=" group transitionclass hover:underline hover:opacity-100  opacity-80 text-sm flex justify-center items-start "
          >
            Développé par: elloutfi.com
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
