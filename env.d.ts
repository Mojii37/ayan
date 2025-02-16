interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENV: 'development' | 'production' | 'test';
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly [key: string]: string | undefined;
  }
}

declare const process: {
  env: ProcessEnv;
};

export {};