"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ArticleCard from "../ui/ArticleCard";
import { useDebouncedCallback } from "use-debounce";
import { fetchArticles, fetchBlogs } from "../lib/api";
import ArticleCardSkeleton from "../ui/ArticleSkeleton";
import BlogCard from "../ui/BlogCard";

type Props = {};

const MainPage = (props: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [articles, setArticles] = useState<Articles | null>(null);
  const [blogs, setBlogs] = useState<Blogs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pre, setPre] = useState<string | null>(null);
  const [next, setNext] = useState<string>(
    "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&offset=10"
  );

  const handelNext = useDebouncedCallback((href) => {
    if (!href) return;

    const parsedUrl = new URL(href);

    const offset: string | number = parsedUrl.searchParams.get("offset") ?? "0";

    const limit = parsedUrl.searchParams.get("limit");
    const params = new URLSearchParams(searchParams);

    if (offset) {
      params.set("offset", offset);
    } else {
      params.delete("offset");
    }
    if (limit) {
      params.set("limit", limit);
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  const handelPre = useDebouncedCallback((href) => {
    if (!href) return;
    const parsedUrl = new URL(href);

    const offset: string | number = parsedUrl.searchParams.get("offset") ?? "0";
    const limit = parsedUrl.searchParams.get("limit");
    const params = new URLSearchParams(searchParams);

    if (offset) {
      params.set("offset", offset);
    } else {
      params.delete("offset");
    }
    if (limit) {
      params.set("limit", limit);
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  useEffect(() => {
    if (!searchParams.get("offset") && !searchParams.get("limit")) {
      setPre(null);
      setNext(
        "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&offset=10"
      );
    }
    const fetchData = async () => {
      //  fetch blogs
      try {
        setIsLoading(true);
        setError(null);
        if (searchParams.get("offset") && searchParams.get("limit")) {
          const offset = searchParams.get("offset")?.trim() as string;
          const limit = searchParams.get("limit")?.trim() as string;
          const data = await fetchBlogs(
            `https://api.spaceflightnewsapi.net/v4/blogs/?format=json`
          );

          if (!data) {
            throw new Error("Failed to fetch articles.");
          }

          setNext(data.next ?? "");
          setPre(data.previous);
          setBlogs(data);
        } else {
          const data = await fetchBlogs(
            "https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=20&offset=0"
          );
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      // fetch articles
      if (searchParams.get("offset") && searchParams.get("limit")) {
        try {
          error && setError(null);
          const offset = searchParams.get("offset")?.trim() as string;
          const limit = searchParams.get("limit")?.trim() as string;
          setIsLoading(true);
          const data = await fetchArticles(
            `https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=${limit}&offset=${offset}`
          );

          if (!data) {
            throw new Error("Failed to fetch articles.");
          }

          setNext(data.next ?? "");
          setPre(data.previous);
          setArticles(data);
        } catch (err) {
          setError("Failed to load Pokémon. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const data = await fetchArticles(
            "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&offset=0"
          );
          setArticles(data);
        } catch (error) {
          console.error("Error fetching articles:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  const chunkArticles = (articles: Article[], chunks: number) => {
    const chunkSize = Math.ceil(articles.length / chunks);
    return Array.from({ length: chunks }, (_, i) =>
      articles.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  const columns = articles ? chunkArticles(articles.results, 2) : [];

  if (isLoading) {
    return <ArticleCardSkeleton />;
  }
  return (
    <div className="relative p-3 sm:p-5 md:p-10 lg:p-20 max-w-7xl mx-auto">
      {/* Blog Div */}
      <div className="mb-6 relative">
        <div className="mb-4 flex items-center">
          <p className="text-2xl sm:text-3xl font-bold w-fit mr-3 text-red-700">
            New Space Blog
          </p>
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-red-600"></span>
          </span>
        </div>
        <div className="flex justify-center items-center p-2">
          {blogs &&
            Array.isArray(blogs.results) &&
            blogs.results.length > 0 && <BlogCard blog={blogs.results[0]} />}
        </div>
      </div>

      {/* Articles Div */}
      <div className="mt-10 relative">
        <p className="text-2xl sm:text-3xl font-bold w-fit mr-3 text-red-700 mb-4">
          Space Articles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 p-2">
          {articles && articles.results.map((article) => (
            <div key={article.id} className="h-full">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center my-6 sm:my-8 px-2 sm:px-4">
        <button
          onClick={() => handelPre(pre)}
          disabled={!pre}
          className={`${
            !pre
              ? "cursor-not-allowed bg-blue-300"
              : "cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors"
          } text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base flex items-center`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </button>
        <button
          onClick={() => handelNext(next)}
          disabled={!next}
          className={`${
            !next
              ? "cursor-not-allowed bg-blue-300"
              : "cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors"
          } text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base flex items-center`}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
