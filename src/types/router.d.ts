export interface RouterFutureFlags {
    v7_startTransition: boolean;
    v7_relativeSplatPath: boolean;
  }
  
  declare global {
    namespace NodeJS {
      interface ProcessEnv {
        VITE_ROUTER_FUTURE_FLAGS: RouterFutureFlags;
      }
    }
  }