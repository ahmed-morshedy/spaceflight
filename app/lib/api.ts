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
