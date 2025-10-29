"use client";
import { useBrands } from "@/hooks/useBrands";
import { Category, useMenuCategories } from "@/hooks/useMenuCategories";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CaretRight, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
const Filter = () => {
  // fetch data
  const { data, isLoading } = useMenuCategories();
  const {data:brands}=useBrands()
const router=useRouter()
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

  //filtring
  // search params  

  const searchParams=useSearchParams() 
  // useEffect(()=>{

  // },[value,router])
  return (
    <div className="select-none w-full md:w-1/2 p-3 bg-white h-[350px] overflow-y-auto rounded-2xl overflow-hidden lg:w-1/2 font-A lg:sticky top-20">
      <div className="flex flex-col gap-3 ">
        <div className="flex relative flex-col gap-y-1 rounded-lg overflow-hidden">
          <input 
          onChange={(e)=>{
 const params = new URLSearchParams(searchParams)
params.set("search",e.target.value) 
    router.push(`/products_categories?${params.toString()}`);

          }}
            placeholder="Rechercher"
            name="name"
            className={clsx("form-input ring-red")}
            maxLength={30}
            type="text"
          />
          <span className="absolute right-1 h-[95%] top-1/2 -translate-y-1/2 w-10 flexCenter bg-transparent">
            <MagnifyingGlass size={"1rem"} weight="regular" />
          </span>
        </div>
        {searchParams.toString().length>0&&<button
         
         onClick={()=>router.push('/products_categories')}
         className="text-sm underline-hover text-main-hover">Supprimer les filters</button>}
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
                        className="flex text-black-hover items-center justify-between text-sm text-blk"
                      >
                        <Link href={`/products_categories?category=${item.url}`}>{item.name}</Link>
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
    {(brands??[])?.length>0&&    <div className="flex flex-col gap-y-3 px-padding"> 
                          <h1 className="font-A font-semibold">Marques</h1>

                  <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{ 
                    
                    const params=new URLSearchParams(searchParams) 
                    params.set('brand',e.target.value) 
                    router.push(`/products_categories?${params.toString()}`)
                  }}  className="border w-full outline-none focus:ring-1 ring-main  p-2 rounded text-blk font-A mx-5" name="" id="">
                  <option value={""}  disabled >--Choisissez une marque--</option>
                    {brands?.map(item=><option key={item.id}      value={item.name}>{item.name}</option>)}
                    
                  </select>
                </div>}
      </div>
    </div>
  );
};
export default Filter;
