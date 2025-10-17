'use client'
import Icon from "@/components/IconComponent";
import Image from "next/image";
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
    <div className="flex font-A items-start py-6 border-b border-gray-300 w-full  ">
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
          <div>
            <h2 className=" text-lg font-semibold text-gray-900 dark:text-blk">
              {product.name}
            </h2>
            <p className="text-sm text-blk dark:text-gray-400 mt-1">
              Couleur : {product.color}
            </p>
            <p className="text-sm  dark:text-gray-400">
              Capacité : {product.capacity}
            </p>
          </div>
          <p className="font-B  text-lg font-semibold text-gray-900 dark:text-blk">
            {product.price} DH
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <button
              onClick={decrement}
              className="w-8 h-8 flex items-center justify-center border rounded-l-md  0  border-gray-400"
            >
              <Icon name="Minus" />
            </button>
            <span className="select-none px-5 font-B w-12 py-1 border-t border-b border-gray-400 flexCenter">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-r-md "
            >
              <Icon name="Plus" />
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 flex items-center"
          >
            <span className="text-xl"><Icon name="Trash" /> </span>Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
