// src/services/articleService.ts
import axios from 'axios';
import { Article, ArticleCategory } from '../types/content';

const API_URL = '/api/articles'; // Replace with your actual API endpoint

class ArticleService {
  // Fetch all articles
  async getArticles(): Promise<Article[]> {
    try {
      const response = await axios.get<Article[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  // Create a new article
  async createArticle(articleData: Omit<Article, 'id'>): Promise<Article> {
    try {
      const response = await axios.post<Article>(API_URL, {
        ...articleData,
        createdAt: new Date().toISOString(),
        status: articleData.status || 'draft'
      });
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  // Update an existing article
  async updateArticle(articleData: Article): Promise<Article> {
    if (!articleData.id) {
      throw new Error('Article ID is required for update');
    }

    try {
      const response = await axios.put<Article>(
        `${API_URL}/${articleData.id}`, 
        {
          ...articleData,
          updatedAt: new Date().toISOString()
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  // Remove an article
  async removeArticle(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  // Get article categories
  getArticleCategories(): ArticleCategory[] {
    return Object.values(ArticleCategory);
  }
}

export const articleService = new ArticleService();