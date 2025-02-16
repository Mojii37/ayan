
declare global {
    interface Window {
      console: Console;
      localStorage: Storage;
      location: Location;
    }
  
    type NonNullableRecord = Record<string, unknown>;
  }
  
  export interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T;
  }