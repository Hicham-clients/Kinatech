import CardProductCart from "./_components/CardProductCart";
import CartSummary from "./_components/CartSummary";

const Cart = () => {
  return (
    <div className="p-paddingPhone py-paddingPC lg:px-paddingPC">
    <div className="flex flex-col gap-10 md:flex-row kinatech-container ">
      {/* <Vide/> */}
      <div className="flex flex-col gap-y-5 w-full">
       <h1 className="font-semibold font-A text-3xl tracking-wider">Panier</h1>
        <CardProductCart />
        <CardProductCart />
        <CardProductCart />
      </div>
      <CartSummary />
    </div>
    </div>
  );
};
export default Cart;
