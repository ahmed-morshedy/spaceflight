"use client";
import React, { useState } from "react";

const Bar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <div className="text-red-600 md:hidden absolute w-full min-h-screen  h-full bg-black p-5 left-0 z-10">
        scdvsvdfvksdfvksdkvsd kv kl vklvsd kd vksld vkd vkld
      </div> */}
      {/* <button
        className="group relative inline-block w-[44px] p-[5px] h-[45px] m-[25px] md:hidden"
        title="Toggle menu"
        aria-label="Toggle menu"
      >
        <span className="mx-[auto] my-[0] relative top-[12px] w-[30px] h-[6px] bg-[#000] block [transition-property:margin,_width] group-hover:w-[20px] duration-200 hover:cursor-pointer after:absolute after:content-[''] after:mt-[12px] after:w-[30px] after:h-[6px] after:bg-[#000] after:block after:left-[0] after:[transition-property:margin,_left] after:duration-200 group-hover:after:mt-[6px] group-hover:after:-left-[5px] before:absolute before:content-[''] before:-mt-[12px] before:w-[30px] before:h-[6px] before:bg-[#000] before:block before:left-[0] before:[transition-property:margin,_width,_left] before:duration-200 group-hover:before:-mt-[6px] group-hover:before:w-[10px] group-hover:before:left-[5px]" />
      </button> */}
      <ol className=" flex   ">
        <li>
          <a
            href="/articles"
            className="text-red-600 text-lg md:text-2xl font-semibold hover:text-red-500 mr-3"
          >
            Articles
          </a>
        </li>
        <li>
          <a
            href="/blogs"
            className="text-red-600 text-lg md:text-2xl font-semibold hover:text-red-500 mr-3"
          >
            Blogs
          </a>
        </li>{" "}
        <li>
          <a
            href="/reports"
            className="text-red-600 text-lg md:text-2xl font-semibold hover:text-red-500"
          >
            Reports
          </a>
        </li>
      </ol>
    </div>
  );
};

export default Bar;
