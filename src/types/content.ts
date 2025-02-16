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
}

export interface Article extends Content {
  excerpt: string;
  tags: string[];
}