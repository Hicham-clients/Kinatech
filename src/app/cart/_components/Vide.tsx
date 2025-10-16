"use client";
import Icon from "@/components/IconComponent";
import Link from "next/link";

const Vide = () => {
  return (
    <div className="flexCenter flex-col  h-[72vh] text-grey font-A gap-y-5">
      <div className="text-[5rem] ">
        <Icon name="ShoppingBagOpen" />
      </div>
      
        <h1 className=" tracking-wider">Votre panier est vide!</h1>
      <Link className="bg-[#1f1f1f] text-white rounded-md p-3 flexCenter tracking-wider  bg-black-hover" href={'/produits'}> 
      continuer mes achats
      </Link>
    </div>
  );
};
export default Vide;
