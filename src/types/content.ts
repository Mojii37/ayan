export interface Category {
  id: string;
  title: string;
  slug: string;
}

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Content {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
  category: Category;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  summary?: string;
  slug: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  readTime?: number;
  viewCount: number;
}
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  thumbnail?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface ArticleCategory {
  id: string;
  name: string;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
}

export interface ArticleFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface ArticleInput {
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
}