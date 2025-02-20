import type { CachedData } from '../types/store.types';

export class CacheService {
  private static instance: CacheService;
  private readonly prefix = 'cache_';

  private constructor() {}

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  getCachedItem<T = unknown>(key: string): CachedData<T> | undefined {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return undefined;

      const cachedData = JSON.parse(item) as CachedData<T>;
      if (this.isExpired(cachedData)) {
        this.removeItem(key); // تغییر نام متد
        return undefined;
      }

      return cachedData;
    } catch (error) {
      console.error('Error getting cached item:', error);
      return undefined;
    }
  }

  setCachedItem<T = unknown>(
    key: string, 
    data: T, 
    ttl: number = 3600000, // 1 hour default
    tags: string[] = []
  ): void {
    try {
      const cachedData: CachedData<T> = {
        data,
        createdAt: Date.now(),
        expiresAt: Date.now() + ttl,
        version: '1.0',
        tags,
      };

      localStorage.setItem(this.prefix + key, JSON.stringify(cachedData));
    } catch (error) {
      console.error('Error setting cached item:', error);
    }
  }

  clearExpired(maxAge: number = 86400000): void { // 24 hours default
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            const cachedData = JSON.parse(item) as CachedData<unknown>;
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

  clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  }

  // تغییر نام متد از removeCachedItem به removeItem
  removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  private isExpired(cachedData: CachedData<unknown>): boolean {
    return Date.now() > cachedData.expiresAt;
  }
}

export const cacheService = CacheService.getInstance();
export type CacheServiceType = typeof cacheService;