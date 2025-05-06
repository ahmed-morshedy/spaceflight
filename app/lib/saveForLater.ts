"use client";

// Define a type for saved articles
export interface SavedArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  published_at: string;
  savedAt: number; // timestamp when saved
}

// Key for localStorage
const SAVED_ARTICLES_KEY = 'spaceflight_saved_articles';

// Function to save an article
export const saveArticle = (article: Article): boolean => {
  try {
    // Get current saved articles
    const savedArticles = getSavedArticles();
    
    // Check if article already exists in saved list
    if (savedArticles.some(savedArticle => savedArticle.id === article.id)) {
      return false; // Article already saved
    }
    
    // Add the new article with timestamp
    const newSavedArticle: SavedArticle = {
      id: article.id,
      title: article.title,
      url: article.url,
      image_url: article.image_url,
      news_site: article.news_site,
      published_at: article.published_at,
      savedAt: Date.now()
    };
    
    // Add to saved articles
    savedArticles.push(newSavedArticle);
    
    // Save to localStorage
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(savedArticles));
    
    return true; // Successfully saved
  } catch (error) {
    console.error('Error saving article:', error);
    return false;
  }
};

// Function to remove a saved article
export const removeSavedArticle = (articleId: number): boolean => {
  try {
    // Get current saved articles
    const savedArticles = getSavedArticles();
    
    // Filter out the article to remove
    const updatedSavedArticles = savedArticles.filter(article => article.id !== articleId);
    
    // If no articles were removed, return false
    if (updatedSavedArticles.length === savedArticles.length) {
      return false;
    }
    
    // Save the updated list
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedSavedArticles));
    
    return true; // Successfully removed
  } catch (error) {
    console.error('Error removing article:', error);
    return false;
  }
};

// Function to get all saved articles
export const getSavedArticles = (): SavedArticle[] => {
  try {
    // Get from localStorage
    const savedArticlesJson = localStorage.getItem(SAVED_ARTICLES_KEY);
    
    // If there are no saved articles, return empty array
    if (!savedArticlesJson) {
      return [];
    }
    
    // Parse and return the saved articles
    return JSON.parse(savedArticlesJson);
  } catch (error) {
    console.error('Error getting saved articles:', error);
    return [];
  }
};

// Function to check if an article is saved
export const isArticleSaved = (articleId: number): boolean => {
  try {
    const savedArticles = getSavedArticles();
    return savedArticles.some(article => article.id === articleId);
  } catch (error) {
    console.error('Error checking if article is saved:', error);
    return false;
  }
};
