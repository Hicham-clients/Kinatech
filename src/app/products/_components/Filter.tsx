"use client";
import { Category, useMenuCategories } from "@/hooks/useMenuCategories";
import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft, CaretRight, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
const Filter = () => {
  // fetch data
  const { data, isLoading } = useMenuCategories();

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

  return (
    <div className="w-full p-3 bg-white h-[350px] overflow-y-auto rounded-2xl overflow-hidden lg:w-1/2 font-A">
      <div className="flex flex-col gap-3 ">
        <div className="flex relative flex-col gap-y-1 rounded-lg overflow-hidden">
          <input
            placeholder="Rechercher"
            name="name"
            className={clsx("form-input ring-red")}
            maxLength={30}
            type="text"
          />
          <span className="absolute right-1 h-[95%] top-1/2 -translate-y-1/2 w-10 flexCenter bg-white">
            <MagnifyingGlass size={"1rem"} weight="regular" />
          </span>
        </div>
        <div className="h-full">
          {isLoading ? (
            <div className="bg-gray-200 animate-pulse w-full h-[200px] rounded-xl"></div>
          ) : (
            (data ?? []).length > 0 && (
              <div className="bg-gray-100 p-padding rounded-xl cursor-pointer flex flex-col gap-y-5 h-full">
                <h1 className="font-A font-semibold">Catégories</h1>
                {/* CATEGORIES */}
                {history.length > 0 && (
                  <button
                    className=" text-sm bg-main w-fit p-1 rounded-full bg-main-hover scale-minus-hover"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="text-white" />
                  </button>
                )}

                <ul className="px-padding flex flex-col gap-y-2">
                  {currentCategoriesForDrilling.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="flex text-black-hover items-center justify-between text-sm text-grey"
                      >
                        <Link href={`/products/${item.url}`}>{item.name}</Link>
                        {(item?.childrens ?? []).length > 0 && (
                          <span
                            className="w-full flex justify-end"
                            onClick={() => handleClick(item)}
                          >
                            <CaretRight weight="bold" />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default Filter;
