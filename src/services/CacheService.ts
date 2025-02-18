import { CachedData } from '../types/store.types';

export class CacheService {
  private static instance: CacheService;

  private constructor() {}

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  getCachedItem<T = unknown>(key: string): CachedData<T> | undefined {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return undefined;

      const cachedData: CachedData<T> = JSON.parse(item);
      if (this.isExpired(cachedData)) {
        this.removeCachedItem(key);
        return undefined;
      }

      return cachedData;
    } catch (error) {
      console.error('Error getting cached item:', error);
      return undefined;
    }
  }

  setCachedItem<T = unknown>(key: string, data: T, ttl: number = 3600000): void {
    try {
      const cachedData: CachedData<T> = {
        data,
        createdAt: Date.now(),
        expiresAt: Date.now() + ttl,
        version: '1.0',
        tags: [],
      };

      localStorage.setItem(`cache_${key}`, JSON.stringify(cachedData));
    } catch (error) {
      console.error('Error setting cached item:', error);
    }
  }

  clearExpired(maxAge: number = 86400000): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          const item = localStorage.getItem(key);
          if (item) {
            const cachedData: CachedData = JSON.parse(item);
            if (this.isExpired(cachedData) || (now - cachedData.createdAt > maxAge)) {
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }

  private isExpired(cachedData: CachedData): boolean {
    return Date.now() > cachedData.expiresAt;
  }

  private removeCachedItem(key: string): void {
    localStorage.removeItem(`cache_${key}`);
  }
}

export const cacheService = CacheService.getInstance();