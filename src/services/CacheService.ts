export interface CachedData<T = unknown> {
  data: T;
  createdAt: number;
  expiresAt: number;
  version?: string;
  tags?: string[];
}

import type { CachedData } from '../types/store.types';

export interface ICacheService {
  clearExpired(maxAge?: number): void;
  getCachedItem<T = unknown>(key: string): CachedData<T> | undefined;
  setCachedItem<T = unknown>(key: string, data: T, ttl?: number): void;
}

export class CacheService implements ICacheService {
  private static instance: CacheService;
  private storage: Storage;

  private constructor() {
    this.storage = window.localStorage;
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  clearExpired(maxAge?: number): void {
    const now = Date.now();
    const defaultMaxAge = 24 * 60 * 60 * 1000; // 24 hours
    const expirationTime = now - (maxAge ?? defaultMaxAge);

    Object.keys(this.storage).forEach((key) => {
      try {
        const item = this.storage.getItem(key);
        if (item) {
          const cached = JSON.parse(item) as CachedData;
          if (cached.createdAt < expirationTime || now > cached.expiresAt) {
            this.storage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn(`Error clearing expired cache for key ${key}:`, error);
      }
    });
  }

  getCachedItem<T = unknown>(key: string): CachedData<T> | undefined {
    try {
      const item = this.storage.getItem(key);
      if (!item) return undefined;

      const cached = JSON.parse(item) as CachedData<T>;
      const now = Date.now();
      
      if (now > cached.expiresAt) {
        this.storage.removeItem(key);
        return undefined;
      }
      return cached;
    } catch (error) {
      console.warn(`Error getting cached item for key ${key}:`, error);
      return undefined;
    }
  }

  setCachedItem<T = unknown>(key: string, data: T, ttl = 3600000): void {
    try {
      const now = Date.now();
      const item: CachedData<T> = {
        data,
        createdAt: now,
        expiresAt: now + ttl,
      };
      this.storage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.warn(`Error setting cached item for key ${key}:`, error);
    }
  }
}

export const cacheService = CacheService.getInstance();