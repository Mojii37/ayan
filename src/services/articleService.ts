export interface Article {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  categoryId?: string;
  excerpt?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
  };
}

export interface ArticleInput {
  title: string;
  content: string;
  status?: 'draft' | 'published' | 'archived';
  categoryId?: string;
  excerpt?: string;
  thumbnail?: string;
}

export interface ArticleFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: Article['status'];
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

const API_URL = '/api/articles';

class ArticleService {
  private async fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getArticles(filters: ArticleFilters = {}): Promise<ArticlesResponse> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });

      const url = `${API_URL}?${queryParams.toString()}`;
      return await this.fetchJson<ArticlesResponse>(url);
    } catch (err) {
      console.error('Error fetching articles:', err);
      throw err;
    }
  }

  async getArticle(id: string): Promise<Article> {
    try {
      return await this.fetchJson<Article>(`${API_URL}/${id}`);
    } catch (err) {
      console.error('Error fetching article:', err);
      throw err;
    }
  }

  async createArticle(articleData: ArticleInput): Promise<Article> {
    try {
      return await this.fetchJson<Article>(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...articleData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: articleData.status || 'draft'
        })
      });
    } catch (err) {
      console.error('Error creating article:', err);
      throw err;
    }
  }

  async updateArticle(id: string, articleData: Partial<ArticleInput>): Promise<Article> {
    try {
      return await this.fetchJson<Article>(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...articleData,
          updatedAt: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Error updating article:', err);
      throw err;
    }
  }

  async removeArticle(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error deleting article:', err);
      throw err;
    }
  }

  // متدهای کمکی برای مدیریت وضعیت مقاله
  async publishArticle(id: string): Promise<Article> {
    return this.updateArticle(id, { status: 'published' });
  }

  async archiveArticle(id: string): Promise<Article> {
    return this.updateArticle(id, { status: 'archived' });
  }

  async draftArticle(id: string): Promise<Article> {
    return this.updateArticle(id, { status: 'draft' });
  }
}

// صادر کردن یک نمونه از کلاس
export const articleService = new ArticleService();