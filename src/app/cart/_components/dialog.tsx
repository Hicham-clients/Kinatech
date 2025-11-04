import Icon from "@/components/IconComponent";
import { imageSrc } from "@/lib/getSrc";
import Image from "next/image";
import Link from "next/link";

const Dialog = ({
  name,
  photo,
  quantity,
  price,
  onclick,
}: {
  name: string;
  photo: string;
  quantity: number;
  price: string;
  onclick: () => void;
}) => {
  return (
    <div
      onClick={onclick}
      className="select-none fixed top-0 left-0 w-full h-svh bg-black/40 z-[9999] font-A"
    >
      <div className="bg-white kinatech-container rounded-xl fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] lg:w-1/2 h-80 p-padding flex flex-col justify-between gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-D">
            Vous avez ajouter un article à votre panier
          </h1>
          <span
            onClick={onclick}
            className="text-2xl cursor-pointer scale-minus-hover self-start"
          >
            <Icon name="X" />
          </span>
        </div>

        <div className="flex gap-5 items-center">
          <div className=" relative w-40 h-32 ">
            <Image
              fill
              alt={name}
              src={imageSrc(photo)}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <h1 className="font-D">
{name}
            </h1>
            <strong>
              {" "}
              • {quantity} pièce{quantity > 1 && "s"} * {price} DH
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Link
            className="border p-2 w-full rounded-lg text-center bg-gray-hover"
            href={"/cart"}
          >
            Consulter votre Panier
          </Link>
          <button
            onClick={onclick}
            className="w-full bg-second-hover  border p-2 rounded-lg text-center bg-second text-white"
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dialog;
