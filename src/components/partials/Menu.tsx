"use client";
import Link from "next/link";
import Icon from "../IconComponent";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { axiosInstance } from "@/lib/axios";

export interface Product {
  id: number;
  slug: string;
  category_id: number;
  all_quantity: number | string;
  Url: string;
}

export interface Category {
  id: number;
  name: string;
  id_parent: number | null;
  created_at: string | null;
  updated_at: string | null;
  products?: Product[];
  childrens?: Category[];
}

const SearchInput = () => {
  return (
    <div className="py-3">
      <div className="w-full relative rounded-lg overflow-hidden">
        <input
          className="w-full h-12 p-2 outline-none text-black placeholder:text-grey placeholder:tracking-wide placeholder:text-sm"
          type="search"
          placeholder="Rechercher une marque ,un produit..."
        />
        <button
          className="absolute right-1 rounded-lg bg-second h-[80%] w-10 flex top-1/2 -translate-y-1/2 justify-center items-center text-xl bg-second-hover"
        >
          <Icon name="MagnifyingGlass" weight="regular" />
        </button>
      </div>
    </div>
  );
};

const Menu = () => { 
  // hover category
  const [Itemhover, setItemhover] = useState<number | null>(null);
  const [isHover, setIshover] = useState(false);

  // fetch categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategoryData, setCurrentCategoryData] = useState<Category | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching categories");
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (Itemhover !== null) {
      const data = categories.find((item) => item.id === Itemhover) || null;
      setCurrentCategoryData(data);
    } else {
      setCurrentCategoryData(null);
    }
  }, [isHover, Itemhover, categories]);

  // sidebar toggle
  const [showSide, setShowSide] = useState<boolean>(false);
  const ToggleSide = (value: boolean) => setShowSide(value);

  // navbar fixed
  const Navref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handlScroll = () => {
      if (Navref.current) {
        Navref.current.style.position = window.scrollY > 168 ? "fixed" : "static";
      }
    };
    window.addEventListener("scroll", handlScroll);
    return () => window.removeEventListener("scroll", handlScroll);
  }, []);

  return (
    <nav className="font-B text-white">
      <div className="bg-main w-full p-padding lg:p-0 lg:px-paddingPC">
        <div className="kinatech-container flex flex-col gap-y-5">
          <div className="flex justify-between items-center py-3">
            <button
              onClick={() => ToggleSide(true)}
              className="text-4xl lg:hidden text-white-hover"
            >
              <Icon name="List" />
            </button>
            <div>
              <Link href={"/"} className="text-4xl tracking-wide font-C lg:text-5xl">
                Kinatech
              </Link>
            </div>
            <div className="hidden lg:block w-1/2">
              <SearchInput />
            </div>
            <div className="flexCenter relative">
              <Link href={'/cart'} className="text-4xl text-white-hover">
                <Icon name="ShoppingBag" />
              </Link>
              <span className="bg-second absolute -top-2 -left-2 rounded-full h-5 w-5 p-3 text-xs flexCenter bg-second-hover">
                9
              </span>
            </div>
          </div>
          <div className="lg:hidden">
            <SearchInput />
          </div>
        </div>
      </div>

      <div ref={Navref} className="w-full z-40 top-0">
        <div className="text-blk bg-white relative border-b py-3 hidden lg:flex">
        {categories.length>0?  <ul className="flex justify-between px-paddingPC w-full items-center kinatech-container">
            {categories.map((item) => (
              <li key={item.id} className="text-sm underline-hover">
                <Link 
                  className="py-6"
                  onMouseEnter={() => { setItemhover(item.id); setIshover(true); }}
                  onMouseLeave={() => setIshover(false)}
                  href={""}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="h-10 bg-grey w-[0.05rem]" />
            <li className="text-sm underline-hover">
              <Link href={"/products"}>Tous nos produits</Link>
            </li>
          </ul>:<div className="py-5"/>}

          {isHover && currentCategoryData && (
            <div
              onMouseEnter={() => setIshover(true)}
              onMouseLeave={() => { setIshover(false); setItemhover(null); }}
              className="absolute z-50 text-blk bg-white border-t shadow-xl shadow-[#eee] top-full left-0 w-full overflow-auto h-[350px] flex justify-center gap-x-24 p-padding"
            >
              {/* Parent Products */}
              {(currentCategoryData.products ?? []).length > 0 && (
                <div className="flex flex-col gap-y-5">
                  <h1 className="text-grey tracking-wide capitalize">{currentCategoryData.name}</h1>
                  <div className="flex flex-col gap-y-2">
                    {currentCategoryData.products?.map((pro) => (
                      <Link
                        key={pro.id}
                        className="font-B tracking-wide text-main-hover block font-bold text-2xl"
                        href={""}
                      >
                        {pro.slug}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Children Categories */}
              {currentCategoryData.childrens?.map((child) => (
                <div className="flex flex-col gap-y-5" key={child.id}>
                  <h1 className="text-grey tracking-wide capitalize">{child.name}</h1>
                  {(child.products ?? []).length > 0 && (
                    <div className="flex flex-col gap-y-2">
                      {child.products?.map((pro) => (
                        <Link key={pro.id} className="text-main-hover block text-sm" href={""}>
                          {pro.slug}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* side bar */}
      <AnimatePresence>
        {showSide && (
          <motion.div
            initial={{ x: "-90%" }}
            exit={{ x: "-90%", opacity: 0 }}
            animate={{ x: "0%" }}
            className="bg-blk z-[999999999] fixed top-0 left-0 w-2/3 h-screen overflow-y-auto lg:hidden"
          >
            <div className="py-7 px-padding sticky left-0 bg-main top-0">
              <button onClick={() => ToggleSide(false)} className="text-4xl text-white-hover">
                <Icon name="X" />
              </button>
            </div>
            <div>
              <div className="bg-main px-padding">
                <Link
                  href={""}
                  className="py-padding text-white-hover uppercase tracking-wide flex items-center gap-x-5"
                >
                  <span className="text-4xl"><Icon name="TrademarkRegistered" /></span>
                  <span className="underline-hover"> Nos Marques</span>
                </Link>
                <hr />
                <Link
                  href={"/products"}
                  className="py-padding text-white-hover uppercase tracking-wide flex items-center gap-x-5"
                >
                  <span className="text-4xl"><Icon name="Storefront" /></span>
                  <span className="underline-hover">Tous Nos Produits</span>
                </Link>
              </div>
              <div className="p-5">
                <h1 className="cursor-context-menu tracking-wider">Choisir par catégorie</h1>
                <ul className="py-padding flex flex-col gap-y-2 tracking-wide">
                  {["ordinateurs", "monteurs"].map((item, index) => (
                    <li key={index} className="cursor-pointer text-white-hover capitalize flex justify-between items-center">
                      <span>{item}</span>
                      <span className="text-xl"><Icon name="CaretRight" /></span>
                    </li>
                  ))}
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
