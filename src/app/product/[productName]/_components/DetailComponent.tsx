"use client";
import Icon from "@/components/IconComponent";
import clsx from "clsx";
import Image from "next/image";
import { CaretLeft, CaretRight } from "phosphor-react";
const CardColor = () => {
  return (
    <div className="flex items-center select-none rounded-xl p-2 font-A flex-col text-xs text-blk gap-y-1 border-2 border-main">
      <div className="w-full  flexCenter">
        <Image
          width={1000}
          height={1000}
          loading="lazy"
          src={"/pc.webp"}
          alt=""
          className="w-16 h-16 object-contain pointer-events-none rounded-md"
        />
      </div>
      <h3 className="font-semibold">Orange</h3>
      <p className="first-letter:uppercase ">à partir de </p>
      <span>10 990,00 Dh</span>
    </div>
  );
};
const description = ` Discover the iPhone 17, Apple’s latest innovation that pushes the limits of performance, photography, and design. Built with aerospace-grade materials and powered by the new A19 Bionic chip, it’s designed to deliver unmatched speed, efficiency, and intelligence.
  Key Features:
✦ Display: 6.3-inch Super Retina XDR OLED, 120 Hz ProMotion, Always-On display
✦ Processor: A19 Bionic chip — lightning-fast performance and improved energy efficiency
✦ Storage Options: 128 GB / 256 GB / 512 GB / 1 TB
✦ Camera System:
✦ Triple 48 MP Pro camera array
✦ Enhanced low-light performance
✦ 8K video recording with cinematic stabilization

🔋 Battery & Charging:
✦ All-day battery life — up to 25 hours of video playback
✦ MagSafe 3.0 wireless charging
✦ USB-C 45 W fast charging (50% in 20 minutes)

🧠 Smart Features:
✦iOS 19 with AI-powered “Smart Assist”
✦Face ID 2.0 with under-display sensors
✦Satellite connectivity for emergency calls

🌈 Design & Build:
✦Slimmer titanium frame with scratch-resistant glass
✦Available in: Midnight Black, Silver Mist, Ocean Blue, Rose Titanium
`;
const IconTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex py-5 items-center gap-x-3 font-A">
      <span className="text-5xl">
        <Icon name="Truck" />
      </span>
      <div className="flex flex-col gap-y-1">
        <h1>Livraison à domicile</h1>
        {children}
      </div>
    </div>
  );
};
const DetailComponent = () => {
  return (
    <div className="p-padding lg:px-paddingPC ">
      <div className="kinatech-container">
        <div className="flex gap-10 flex-col lg:flex-row ">
          <div className="lg:sticky top-20 w-full">
            <div className=" w-full flex flex-col lg:flex-row-reverse  items-center  relative lg:h-[400px]   border  rounded-xl ">
              <div className=" w-full h-full ">
                <div className="w-full  bg-white border border-x-0 lg:border-r rounded-br-none rounded-bl-none rounded-xl md:h-full overflow-hidden relative ">
                  <Image
                    width={1000}
                    height={1000}
                    loading="lazy"
                    src={"/imagetest.png"}
                    alt="s"
                    className="w-full p-padding h-full object-contain  pointer-events-none rounded-md"
                  />
                  {/* Arrow */}
                  <button className="absolute text-xl top-1/2 -translate-y-1/2 right-2 bg-main p-2 text-white rounded-full bg-main-hover scale-minus-hover">
                    <CaretRight />
                  </button>
                  <button className="absolute top-1/2 -translate-y-1/2 left-2 bg-main p-2 text-white rounded-full bg-main-hover scale-minus-hover">
                    <CaretLeft />
                  </button>
                </div>

                <span className="bg-[red] font-A animate-bounce text-white p-2  absolute top-2 right-2 rounded-xl">
                  Promo -20%
                </span>
              </div>
              <div className="flex  lg:flex-col gap-3 flexCenter p-1 ">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      index == 0 && "border-main opacity-[1]",
                      "w-12 opacity-[0.5] bg-white h-12 border border-r   p-1 flexCenter md:w-14 md:h-14 lg:w-16 lg:h-16 "
                    )}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      loading="lazy"
                      src={"/imagetest.png"}
                      alt="s"
                      className="w-full  h-full object-cover pointer-events-none rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full font-A flex-col gap-y-5 flex">
            <div className="flex flex-col gap-y-1">
              <Image
                width={1000}
                height={1000}
                loading="lazy"
                src={"/i.png"}
                alt=""
                className="w-12 h-10 object-contain pointer-events-none rounded-md"
              />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Iphone 17 pro max 25G -8 rem Icloud
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
            <div className="flex flex-col gap-y-5">
              <h1 className="font-B font-medium text-grey">
                Choisissez votre Couleur
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3  gap-5">
                {[...Array(2)].map((_, index) => (
                  <CardColor />
                ))}
              </div>
            </div>
            <hr />
            {/* ICON TITLE */}
            <div>
              <IconTitle>
                <p className="text-second font-B">
                  {" "}
                  Nous ne sommes pas que virtuel.{" "}
                  <span className="text-second underline">
                    Voir la disponibilité en magasin
                  </span>
                </p>
              </IconTitle>
              <hr />
              <IconTitle>
                <p className="text-main font-B">
                  dès dimanche 19 octobre -{" "}
                  <span className="text-second font-semibold">Offerte</span>
                </p>
              </IconTitle>
            </div>

            {/* SUMMART */}
            <div className="flex flex-col gap-y-3 bg-[#f4f4f4] p-3 rounded-2xl">
              <div className="flex  flex-col">
                <div className="flex flex-col gap-y-2">
                  <h1 className="font-semibold text-lg">Apple iphone 16</h1>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-grey">Teal</span>

                  <span>10 990,00DH</span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>
              <div className="flex  justify-between items-center text-lg font-bold text-gray-900">
                <span className="uppercase font-bold text-xl">Total</span>
                <div>
                  <p className="font-B text-2xl">10 990,00DH</p>
                  <p className="text-xs font-normal text-gray-500 text-right">
                    Incluant TVA
                  </p>
                  
                </div>
             
              </div>
           <button className="text-white w-full kinatech-btn bg-main bg-main-hover">
<span className="text-2xl">            <Icon name="ShoppingBag"/>
</span>
Ajouter au panier
           </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailComponent;
