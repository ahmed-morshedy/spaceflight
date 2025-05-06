import React from "react";
import Bar from "../ui/Bar";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 w-full h-16 sm:h-20 bg-white z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 shadow-md border-b border-gray-100">
      <div className="flex items-center">
        <Link href="/" className="group flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 mr-2 text-blue-600 group-hover:text-red-600 transition-colors" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 8l-3.293-3.293A1 1 0 0112 4z" clipRule="evenodd" />
          </svg>
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-700 via-red-500 to-red-700 text-transparent bg-clip-text hover:from-red-600 hover:to-blue-700 transition-all duration-300">
            Spaceflight News
          </span>
        </Link>
      </div>
      <Bar />
    </header>
  );
};

export default Header;
