import { Metadata } from "next"
import CheckoutComponent from "../_components/Checkout"
export const metadata:Metadata={
  title:{
    template:"%s | Validation de la commande",
    default:"Validation de la commande"
  },
  robots:{index:false,follow:false}
}
const Checkout = () => {
  return (
<CheckoutComponent/>
  )
}
export default Checkout