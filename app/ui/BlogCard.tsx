import React from "react";
import formatDate from "../lib/utils";
import Link from "next/link";

type Props = {
  blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
  const {
    title,
    authors,
    image_url,
    published_at,

    url,
    news_site,
  } = blog;

  return (
    <>
      <Link href={url} className="w-full">
        <div className={`  m-2 border rounded-xl overflow-hidden relative`}>
          <div className="relative max-h-[350px] overflow-hidden">
            <img
              src={image_url}
              alt="article-img"
              className=" w-full"
              width={220}
              height={50}
            />
          </div>
          <div className={" text-white bg-black bg-opacity-50 p-4"}>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm my-2">{`Published by ${news_site}`}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500">
                Author :{authors?.[0]?.name ?? "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(published_at)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
