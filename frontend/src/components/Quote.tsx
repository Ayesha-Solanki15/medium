const Quote = () => {
  return (
    <div className="bg-slate-300 h-screen flex flex-col justify-center items-center p-3">
      <div className="flex flex-col max-w-lg">
        <div className=" text-3xl font-bold max-w-lg ">
          "The Customer support I received was exceptional. The support team
          went above and beyond to address my concerns"
        </div>
        <div className=" text-xl font-semibold max-w-md mt-4">
          Julies Winfield
        </div>
        <div className="text-sm font-semibold text-slate-400 max-w-md">
          CEO | Acne Corp
        </div>
      </div>
    </div>
  );
};

export default Quote;
