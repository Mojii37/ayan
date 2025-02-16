declare global {
  interface Window {
    config: {
      API_URL: string;
      ENV: string;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      REACT_APP_NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
