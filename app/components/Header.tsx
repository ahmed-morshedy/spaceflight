import React from "react";
import Bar from "../ui/Bar";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="  w-[100%] h-[70px] bg-[#fff] z-[10] flex items-center justify-between pr-3 md:px-[20px] shadow-md  ">
      <a href="/">
        <p className=" text-xl md:text-3xl font-extrabold flex justify-center italic underline decoration-red-500   ">
          Spaceflight News
        </p>
      </a>
      <Bar />
    </header>
  );
};

export default Header;
