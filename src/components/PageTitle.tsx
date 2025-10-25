const PageTitle = ({ title, text }: {title:string|null, text:string}) => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-A text-center md:text-left font-semibold  tracking-wide">
        {title}
      </h1>
      <p className="text-grey font-A max-w-xl py-1">{text}</p>
    </div>
  );
};
export default PageTitle;
