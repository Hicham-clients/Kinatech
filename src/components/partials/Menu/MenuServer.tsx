import { getCategories } from "@/lib/fetchFunction";
import Menu from "./Menu";
const MenuServer = async () => {
  const categories = await getCategories();

  return <Menu data={categories} />;
};
export default MenuServer;
