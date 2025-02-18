/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_URL: string;
    readonly VITE_ENV: 'development' | 'production' | 'test';
    
    // اجازه به متغیرهای محیطی اضافی
    readonly [key: string]: string | boolean | undefined;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  // تعریف متغیرهای محیطی برای Node.js
  declare global {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly VITE_API_URL?: string;
      readonly [key: string]: string | undefined;
    }
  }
  
  // برای اطمینان از export 
  export {};