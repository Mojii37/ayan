import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { articleService } from '../../services/articleService';
import type { Article, ArticleInput } from '../../types/content';

interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async () => {
    const response = await articleService.getArticles();
    return response;
  }
);

export const createArticle = createAsyncThunk(
  'articles/create',
  async (articleData: ArticleInput) => {
    const response = await articleService.createArticle(articleData);
    return response;
  }
);

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ id, ...articleData }: Article) => {
    const response = await articleService.updateArticle(id!, articleData);
    return response;
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (id: string) => {
    await articleService.removeArticle(id);
    return id;
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'خطا در دریافت مقالات';
      })
      // Create
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
      })
      // Update
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(article => article.id !== action.payload);
      });
  },
});

export const { setCurrentArticle, clearCurrentArticle } = articleSlice.actions;

export const selectArticles = (state: { articles: ArticleState }) => state.articles.articles;
export const selectCurrentArticle = (state: { articles: ArticleState }) => state.articles.currentArticle;
export const selectArticlesLoading = (state: { articles: ArticleState }) => state.articles.loading;
export const selectArticlesError = (state: { articles: ArticleState }) => state.articles.error;

export default articleSlice.reducer;