"use client";

import React, { useState, useEffect } from "react";
import formatDate from "../lib/utils";
import Link from "next/link";
import style from "./articlecardStyle.module.css";
import { saveArticle, removeSavedArticle, isArticleSaved } from "../lib/saveForLater";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const [saveTooltip, setSaveTooltip] = useState(false);
  
  const {
    id,
    title,
    authors,
    image_url,
    published_at,
    description,
    url,
    news_site,
  } = article;

  // Check if the article is already saved when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSaved(isArticleSaved(id));
    }
  }, [id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the link from opening
    e.stopPropagation();
    
    if (isSaved) {
      // Remove from saved articles
      const removed = removeSavedArticle(id);
      if (removed) {
        setIsSaved(false);
        showTooltip("Removed from saved");
      }
    } else {
      // Add to saved articles
      const saved = saveArticle(article);
      if (saved) {
        setIsSaved(true);
        showTooltip("Saved for later");
      }
    }
  };

  // Show tooltip for 2 seconds
  const showTooltip = (message: string) => {
    setSaveTooltip(true);
    setTimeout(() => {
      setSaveTooltip(false);
    }, 2000);
  };

  return (
    <div className="relative group">
      <Link href={url} className="w-full h-full block" target="_blank" rel="noopener noreferrer">
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
      
      {/* Save button */}
      <button 
        onClick={handleSaveClick}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label={isSaved ? "Remove from saved" : "Save for later"}
      >
        {isSaved ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 8l-3.293-3.293A1 1 0 0112 4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        )}
      </button>
      
      {/* Save tooltip */}
      {saveTooltip && (
        <div className="absolute top-12 right-4 bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg z-20 animate-fade-in-out">
          {isSaved ? "Saved for later" : "Removed from saved"}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
