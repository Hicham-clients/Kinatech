import Image from "next/image";
import Link from "next/link";

const Whatsapp = () => {
  return (
    <Link
      target="_blank"
      href={"https://wa.me/212661613561"}
      className="fixed bottom-5 hidden sm:block left-5 z-[9999999999999] cursor-pointer scale-minus-hover  rounded-full"
    >
      <Image
        alt="0656757843"
        src={"/images/whtasApp.webp"}
        height={1000}
        width={1000}
        className="w-20 h-20 object-contain"
      />
    </Link>
  );
};
export default Whatsapp;
