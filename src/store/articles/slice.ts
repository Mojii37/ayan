import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Article, ArticleInput } from '@/types/content';
import { articleService } from '@/services/articleService';

interface ArticlesState {
  items: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async () => {
    const response = await articleService.getArticles();
    return response.articles;
  }
);

export const createArticle = createAsyncThunk(
  'articles/create',
  async (article: ArticleInput) => {
    return await articleService.createArticle(article);
  }
);

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ id, data }: { id: string; data: Partial<ArticleInput> }) => {
    return await articleService.updateArticle(id, data);
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (id: string) => {
    await articleService.removeArticle(id);
    return id;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message || 'خطا در دریافت مقالات';
        state.loading = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default articlesSlice.reducer;