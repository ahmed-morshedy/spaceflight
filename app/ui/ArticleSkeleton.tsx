import React from "react";

const ArticleCardSkeleton = () => {
  // Create an array of 6 skeletons for grid layout
  const skeletons = Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-video bg-gradient-to-r from-slate-200 to-slate-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title lines */}
        <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
        <div className="h-6 bg-slate-200 rounded-md w-1/2"></div>
        
        {/* Publisher line */}
        <div className="h-4 bg-slate-200 rounded-md w-2/5 mt-2"></div>
        
        {/* Info row */}
        <div className="flex justify-between pt-2">
          <div className="h-4 bg-slate-200 rounded-md w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="relative p-3 sm:p-5 md:p-10 lg:p-20 max-w-7xl mx-auto">
      {/* Blog skeleton */}
      <div className="mb-6 relative">
        <div className="mb-4 flex items-center">
          <div className="h-8 bg-slate-200 rounded-md w-40"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-slate-200"></div>
        </div>
        
        <div className="flex justify-center items-center p-2">
          <div className="animate-pulse w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-md">
            <div className="aspect-video bg-gradient-to-r from-slate-200 to-slate-300"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded-md w-2/5 mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles skeleton */}
      <div className="mt-10 relative">
        <div className="h-8 bg-slate-200 rounded-md w-48 mb-6"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 p-2">
          {skeletons}
        </div>
        
        {/* Loading text */}
        <div className="flex justify-center items-center mt-8">
          <div className="text-blue-600 font-medium flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading space content...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
