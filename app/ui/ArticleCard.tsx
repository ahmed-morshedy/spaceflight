import React from "react";
import formatDate from "../lib/utils";
import Link from "next/link";
import style from "./articlecardStyle.module.css";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  const {
    title,
    authors,
    image_url,
    published_at,
    description,
    url,
    news_site,
  } = article;

  return (
    <Link href={url} className="w-full h-full block">
      <div
        className={`${style.card} m-2 rounded-xl overflow-hidden relative`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image_url}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className={style.overlay}>
          <h2 className="font-bold line-clamp-2 text-lg sm:text-xl md:text-2xl">{title}</h2>
          <p className="text-xs sm:text-sm my-1 sm:my-2 text-blue-300">{`Published by ${news_site}`}</p>
          <div className="flex items-center justify-between mt-1 sm:mt-2 flex-wrap gap-1">
            <p className="text-xs sm:text-sm text-gray-300">
              {authors?.[0]?.name ? `By ${authors[0].name}` : "Unknown Author"}
            </p>
            <p className="text-xs sm:text-sm text-gray-300">{formatDate(published_at)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
