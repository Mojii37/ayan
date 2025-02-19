import axios from 'axios';
import type { Article, ArticleInput } from '../types/content';

const API_URL = '/api/articles';

class ArticleService {
  async getArticles(): Promise<Article[]> {
    try {
      const response = await axios.get<Article[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  async getArticle(id: string): Promise<Article> {
    try {
      const response = await axios.get<Article>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  }

  async createArticle(articleData: ArticleInput): Promise<Article> {
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

  async updateArticle(id: string, articleData: ArticleInput): Promise<Article> {
    try {
      const response = await axios.put<Article>(`${API_URL}/${id}`, {
        ...articleData,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  async removeArticle(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }
}

export const articleService = new ArticleService();