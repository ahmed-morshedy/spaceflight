import React from "react";

const ArticleCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="m-2 border rounded-xl overflow-hidden relative">
        {/* Image Skeleton */}
        <div className="relative max-h-[350px] overflow-hidden bg-gray-200 h-[200px]" />

        {/* Overlay Skeleton */}
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />

          <div className="flex items-center justify-between mt-4">
            <div className="h-4 bg-gray-300 rounded w-1/3" />
            <div className="h-4 bg-gray-300 rounded w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
