"use client";
import React, { useState } from "react";

const Bar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ol className=" flex   ">
        <li>
          <a
            href="/articles"
            className="text-red-600 text-lg md:text-2xl font-semibold hover:text-red-500 mr-1.5 md:mr-3"
          >
            Articles
          </a>
        </li>
        <li>
          <a
            href="/blogs"
            className="text-red-600 text-lg md:text-2xl font-semibold hover:text-red-500 mr-1.5 md:mr-3"
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
