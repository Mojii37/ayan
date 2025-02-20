import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// تعریف تایپ‌ها
export interface Article {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  categoryId?: string;
  authorId?: string;
}

interface ArticlesState {
  items: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedArticle: Article | null;
}

// وضعیت اولیه
const initialState: ArticlesState = {
  items: [],
  status: 'idle',
  error: null,
  selectedArticle: null
};

// Async Thunks
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch('/api/articles');
    if (!response.ok) {
      throw new Error('خطا در دریافت مقالات');
    }
    return response.json();
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id: string) => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('خطا در حذف مقاله');
    }
    return id;
  }
);

// Slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<Article | null>) => {
      state.selectedArticle = action.payload;
    },
    clearArticles: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'خطا در دریافت مقالات';
      })
      // Delete Article
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

// Actions
export const { setSelectedArticle, clearArticles } = articlesSlice.actions;

// Selectors
export const selectAllArticles = (state: { articles: ArticlesState }) => state.articles.items;
export const selectArticleStatus = (state: { articles: ArticlesState }) => state.articles.status;
export const selectArticleError = (state: { articles: ArticlesState }) => state.articles.error;
export const selectSelectedArticle = (state: { articles: ArticlesState }) => state.articles.selectedArticle;

export default articlesSlice.reducer;