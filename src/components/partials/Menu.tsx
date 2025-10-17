"use client";
import Link from "next/link";
import Icon from "../IconComponent";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const data = {
  parent: "phones & tablete",
  products: ["Téléphone Samsung Galaxy", "Iphone 17 Pro", "rrrrrrrr", "22222"],
  childrens: [
    {
      categorie: "phones",
      products: [
        "phone 17 pro max",
        "phone 17",
        "phone 17 mini",
        "phone 16 pro",
        "phone 16",
        "phone 16 lite",
        "phone 15 pro max",
        "phone 15",
        "phone 15 mini",
      ],
    },
    {
      categorie: "phones",
      products: [
        "phone 17 pro max",
        "phone 17",
        "phone 17 mini",
        "phone 16 pro",
        "phone 16",
        "phone 16 lite",
        "phone 15 pro max",
        "phone 15",
        "phone 15 mini",
      ],
    },
    {
      categorie: "phones",
      products: [
        "phone 17 pro max",
        "phone 17",
        "phone 17 mini",
        "phone 16 pro",
        "phone 16",
        "phone 16 lite",
        "phone 15 pro max",
        "phone 15",
        "phone 15 mini",
      ],
    },
    {
      categorie: "phones",
      products: [
        "phone 17 pro max",
        "phone 17",
        "phone 17 mini",
        "phone 16 pro",
        "phone 16",
        "phone 16 lite",
        "phone 15 pro max",
        "phone 15",
        "phone 15 mini",
      ],
    },
  ],
};
const SearchInput = () => {
  return (
    <div className="py-3">
      <div className="w-full  relative rounded-lg overflow-hidden">
        <input
          className="w-full h-12 p-2 outline-none text-black placeholder:text-grey placeholder:tracking-wide placeholder:text-sm"
          type="search"
          placeholder="Rechercher une marque ,un produit..."
        />
        <button
          className="absolute right-1 rounded-lg bg-second h-[80%] w-10 flex top-1/2 -translate-y-1/2 justify-center items-center text-xl 
                        bg-second-hover"
        >
          <Icon name="MagnifyingGlass" weight="regular" />
        </button>
      </div>
    </div>
  );
};
const Menu = () => {
  const [showSide, setShowSide] = useState<boolean>(false);
  // function toggle display side bar
  const ToggleSide = (value: boolean) => {
    setShowSide(value);
  };
  //make catgeorie navbar fixed
  const Navref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handlScroll = () => {
      if (Navref.current) {
        if (window.scrollY > 168) {
          Navref.current.style.position = "fixed";
        } else {
          Navref.current.style.position = "static";
        }
      }
    };
    window.addEventListener("scroll", handlScroll);
    return () => window.removeEventListener("scroll", handlScroll);
  }, []);
  //hover category
  const [Itemhover, setItemhover] = useState(null);
  const [isHover, setIshover] = useState(false);
  return (
    <nav className="  font-B text-white  ">
      <div className="bg-main w-full p-padding lg:p-0 lg:px-paddingPC">
        <div className=" kinatech-container flex flex-col gap-y-5  ">
          <div
            className=" flex justify-between items-center py-3
       
        "
          >
            <button
              onClick={() => ToggleSide(true)}
              className="text-4xl
               lg:hidden
            text-white-hover
            "
            >
              <Icon name="List" />
            </button>
            <div>
              <Link
                href={"/"}
                className="text-4xl tracking-wide font-C lg:text-5xl"
              >
                Kinatech
              </Link>
            </div>
            <div className="hidden lg:block w-1/2">
              <SearchInput />
            </div>
            <div className=" flexCenter relative">
              <Link 
              href={'/cart'}
                className="text-4xl
                        text-white-hover

            "
              >
                <Icon name="ShoppingBag" />
              </Link>
              <span
                className="bg-second absolute -top-2 -left-2  rounded-full h-5 w-5 p-3 text-xs  flexCenter
            bg-second-hover
            "
              >
                9
              </span>
            </div>
          </div>

          <div className="lg:hidden">
            <SearchInput />
          </div>
        </div>
      </div>
      <div ref={Navref} className=" w-full z-40 top-0">
        <div className="text-blk bg-white relative  border-b py-3 hidden lg:flex ">
          <ul className="flex justify-between px-paddingPC w-full items-center kinatech-container ">
            {[...Array(6)].map((item, index) => (
              <li key={index} className="text-sm underline-hover">
                <Link 
                className="py-6"
                  onMouseEnter={() => {setItemhover(item)
                    setIshover(true)
                  }}  
                   onMouseLeave={() => {
                    setIshover(false)
                  }}
                  href={""}
                >
                  Smartphones
                </Link>
              </li>
            ))}

            <li className="h-10 bg-grey w-[0.05rem] " />
            <li className="text-sm underline-hover">
              <Link href={"/products"}>Tous nos produits</Link>
            </li>
          </ul>
          {isHover && (
            <div
              onMouseEnter={() => setIshover(true)}
              onMouseLeave={() => {
                setIshover(false);

                setItemhover(null);
              }}
              className="absolute z-50 text-blk bg-white border-t  shadow-xl shadow-[#eee] top-full left-0 w-full overflow-auto h-[350px] flex justify-center gap-x-24 p-padding"
            >
              {
                <div className="flex flex-col gap-y-5">
                  <h1 className="text-grey tracking-wide capitalize ">
                    {data.parent}
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    {data.products.map((pro, i) => {
                      return (
                        <Link
                          className="font-B tracking-wide text-main-hover block font-bold  text-2xl "
                          key={i}
                          href={""}
                        >
                          {pro}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              }

              {data.childrens.map((item, index) => {
                return (
                  <div className="flex flex-col gap-y-5" key={index}>
                    <h1 className="text-grey tracking-wide capitalize ">
                      {item.categorie}
                    </h1>
                  <div className="flex flex-col gap-y-2">
                      {item.products.map((pro, i) => {
                        return (
                          <Link
                            className="text-main-hover block text-sm"
                            key={i}
                            href={""}
                          >
                            {pro}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* side bar*/}
      <AnimatePresence>
        {showSide && (
          <motion.div
            initial={{ x: "-90%" }}
            exit={{ x: "-90%", opacity: 0 }}
            animate={{ x: "0%" }}
            className="bg-blk z-[999999999]  fixed top-0 left-0 w-2/3 h-screen overflow-y-auto 
     lg:hidden
     "
          >
            <div className="py-7 px-padding sticky left-0   bg-main top-0  ">
              <button
                onClick={() => ToggleSide(false)}
                className="text-4xl
            text-white-hover
            "
              >
                <Icon name="X" />
              </button>
            </div>
            <div>
              <div className="bg-main px-padding ">
                <Link
                  href={""}
                  className=" py-padding text-white-hover  uppercase tracking-wide flex  items-center  gap-x-5"
                >
                  <span className="text-4xl">
                    {" "}
                    <Icon name="TrademarkRegistered" />
                  </span>
                  <span className="underline-hover"> Nos Marques</span>
                </Link>
                <hr />
                <Link
                  href={"/products"}
                  className=" py-padding text-white-hover  uppercase tracking-wide flex  items-center gap-x-5"
                >
                  <span className="text-4xl">
                    {" "}
                    <Icon name="Storefront" />
                  </span>
                  <span className="underline-hover">Tous Nos Produits</span>
                </Link>
              </div>
              <div className="p-5">
                <h1 className="cursor-context-menu tracking-wider ">
                  Choisir par catégorie
                </h1>
                <ul className="py-padding flex flex-col gap-y-2 tracking-wide ">
                  {["ordinateurs", "monteurs"].map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="cursor-pointer text-white-hover capitalize flex justify-between items-center"
                      >
                        <span>{item}</span>
                        <span className="text-xl">
                          {" "}
                          <Icon name="CaretRight" />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Menu;
