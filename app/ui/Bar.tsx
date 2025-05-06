"use client";
import React, { useState } from "react";

const Bar = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="relative z-10">
      {/* Mobile menu button - only visible on small screens */}
      <button 
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className={`${open ? 'absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 border' : ''} md:relative md:top-0 md:right-0 md:bg-transparent md:shadow-none md:p-0 md:border-0`}>
        <ul className={`${open ? 'flex flex-col space-y-3' : 'hidden md:flex md:space-x-6'} items-center`}>
          <li>
            <a
              href="/articles"
              className="text-red-600 text-base md:text-lg font-semibold hover:text-red-500 transition-colors relative group"
            >
              Articles
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="/blogs"
              className="text-red-600 text-base md:text-lg font-semibold hover:text-red-500 transition-colors relative group"
            >
              Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="/reports"
              className="text-red-600 text-base md:text-lg font-semibold hover:text-red-500 transition-colors relative group"
            >
              Reports
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Bar;
