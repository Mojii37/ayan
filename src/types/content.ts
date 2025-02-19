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

export interface Article extends Content {
  excerpt: string;
}

export interface ArticleInput {
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  tags: string[];
  status: ContentStatus;
}