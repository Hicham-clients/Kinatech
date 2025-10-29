import { Metadata } from "next"
import ContactForm from "./_components/form"
export const metadata:Metadata={
  title:{
    template:"%s | Contactez-Nous", 
    default:"Contactez-Nous"
  }, 

  description:"Nous serions ravis d’avoir de vos nouvelles. Remplissez le formulaire ci‑dessous et nous vous répondrons dès que possible"
}
const Contact = () => {
  return (
<ContactForm/>  )
}
export default Contact