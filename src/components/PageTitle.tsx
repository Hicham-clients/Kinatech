const PageTitle = ({ title, text }: {title:string|null, text:string}) => {
  return (
    <div>
      <h1 className="text-3xl  lg:text-4xl  font-D text-center md:text-left   tracking-wide">
        {title}
      </h1>
      <p className="text-grey font-A max-w-xl py-1 text-center md:text-left">{text}</p>
    </div>
  );
};
export default PageTitle;
