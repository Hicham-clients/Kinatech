import { Metadata } from "next"
import CartComponent from "./_components/CartComponent"
export const metadata:Metadata={
  title:{
    template:"%s | Panier", 
    default:"Panier"
  }, 
  description:"Gérez facilement votre panier — ajoutez, modifiez ou supprimez vos produits avant de finaliser votre commande sur Kinatech.",
  // Un panier est propre à chaque visiteur : aucune valeur en SERP,
  // et il gaspille du budget de crawl.
  robots:{index:false,follow:true}
}
const Cart = () => {
  return (
  <CartComponent/>
  )
}
export default Cart