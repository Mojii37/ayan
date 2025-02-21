import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Article, ArticleInput, ArticlesResponse } from '@/types/content';
import { articleService } from '@/services/articleService';

interface ArticlesState {
  items: Article[];
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: ArticlesState = {
  items: [],
  selectedArticle: null,
  loading: false,
  error: null,
  total: 0
};

// Async Thunks
export const fetchArticles = createAsyncThunk<
  ArticlesResponse,
  { page?: number; limit?: number } | undefined
>('articles/fetchAll', async (filters) => {
  return await articleService.getArticles(filters);
});

export const fetchArticle = createAsyncThunk<Article, string>(
  'articles/fetchOne',
  async (id) => {
    return await articleService.getArticle(id);
  }
);

export const createArticle = createAsyncThunk<Article, ArticleInput>(
  'articles/create',
  async (data) => {
    return await articleService.createArticle(data);
  }
);

export const updateArticle = createAsyncThunk<
  Article,
  { id: string; data: Partial<ArticleInput> }
>('articles/update', async ({ id, data }) => {
  return await articleService.updateArticle(id, data);
});

export const deleteArticle = createAsyncThunk<string, string>(
  'articles/delete',
  async (id) => {
    await articleService.removeArticle(id);
    return id;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticleState: (state) => {
      state.selectedArticle = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticlesResponse>) => {
        state.items = action.payload.articles;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'خطا در دریافت مقالات';
      })
      // Fetch One
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.selectedArticle = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'خطا در دریافت مقاله';
      })
      // Create
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.items.unshift(action.payload);
        state.total += 1;
      })
      // Update
      .addCase(updateArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedArticle?.id === action.payload.id) {
          state.selectedArticle = action.payload;
        }
      })
      // Delete
      .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.total -= 1;
        if (state.selectedArticle?.id === action.payload) {
          state.selectedArticle = null;
        }
      });
  }
});

export const { clearArticleState } = articlesSlice.actions;
export default articlesSlice.reducer;