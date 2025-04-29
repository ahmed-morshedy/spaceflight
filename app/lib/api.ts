export async function fetchArticles(url: string) {
  try {
    const res = await fetch(url);
    const data: Articles = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return null;
  }
}

export async function fetchBlogs(url: string) {
  try {
    const res = await fetch(url);
    const data: Blogs = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}

export async function fetchRports(url: string) {
  try {
    const res = await fetch(url);
    const data: Reports = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}
