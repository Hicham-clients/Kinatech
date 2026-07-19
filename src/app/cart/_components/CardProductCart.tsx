"use client";
import Icon from "@/components/IconComponent";
import { imageSrc } from "@/lib/getSrc";
import { Cart, Decrease, Increase, RemoveFromCart } from "@/store/productSlice";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Confirmer from "./confirmer";
import { PriceFormat } from "@/functions/Discount";

export default function CartProduct({
  photo,
  color,
  id,
  max,
  name,
  price,
  quantity,
  capacity,
  ram,
  url,
}: Cart) {
  const dispatch = useDispatch();
  //show dialog for delete
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex font-A items-start py-6 border-b border-grey w-full  ">
      {/* Taille fixe + overflow-hidden : une image manquante affichait son
          texte alternatif en entier et faisait exploser la mise en page. */}
      <Link
        href={`/products/${url}`}
        className="flexCenter h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[#fafafa]"
      >
        <Image
          loading="lazy"
          width={80}
          height={80}
          sizes="80px"
          src={imageSrc(photo)}
          alt=""
          className="h-full w-full object-contain"
        />
      </Link>
      <div className="ml-6 flex-1 min-w-0">
        <div className="flex justify-between flex-wrap gap-x-5 items-start">
          <Link href={`/products/${url}`} className="min-w-0">
            <h2 className="text-base md:text-lg font-D text-blk" title={name}>
              {name.slice(0, 60)}
              {name.length > 60 && "..."}
            </h2>
            <p className="text-sm  text-grey mt-1">Couleur : {color}</p>
            {/* {capacity ||
              (ram && (
                <p className="text-sm  text-grey">
                  Capacité : {capacity}| {ram}
                </p>
              ))}{" "} */}
          </Link>
          <p className="  text-lg font-D text-blk ">{PriceFormat(price)} DH</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <button
              onClick={() => dispatch(Decrease(id))}
              className={clsx(
                quantity == 1
                  ? "cursor-not-allowed opacity-[0.5] "
                  : "bg-main-hover text-fff-hover",

                "w-8 h-8 flex items-center justify-center border rounded-l-md  0  border-grey"
              )}
            >
              <Icon name="Minus" />
            </button>
            <span className="select-none px-5 font-B w-12 py-1 border-t border-b border-grey flexCenter">
              {quantity}
            </span>
            <button
              onClick={() => dispatch(Increase(id))}
              className={clsx(
                quantity == max
                  ? "cursor-not-allowed opacity-[0.5] "
                  : "bg-main-hover text-fff-hover",
                "w-8 h-8  flexCenter border border-grey rounded-r-md "
              )}
            >
              <Icon name="Plus" />
            </button>
          </div>
          <button
            onClick={() => setShowDialog(true)}
            className="text-sm select-none font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 flex items-center"
          >
            <span className="text-xl">
              <Icon name="Trash" />{" "}
            </span>
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>
      {/* Show  */}
      {showDialog && (
        <Confirmer
          confirmer={() => {
            setShowDialog(false);
            dispatch(RemoveFromCart(id));
          }}
          name={name}
          onclick={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
