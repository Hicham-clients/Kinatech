"use client";
import Icon from "@/components/IconComponent";
import { Color, Product, Variant } from "@/hooks/useDetail";
import { imageSrc } from "@/lib/getSrc";
import clsx from "clsx";
import Image from "next/image";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import * as PhosphorIcons from "phosphor-react";
import { calculNewPrice } from "@/functions/Discount";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { hiddenDialog, setInCart } from "@/store/productSlice";
import Link from "next/link";
import Dialog from "@/app/cart/_components/dialog";
const CardVariantItem = ({
  id,
  quantity,
  price,
  capacity,
  ram,
  onClick,
  currentId,
  discount,
}: Variant & {
  onClick: () => void;
  currentId: number;
  discount: string | null;
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        currentId == id && "border-main",
        quantity == 0 && "opacity-[0.2]",
        " font-A border-2 select-none justify-center items-center rounded-xl p-5  flex  bg-gray-hover cursor-pointer flex-col "
      )}
    >
      <h1 className="font-semibold text-sm">
        {capacity} | {ram}a
      </h1>
      <span className="text-sm">
        {discount != null ? calculNewPrice(+discount, +price) : price} Dh
      </span>
    </div>
  );
};
const CardColor = ({
  name,
  image,
  price,
  current,
  id,
  discount,
  onClick,
}: {
  name: string;
  image: string;
  price: string;
  current: number | null;
  id: number;
  discount: string | null;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        current == id && "border-main",
        "flex items-center bg-gray-hover cursor-pointer select-none rounded-xl p-2 font-A flex-col text-xs text-blk gap-y-1 border-2"
      )}
    >
      <div className="w-full  flexCenter">
        <Image
          loading="lazy"
          width={1000}
          height={1000}
          src={imageSrc(image)}
          alt={name}
          className="w-16 h-16 object-contain pointer-events-none rounded-md"
        />
      </div>
      <h3 className="font-semibold">{name}</h3>
      <p className="first-letter:uppercase ">à partir de </p>
      <span>
        {discount != null ? calculNewPrice(+discount, +price) : price}
        Dh
      </span>
    </div>
  );
};

const IconTitle = ({
  children,
  title,
  icon,
}: {
  title: string;
  icon: keyof typeof PhosphorIcons;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex py-5 items-center gap-x-3 font-A">
      <span className="text-5xl">
        <Icon name={icon} />
      </span>
      <div className="flex flex-col gap-y-1">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};
const DetailComponent = ({
  slug,

  allQ,
  photo,
  description,
  base_price,
  // category,
  brand_name,
  brand_logo,
  discount,
  colors,
  url
}: Product) => {
  const [currentVariant, setCurrentVariant] = useState<null | Variant>(null);
  const [currentColor, setCurrentColor] = useState<null | Color>(
    colors[0] ?? null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  //set default variant
  useEffect(() => {
    if (currentColor) {
      setCurrentVariant(currentColor?.variants[0]);
    }
  }, [currentColor]);
  //REDUX TOOLKIT
  const dispatch = useDispatch();
  const { cart ,dialog} = useSelector((state: RootState) => state.cart);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <div
      className={clsx(
        +allQ == 0 && "opacity-[0.5]",
        currentVariant?.quantity == 0 || (!currentVariant && "opacity-[0.5]"),
        "p-padding lg:px-paddingPC pb-32 "
      )}
    >
      { dialog.show&&dialog.product &&<Dialog name={dialog?.product?.name} photo={dialog?.product?.photo} price={dialog?.product?.price.toString()} quantity={dialog?.product?.quantity}    onclick={()=>dispatch(hiddenDialog())}/>}
      <div className="kinatech-container">
        <div className="flex gap-10 flex-col lg:flex-row ">
          <div className=" w-full">
            <div className="lg:sticky lg:top-20  w-full flex flex-col lg:flex-row-reverse  items-center  relative lg:h-[400px]   border  rounded-xl ">
              <div className=" w-full h-full ">
                <div className="w-full  bg-white border border-x-0 lg:border-r  rounded-br-none rounded-bl-none rounded-xl md:h-full overflow-hidden relative ">
                  <Image
                    loading="lazy"
                    width={1000}
                    height={1000}
                    src={imageSrc(currentColor?.images[currentIndex] || photo)}
                    alt={currentVariant?.name ?? slug ?? ""}
                    className="w-full p-padding h-full object-contain  pointer-events-none rounded-md"
                  />
                  {/* Arrow */}
                  <>
                    {currentIndex < (currentColor?.images ?? []).length - 1 && (
                      <button
                        onClick={() => setCurrentIndex((p) => p + 1)}
                        className="absolute text-xl top-1/2 -translate-y-1/2 right-2 bg-main p-2 text-white rounded-full bg-main-hover scale-minus-hover"
                      >
                        <CaretRight />
                      </button>
                    )}
                    {currentIndex > 0 && (
                      <button
                        onClick={() => setCurrentIndex((p) => p - 1)}
                        className="absolute top-1/2 -translate-y-1/2 left-2 bg-main p-2 text-white rounded-full bg-main-hover scale-minus-hover"
                      >
                        <CaretLeft />
                      </button>
                    )}
                  </>
                </div>

                {discount !== null && +allQ > 0 && (
                  <span className="bg-[red] select-none font-A  text-white p-2  absolute top-2 right-2 rounded-xl">
                    Promo -{discount}%
                  </span>
                )}
              </div>
              {(currentColor?.images ?? []).length > 0 && (
                <div className="flex  lg:flex-col gap-3 flexCenter p-1 ">
                  {currentColor?.images.map((img, index) => (
                    <div
                      onClick={() => setCurrentIndex(index)}
                      key={index}
                      className={clsx(
                        index == currentIndex && "border-main opacity-[1]",
                        "w-12 cursor-pointer opacity-[0.5] bg-white h-12 border border-r   p-1 flexCenter md:w-14 md:h-14 lg:w-16 lg:h-16 "
                      )}
                    >
                      <Image
                        loading="lazy"
                        width={1000}
                        height={1000}
                        src={imageSrc(img)}
                        alt={slug}
                        className="w-full  h-full object-contain pointer-events-none rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full font-A flex-col gap-y-5 flex">
            {+allQ == 0 && (
              <h1 className="text-xl font-bold text-[red] font-B uppercase tracking-wider">
                pas disponible
              </h1>
            )}{" "}
            <div title={brand_name} className="flex flex-col gap-y-1">
              <Image
                loading="lazy"
                width={1000}
                height={1000}
                src={imageSrc(brand_logo)}
                alt={brand_name ?? "brand"}
                className="w-16 object-contain pointer-events-none rounded-md"
              />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-D">
                {currentVariant?.name || slug}
              </h1>
            </div>
            {/* {description} */}
            <div>
              <p className="whitespace-pre-line break-words font-A leading-relaxed tracking-wide ">
                {description}
              </p>
            </div>
            <hr />
            {/* couleurs */}
            {colors?.length > 0 && (
              <div className="flex flex-col gap-y-5">
                <h1 className="font-B font-medium text-grey">
                  Choisissez votre Couleur
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3  gap-5">
                  {colors?.map((color) => (
                    <CardColor
                      key={color.id}
                      onClick={() => setCurrentColor(color)}
                      current={currentColor?.id ?? null}
                      id={color.id}
                      discount={discount ?? null}
                      name={color.name}
                      price={base_price}
                      image={color.images[0]}
                    />
                  ))}
                </div>
              </div>
            )}
            <hr />
            {currentVariant?.capacity && (
              <>
                <div className="flex flex-col gap-y-5">
                  <h1 className="font-B font-medium text-grey">
                    Choisissez La capacité
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3  gap-5">
                    {currentColor?.variants?.map((variant, index) => (
                      <CardVariantItem
                        discount={discount || null}
                        onClick={() => setCurrentVariant(variant)}
                        {...variant}
                        key={index}
                        currentId={currentVariant.id}
                      />
                    ))}
                  </div>
                </div>
                <hr />
              </>
            )}
            {/* ICON TITLE */}
            <div
              className={clsx(currentVariant?.quantity == 0 && "opacity-[0.5]")}
            >
              <IconTitle title="Retirer en magasin" icon="Storefront">
                {currentVariant?.quantity ? (
                  <p className="text-second font-B">
                    Nous ne sommes pas que virtuel.{" "}
                    <a
                      href="https://www.google.com/maps/place/KINATECH+SARL/@33.6186172,-7.5354596,295m/data=!3m1!1e3!4m6!3m5!1s0xda7cc7b7692b1d9:0x171731cafac9b85a!8m2!3d33.618347!4d-7.5330215!16s%2Fg%2F1z44bmkvx?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      className="text-second font-semibold  underline-hover"
                    >
                      Voir la disponibilité en magasin
                    </a>
                  </p>
                ) : (
                  <span className="font-B text-[red]">Pas de Stock</span>
                )}
              </IconTitle>
              <hr />
              <IconTitle title="Livraison à domicile" icon="Truck">
                {currentVariant?.quantity ? (
                  <p className="text-main font-B"></p>
                ) : (
                  <span className="font-B text-[red]">Non disponible</span>
                )}
              </IconTitle>
            </div>
            {/* SUMMARy */}
            <div
              className={clsx(
                currentVariant?.quantity == 0 && "opacity-[0.5]",
                "flex flex-col gap-y-3 bg-[#f4f4f4] p-3 rounded-2xl"
              )}
            >
              <div className="flex  flex-col">
                <div className="flex flex-col gap-y-2">
                  <h1 className="font-D text-lg">
                    {currentVariant?.name || slug}
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm text-grey">
                      {currentColor?.name || ""}
                    </span>
                    {
                      <span className="text-sm text-grey">
                        {`${currentVariant?.capacity ?? ""}  ${
                          (currentVariant?.ram && "| " + currentVariant?.ram) ||
                          ""
                        }` || ""}
                      </span>
                    }
                  </div>

                  <span>
                    {discount != null && +allQ > 0
                      ? calculNewPrice(
                          +discount,
                          +(currentVariant?.price ?? base_price)
                        )
                      : currentVariant?.price || base_price}
                    DH
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>
              <div className="flex  justify-between items-center text-lg font-bold text-gray-900">
                <span className="uppercase font-bold text-xl">Total</span>
                <div>
                  <p className="font-B text-2xl">
                    {discount != null && +allQ > 0
                      ? calculNewPrice(
                          +discount,
                          +(currentVariant?.price ?? base_price)
                        )
                      : currentVariant?.price || base_price}
                    DH
                  </p>
                  {/* <p className="text-xs font-normal text-gray-500 text-right">
                    Incluant TVA
                  </p> */}
                </div>
              </div>
          {/* {cart.findIndex(item=>item.id==currentVariant?.id)==-1? */}
                <button
                onClick={() => {
                  if (currentColor && currentVariant) {
                    dispatch(
                      setInCart({
                        id: currentVariant?.id,
                        color: currentColor?.name,
                        photo: currentColor?.images[0],
                        max: currentVariant?.quantity,
                        name: currentVariant?.name,
                        capacity: currentVariant?.capacity,
                        price:discount!=null ?(calculNewPrice(+discount,+currentVariant?.price)):calculNewPrice(0,(+currentVariant?.price) ),
                        ram: currentVariant?.ram,
                        quantity: 1,
                        url:url,
                      })
                    );
                  } 
                }} 
                title={cart?.find(item=>item.id==currentVariant?.id)?.quantity===currentVariant?.quantity?"tu as atteint la quantité maximale disponible pour ce produit":''}
                disabled={currentVariant?.quantity==0 || +allQ == 0 || cart?.find(item=>item.id==currentVariant?.id)?.quantity==currentVariant?.quantity}
                className={clsx(
                  "bg-main-hover text-white w-full kinatech-btn bg-main "
                )}
              >
                <span className="text-2xl">
                  {" "}
                  <Icon name="ShoppingBag" />
                </span>
            Ajouter au panier
              </button>
            {/* //   :<Link href={'/cart'}
              
            //     className={clsx(
            //       "bg-second-hover text-white w-full kinatech-btn bg-second "
            //     )}
            //   >
              
              
            
            //     <span className="text-2xl">
            //       <Icon name="ArrowBendDownRight" />
            //     </span>
            // Consulter le panier
            //   </Link> */}
              {/* } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailComponent;
