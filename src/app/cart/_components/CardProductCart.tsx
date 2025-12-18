"use client";
import Icon from "@/components/IconComponent";
import { imageSrc } from "@/lib/getSrc";
import { Cart, Decrease, Increase, RemoveFromCart } from "@/store/productSlice";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      <Link href={`/products/${url}`} className="flex-shrink-0 flexCenter">
        <Image
          loading="lazy"
          width={1000}
          height={1000}
          src={imageSrc(photo)}
          alt={name}
          className="w-28 h-28 object-contain pointer-events-none rounded-md"
        />
      </Link>
      <div className="ml-6 flex-1">
        <div className="flex justify-between gap-x-5 items-start">
          <Link href={`/products/${url}`}>
            <h2 className=" text-lg font-D text-blk">{name}</h2>
            <p className="text-sm  text-grey mt-1">Couleur : {color}</p>
            {capacity ||
              (ram && (
                <p className="text-sm  text-grey">
                  Capacité : {capacity}| {ram}
                </p>
              ))}{" "}
          </Link>
          <p className="  text-lg font-D text-blk ">{PriceFormat(+price)} DH</p>
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
            setShowDialog(false)
            dispatch(RemoveFromCart(id));
          }}
          name={name}
          onclick={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
