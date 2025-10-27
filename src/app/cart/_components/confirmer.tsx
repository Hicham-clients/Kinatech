import Icon from "@/components/IconComponent"

const Confirmer = ({name,onclick,confirmer}:{confirmer:()=>void,name:string,onclick:()=>void}) => {
  return (
<div onClick={onclick}  className="select-none fixed top-0 left-0 w-full h-svh bg-black/40 z-[9999] font-A">
<div className="bg-white rounded-xl fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] lg:w-1/2 min-h-56 p-padding flex flex-col justify-between gap-5">
<div className="flex items-center justify-between">
    <h1 className="text-3xl font-D">Retirer l'article du panier</h1>
<span onClick={onclick} className="text-2xl cursor-pointer scale-minus-hover self-start"><Icon name="X"/>
</span>
</div>

<div className="flex gap-5 items-center">
   
  <p className="font-B text-xl text-grey">Vous êtes sur le point de retirer <strong className="text-blk">"{name}"</strong>
   {' '}de votre panier. Êtes-vous sûr de vouloir continuer avec cette sélection?
  </p>
</div> 

<div className="flex items-center gap-5">
    <button onClick={onclick} className="border p-2 w-full rounded-lg text-center bg-gray-hover" >Non</button>
    <button onClick={confirmer} className="w-full bg-main-hover  border p-2 rounded-lg text-center bg-main text-white">Oui</button>
</div>
</div>

    </div>  )
}
export default Confirmer