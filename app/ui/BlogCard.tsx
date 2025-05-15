"use client";

import React, { useState, useEffect } from "react";
import formatDate from "../lib/utils";
import Link from "next/link";
import style from "./articlecardStyle.module.css";

type Props = {
  blog: Blog;
};

const ArticleCard = ({ blog }: Props) => {
  const {
    title,

    image_url,
    published_at,

    url,
    news_site,
  } = blog;

  return (
    <div className="relative group">
      <div className={`${style.card} m-2 rounded-xl overflow-hidden relative`}>
        <Link
          href={url}
          className="w-full h-full block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={image_url}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>
        <div className={style.overlay}>
          <h2 className="font-bold line-clamp-2 text-lg sm:text-xl md:text-2xl">
            {title}
          </h2>
          <div className=" flex justify-between items-center">
            <p className="text-xs sm:text-sm my-1 sm:my-2 text-blue-300">{`Published by ${news_site}`}</p>

            <p className="text-xs sm:text-sm text-gray-300">
              {formatDate(published_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
