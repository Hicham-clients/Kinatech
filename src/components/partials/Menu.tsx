"use client";
import Link from "next/link";
import Icon from "../IconComponent";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Category,
  Product,
  useMenuCategories,
} from "@/hooks/useMenuCategories";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useProductsSearch } from "@/hooks/useProductSearch";
import { imageSrc } from "@/lib/getSrc";
import SearchMenuLoading from "@/skeletons/searchMenu";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import * as PhosphorIcons from "phosphor-react";
import Refetch from "../Refetch";

const SearchInput = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);
  //debounced Value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const { data, error, isLoading, refetch } = useProductsSearch(
    debouncedValue.trim()
  );
  useEffect(() => {
    if (value.trim() == "") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [value]);
  useEffect(() => {
    if (value) {
      router.push("?q=" + debouncedValue);
    }
  }, [debouncedValue, router, value]);
  useEffect(() => {
    setValue("");
  }, [pathName]);
  return (
    <div className="py-3 relative">
      <div className="w-full relative rounded-lg overflow-hidden z-[99]">
        <input
          onChange={(e) => {
            setValue(e?.target?.value);
          }}
          className="w-full pr-12 h-12 p-2 outline-none text-black placeholder:text-grey placeholder:tracking-wide placeholder:text-sm"
          type="search"
          placeholder="Rechercher une marque ,un produit..."
        />
        <button className="absolute right-1 rounded-lg bg-second h-[80%] w-10 flex top-1/2 -translate-y-1/2 justify-center items-center text-xl bg-second-hover">
          <Icon name="MagnifyingGlass" weight="regular" />
        </button>
      </div>
      {value.trim() !== "" && (
        <>
          <div
            onClick={() => {
              setValue("");
            }}
            className="bg-black/50 fixed top-0 left-0 w-full h-screen z-50"
          />
          <div className="bg-white  p-padding  absolute rounded-b-xl top-full z-50 h-fit max-h-[20rem]  lg:max-h-[30rem] overflow-y-auto left-0 w-full">
            <div
              className={clsx(
                !isLoading && (data ?? [])?.length == 0 ? "block" : "grid",
                " md:grid-cols-2 gap-5"
              )}
            >
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <SearchMenuLoading key={index} />
                ))
              ) : (data ?? [])?.length > 0 ? (
                data?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.url}`}
                    className="flex border-b p-1  text-blk text-main-hover items-center gap-x-5 font-A"
                  >
                    <div className=" w-[30%] h-full">
                      <Image
                        loading="lazy"
                        src={imageSrc(item.photo)}
                        height={1000}
                        width={1000}
                        className="w-full h-full object-contain p-1 "
                        alt={item.slug}
                      />
                    </div>
                    <div className="w-full flex flex-col text-sm">
                      <h1 className="font-D ">{item.slug}</h1>
                      <span className="text-grey text-sm capitalize">
                        {item.category.name}
                      </span>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-D text-blk ">
                          {item.promo !== null
                            ? +item.base_price -
                              +item.base_price * (+item.promo.discount / 100)
                            : item.base_price}{" "}
                          DH
                        </span>
                        {item.promo !== null && (
                          <span className="text-[red]">
                            {" "}
                            <del>{item.base_price}</del> dh
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              ) : error ? (
                <Refetch onclick={refetch} />
              ) : (
                <div className="text-blk font-A tracking-wider text-sm flex justify-center items-center  w-full ">
                  Aucun Resultat
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const NavbarPhone = () => {
  const navLinks: { url: string; icon: keyof typeof PhosphorIcons }[] = [
    {
      url: "/",
      icon: "House",
    },
    {
      url: "/products_categories",
      icon: "SquaresFour",
    },
    {
      url: "/cart",
      icon: "Bag",
    },
    {
      url: `https://wa.me/212661613561?text=${encodeURIComponent(
        "Bonjour KINATECH,"
      )}`,
      icon: "WhatsappLogo",
    },
  ];
  const pathName = usePathname();

  return (
    <div className="sm:hidden fixed bottom-0  w-full left-0 z-[999] rounded-t-3xl border border-gray-300">
      <div className="flex p-2 justify-around gap-x-5 bg-white rounded-t-3xl mx-auto">
        {navLinks.map((item, index) => {
          return (
            <Link
              key={index}
              className={clsx(
                pathName == item.url && "bg-main text-white",
                "text-3xl text-blk p-3  scale-minus- text-white-hover bg-maincolor-hover rounded-full"
              )}
              href={item.url}
            >
              <Icon name={item.icon} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Menu = () => {
  // hover category
  const [Itemhover, setItemhover] = useState<number | null>(null);
  const [isHover, setIshover] = useState(false);

  // fetch data
  const { data } = useMenuCategories();

  const currentCategoryData = useMemo(() => {
    if (Itemhover !== null) {
      return data?.find((item) => item?.id == Itemhover);
    }
    return null;
  }, [Itemhover, data]);

  // sidebar toggle
  const [showSide, setShowSide] = useState<boolean>(false);
  const ToggleSide = (value: boolean) => setShowSide(value);

  // navbar fixed
  const Navref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handlScroll = () => {
      if (Navref.current) {
        Navref.current.style.position =
          window.scrollY > 90 ? "fixed" : "static";
      }
    };
    window.addEventListener("scroll", handlScroll);
    return () => window.removeEventListener("scroll", handlScroll);
  }, []);

  const [currentCategoriesForDrilling, setCurrentCategoriesForDrilling] =
    useState<Category[]>(data ?? []);
  useEffect(() => {
    if (data && data.length > 0) {
      setCurrentCategoriesForDrilling(data);
    }
  }, [data]);
  const [history, setHistory] = useState<Category[][]>([]);
  // Function to go inside the selected category
  const handleClick = (category: Category) => {
    if (category.childrens && category.childrens.length > 0) {
      // Save current level in history
      setHistory((prev) => [...prev, currentCategoriesForDrilling]);
      // Go to children level
      setCurrentCategoriesForDrilling(category.childrens);
    }
  };

  //  Back button
  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setCurrentCategoriesForDrilling(prev);
      setHistory((prev) => prev.slice(0, -1));
    }
  };
  //get count of cart items
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <nav className="font-B select-none text-white">
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
              <Link
                href={"/"}
                className="text-4xl tracking-wide font-C lg:text-5xl"
              >
                <Image
                  height={1000}
                  className="w-20 h-20 pointer-events-none object-contain"
                  width={1000}
                  alt="KINATECH"
                  src={"/images/kinatech/logo2.webp"}
                />
              </Link>
            </div>
            <div className="hidden lg:block w-1/2">
              <SearchInput />
            </div>
            <div className="flexCenter relative">
              <Link href={"/cart"} className="text-4xl text-white-hover">
                <Icon name="ShoppingBag" />
              </Link>

              <span className="bg-second absolute -top-2 -left-2 rounded-full h-5 w-5 p-3 text-xs flexCenter bg-second-hover">
                {cart ? (cart?.length < 100 ? cart?.length : "+99") : "0"}
              </span>
            </div>
          </div>
          <div className="lg:hidden">
            <SearchInput />
          </div>
        </div>
      </div>

      <div ref={Navref} className=" w-full z-40 top-0">
        <div className=" text-blk bg-white relative border-b py-3 hidden lg:flex">
          {(data ?? []).length > 0 ? (
            <ul className="flex justify-between px-paddingPC w-full items-center kinatech-container">
              {data?.map((item) => (
                <li key={item.id} className="text-sm underline-hover">
                  <Link
                    className="py-6 "
                    onMouseEnter={() => {
                      setItemhover(item.id);
                      setIshover(true);
                    }}
                    onMouseLeave={() => setIshover(false)}
                    href={`/products_categories?category=${item.url}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="h-10 bg-grey w-[0.05rem]" />
              <li className="text-sm underline-hover">
                <Link href={"/products_categories"}>Tous nos produits</Link>
              </li>
            </ul>
          ) : (
            <div className="py-5" />
          )}

          {isHover && currentCategoryData && (
            <div
              onMouseEnter={() => setIshover(true)}
              onMouseLeave={() => {
                setIshover(false);
                setItemhover(null);
              }}
              className="absolute z-50 text-blk bg-white border-t border-b  top-full left-0 w-full overflow-auto h-[350px] flex justify-center gap-x-24 p-padding"
            >
              {/* Parent Products */}
              {(currentCategoryData.products ?? []).length > 0 && (
                <div className="flex flex-col gap-y-5">
                  <h1 className="text-grey tracking-wide capitalize">
                    {currentCategoryData.name}
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    {currentCategoryData.products?.map((pro) => (
                      <Link
                        key={pro.id}
                        className="font-B tracking-wide text-main-hover block font-bold text-2xl"
                        href={`/products/${pro.url}`}
                      >
                        {pro.slug}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Children Categories */}
              {currentCategoryData.childrens?.map((child: Category) => (
                <div className="flex flex-col gap-y-5" key={child.id}>
                  <h1 className="text-grey tracking-wide capitalize">
                    {child.name}
                  </h1>
                  {(child.products ?? []).length > 0 && (
                    <div className="flex flex-col gap-y-2">
                      {child.products?.map((pro: Product) => (
                        <Link
                          key={pro.id}
                          className="text-main-hover block text-sm"
                          href={`/products/${pro.url}`}
                        >
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
          <>
            <div
              onClick={() => setShowSide(false)}
              className="bg-black/60 z-[99999999999999] w-full fixed top-0 left-0 h-screen "
            />

            <motion.div
              initial={{ x: "-90%" }}
              exit={{ x: "-90%", opacity: 0 }}
              animate={{ x: "0%" }}
              className="bg-blk select-none z-[99999999999999] fixed top-0 left-0 w-2/3 h-screen overflow-y-auto lg:hidden "
            >
              <div className="py-7 px-padding sticky left-0 bg-main top-0">
                <button
                  onClick={() => ToggleSide(false)}
                  className="text-4xl text-white-hover"
                >
                  <Icon name="X" />
                </button>
              </div>
              <div>
                <div className="bg-main px-padding">
                  <Link
                    href={"products_categories?brand=samsung"}
                    className="py-padding text-white-hover uppercase tracking-wide flex items-center gap-x-5"
                  >
                    <span className="text-4xl">
                      <Icon name="AppleLogo" />
                    </span>
                    <span className="underline-hover"> Nos Marques</span>
                  </Link>
                  <hr />
                  <Link
                    href={"/products_categories"}
                    className="py-padding text-white-hover uppercase tracking-wide flex items-center gap-x-5"
                  >
                    <span className="text-4xl">
                      <Icon name="Storefront" />
                    </span>
                    <span className="underline-hover">Tous Nos Produits</span>
                  </Link>
                </div>
                <div className="p-5">
                  {history.length > 0 && (
                    <button className="my-5 text-xl" onClick={handleBack}>
                      <Icon name="ArrowLeft" />
                    </button>
                  )}

                  <h1 className="cursor-context-menu tracking-wider font-D text-main">
                    Choisir par catégorie
                  </h1>
                  <ul className="py-padding flex flex-col gap-y-2 tracking-wide">
                    {currentCategoriesForDrilling.length > 0 &&
                      currentCategoriesForDrilling.map((item, index) => (
                        <li
                          key={index}
                          className="cursor-pointer text-white-hover capitalize flex justify-between items-center"
                        >
                          <Link
                            className="min-w-fit  text-sm "
                            href={`/products_categories?category=${item.url}`}
                          >
                            {item.name}
                          </Link>
                          {(item?.childrens ?? []).length > 0 && (
                            <span
                              className="text-xl  w-full flex justify-end"
                              onClick={() => handleClick(item)}
                            >
                              <Icon name="CaretRight" />
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* {navbar phone} */}
      <NavbarPhone />
    </nav>
  );
};

export default Menu;
