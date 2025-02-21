import { Article, ArticleInput, ArticlesResponse } from '@/types/content';

class ArticleService {
  async getArticles(filters?: { page?: number; limit?: number }): Promise<ArticlesResponse> {
    // API call to get articles
    return fetch('/api/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }

  async getArticle(id: string): Promise<Article> {
    // API call to get a single article
    return fetch(`/api/articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }

  async createArticle(data: ArticleInput): Promise<Article> {
    // API call to create a new article
    return fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }

  async updateArticle(id: string, data: Partial<ArticleInput>): Promise<Article> {
    // API call to update an existing article
    return fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }

  async removeArticle(id: string): Promise<void> {
    // API call to delete an article
    return fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }
}

export const articleService = new ArticleService();