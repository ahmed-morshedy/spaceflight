interface Author {
  name: string;
  socials: {
    x: string | null;
    youtube: string | null;
    instagram: string | null;
    linkedin: string | null;
    mastodon: string | null;
    bluesky: string | null;
  } | null;
}

interface Article {
  id: number;
  title: string;
  authors: Author[] | null;
  url: string;
  description: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

interface Articles {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

interface Blog {
  id: number;
  title: string;
  authors: Author[] | null;
  url: string;
  description: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

interface Blogs {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
}

interface Report {
  id: number;
  title: string;
  authors: Author[] | null;
  Url: string;
  description: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

interface Reports {
  count: number;
  next: string | null;
  previous: string | null;
  results: Report[];
}
