'use client'
import Icon from "@/components/IconComponent";
 import * as PhosphorIcons from "phosphor-react";

type Reason = {
  title: string;
  text: string;
  icon: keyof typeof PhosphorIcons;
};

const reasons: Reason[] = [
  {
    title: "Produits authentiques",
    text: "Tous nos produits électroniques sont 100 % originaux et proviennent de marques et fournisseurs certifiés. Achetez en toute confiance, sans risque de contrefaçon.",
    icon: "DeviceMobileCamera",
  },
  {
    title: "Meilleurs prix garantis",
    text: "En achetant directement chez nous, vous bénéficiez de prix justes et sans intermédiaires. Profitez d’offres exclusives et de réductions régulières.",
    icon: "TagSimple",
  },
  {
    title: "Livraison rapide et service fiable",
    text: "Nous assurons une livraison rapide et sécurisée partout au Maroc, avec un service client réactif toujours prêt à vous aider avant et après votre achat.",
    icon: "Truck",
  },
];


const ReasonCard = ({
  title,
  text,
  icon,
}: Reason) => {
  return (
    <div
      className=" bg-white w-full flex flex-col gap-y-3 cursor-context-menu  p-6 rounded-2xl  border-gray-200      hover:shadow- lg hover:shadow-[#e5e2e2]   transform hover:-translate-y-1 h-auto"
    >
      <div className="  flex bg-second  bg-gradient-to-tr  shadow-xl  text-2xl text-white  items-center justify-center h-14 p-4 w-14 rounded-2xl  ">
<Icon name={icon}/>
      </div>
      <h4 className="font-D  h-full tracking-wider  sm:text-[16px] 2xl:text-xl ">
        {title}
      </h4>
      <p className="h-full font-A tracking-wide font-[400] text-sm leading-relaxed">{text}</p>
    </div>
  );
};

const WhyKinatech = () => {
  return (
    <div className="px-paddingPhone lg:px-paddingPC py-24 bg-[#f5f5f5]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 kinatech-container">
            {reasons.map((item,index)=><ReasonCard key={index} {...item}/>)}
        </div>
    </div>
  )
}
export default WhyKinatech