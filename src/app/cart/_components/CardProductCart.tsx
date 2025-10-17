'use client'
import Icon from "@/components/IconComponent";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartProduct({
  product = {
    image: "/pc.webp",
    name: "iphone",
    color: "red",
    price: 1990,
    capacity: "90%",
  },
  onRemove = () => console.log("hi"),
}) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex font-A items-start py-6 border-b border-grey w-full  ">
      <div className="flex-shrink-0 flexCenter">
        <Image 
        width={1000}
        height={1000} 
        loading="lazy"
          src={product.image}
          alt={product.name}
          className="w-28 h-28 object-contain pointer-events-none rounded-md"
        />
      </div>
      <div className="ml-6 flex-1">
        <div className="flex justify-between items-start">
          <Link href={'/products/'}>
            <h2 className=" text-lg font-semibold text-blk">
              {product.name}
            </h2>
            <p className="text-sm  text-grey mt-1">
              Couleur : {product.color}
            </p>
            <p className="text-sm  text-grey">
              Capacité : {product.capacity}
            </p>
          </Link>
          <p className="font-B  text-lg font-semibold text-blk">
            {product.price} DH
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <button
              onClick={decrement}
              className="bg-main-hover 
              text-fff-hover

              w-8 h-8 flex items-center justify-center border rounded-l-md  0  border-grey"
            >
              <Icon name="Minus" />
            </button>
            <span className="select-none px-5 font-B w-12 py-1 border-t border-b border-grey flexCenter">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="w-8 h-8 bg-main-hover 
              text-fff-hover flexCenter border border-grey rounded-r-md "
            >
              <Icon name="Plus" />
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 flex items-center"
          >
            <span className="text-xl"><Icon name="Trash" /> </span>
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
