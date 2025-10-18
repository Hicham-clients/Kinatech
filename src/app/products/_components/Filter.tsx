"use client";
import Icon from "@/components/IconComponent";
import clsx from "clsx";
import Link from "next/link";
import { CaretRight, MagnifyingGlass } from "phosphor-react";
Link;
const Filter = () => {
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
          <div className="bg-gray-100 p-padding rounded-xl cursor-pointer flex flex-col gap-y-5 h-full">
            <h1 className="font-A font-semibold">Catégorie</h1>
            {/* CATEGORIES */}
            <ul className="px-padding">
              <li className="flex text-black-hover items-center justify-between text-sm text-grey">
                <Link href={"/"}>Ordinateurs</Link>
                <span>
                  <CaretRight 

weight="bold"
/>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filter;
