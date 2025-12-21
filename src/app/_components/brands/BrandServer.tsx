import { getBrands } from "@/lib/fetchFunction"
import Brands from "./brands"

const BrandServer = async() => { 
    const data=await getBrands()
  return (
<Brands brands={data}/>
)
}
export default BrandServer