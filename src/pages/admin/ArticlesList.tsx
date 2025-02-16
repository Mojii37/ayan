// src/pages/admin/ArticlesList.tsx
import React from 'react';
import { ContentList } from '../../components/admin/content/ContentList';
import { Article } from '../../types/content';

const ArticlesList = () => {
  // در نسخه واقعی، این داده‌ها از API دریافت می‌شوند
  const articles: Article[] = [];

  const handleDelete = async (id: string) => {
    // حذف مقاله
    console.log('Deleting article:', id);
  };

  const handleStatusChange = async (id: string, status: string) => {
    // تغییر وضعیت مقاله
    console.log('Changing article status:', id, status);
  };

  return (
    <ContentList
      type="article"
      items={articles}
      onDelete={handleDelete}
      onStatusChange={handleStatusChange}
    />
  );
};

export default ArticlesList;
