import { Metadata } from "next"
import { SITE_URL } from "@/lib/seo"
import ContactForm from "./_components/form"
export const metadata:Metadata={
  title:"Contactez-nous",
  description:"Une question sur un produit ou une commande ? Contactez l'équipe Kinatech, nous vous répondons rapidement.",
  alternates:{
    canonical:`${SITE_URL}/contact`
  }
}
const Contact = () => {
  return (
<ContactForm/>  )
}
export default Contact