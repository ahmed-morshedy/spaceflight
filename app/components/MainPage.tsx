"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ArticleCard from "../ui/ArticleCard";
import { useDebouncedCallback } from "use-debounce";
import { fetchArticles } from "../lib/api";
import ArticleCardSkeleton from "../ui/ArticleSkeleton";

type Props = {};

const MainPage = (props: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const offset = searchParams.get("offset");
  const [articles, setArticles] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pre, setPre] = useState<string | null>(null);
  const [next, setNext] = useState<string>(
    "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=20&offset=20"
  );

  const handelNext = useDebouncedCallback((href) => {
    if (!href) return;

    const parsedUrl = new URL(href);

    const offset: string | number = parsedUrl.searchParams.get("offset") ?? "0";
    if (Number(offset) > 1000) return;

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
        "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=20&offset=20"
      );
    }
    const fetchData = async () => {
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
            "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=20&offset=0"
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
    return Array.from({ length: 6 }).map((_, i) => (
      <ArticleCardSkeleton key={i} />
    ));
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {columns.map((colArticles, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            {colArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between m-4">
        <button
          onClick={() => handelPre(pre)}
          disabled={!pre}
          className={`${
            !pre ? "cursor-not-allowed" : "cursor-pointer"
          } bg-blue-500 text-white px-4 py-2 rounded`}
        >
          Previous
        </button>
        <button
          onClick={() => handelNext(next)}
          disabled={!next}
          className={`${
            !next ? "cursor-not-allowed" : "cursor-pointer"
          } bg-blue-500 text-white px-4 py-2 rounded`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MainPage;
