import Image from "next/image";
import Link from "next/link";

const Whatsapp = () => {
  return (
    <Link
      target="_blank"
      href={"https://wa.me/212661613561"}
      className="fixed bottom-5 hidden sm:block left-5 z-[9999999999999] cursor-pointer scale-minus-hover  rounded-full "
    >
      <Image
        alt="0661613561"
        src={"/images/whtasApp.webp"}
 height={80}
 width={80} 
 sizes="80px"
        className=" object-contain"
      />
    </Link>
  );
};
export default Whatsapp;
