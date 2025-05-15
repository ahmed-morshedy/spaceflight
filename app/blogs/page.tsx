"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { fetchBlogs } from "../lib/api";
import ArticleCardSkeleton from "../ui/ArticleSkeleton";
import ArticleCard from "../ui/ArticleCard";
import BlogCard from "../ui/BlogCard";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [blogs, setBlogs] = useState<Blogs | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pre, setPre] = useState<string | null>(null);
  const [next, setNext] = useState<string>(
    "https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=15&offset=15"
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
        "https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=15&offset=15"
      );
    }
    const fetchData = async () => {
      // fetch blogs
      if (searchParams.get("offset") && searchParams.get("limit")) {
        try {
          error && setError(null);
          const offset = searchParams.get("offset")?.trim() as string;
          const limit = searchParams.get("limit")?.trim() as string;
          setIsLoading(true);
          const data = await fetchBlogs(
            `https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=${limit}&offset=${offset}`
          );

          if (!data) {
            throw new Error("Failed to fetch articles.");
          }

          setNext(data.next ?? "");
          setPre(data.previous);
          setBlogs(data);
        } catch (err) {
          setError("Failed to load Pokémon. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const data = await fetchBlogs(
            "https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=15&offset=0"
          );
          setBlogs(data);
        } catch (error) {
          console.error("Error fetching articles:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  const chunkBlogs = (articles: Article[], chunks: number) => {
    const chunkSize = Math.ceil(articles.length / chunks);
    return Array.from({ length: chunks }, (_, i) =>
      articles.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  const columns = blogs ? chunkBlogs(blogs.results, 3) : [];

  if (isLoading) {
    return <ArticleCardSkeleton />;
  }
  return (
    <div className=" relative p-2 sm:p-20  flex flex-col justify-center items-center">
      <p className=" text-3xl font-bold w-fit mr-3 text-red-700 underline decoration-black">
        Space Blogs
      </p>
      <div className="  mt-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
          {columns.map((colArticles, colIndex) => (
            <div key={colIndex} className="flex flex-col">
              {colArticles.map((article) => (
                <BlogCard key={article.id} blog={article} />
              ))}
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex justify-between  ">
          <button
            onClick={() => handelPre(pre)}
            disabled={!pre}
            className={`${
              !pre
                ? "cursor-not-allowed bg-blue-300"
                : "cursor-pointer bg-blue-500"
            }  text-white px-4 py-2 rounded`}
          >
            Previous
          </button>
          <button
            onClick={() => handelNext(next)}
            disabled={!next}
            className={`${
              !next
                ? "cursor-not-allowed bg-blue-300"
                : "cursor-pointer bg-blue-500"
            }  text-white px-4 py-2 rounded`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
