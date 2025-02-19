export interface Category {
  id: string;
  title: string;
  slug: string;
}

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Content {
  id: string; // id should not be optional here to avoid duplication
  title: string;
  content: string;
  categoryId: string;
  category: Category;
  type: 'article' | 'news' | 'page';
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Article extends Content {
  excerpt: string;
  tags: string[];
}

export interface ContentFormData {
  title: string;
  type: 'article' | 'news' | 'page';
  content: string;
  status: 'draft' | 'published';
}
