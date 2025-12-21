import { getCategories } from "@/lib/fetchFunction";
import Footer from "./Footer";


const FooterServer = async () => {
  const data = await getCategories();
  return <Footer data={data} />;
};
export default FooterServer;
