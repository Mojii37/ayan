declare global {
  interface Window {
    console: Console;
    localStorage: Storage;
    location: Location;
    [key: string]: unknown; // any را با unknown جایگزین کنید
  }

  type NonNullableRecord = Record<string, unknown>;
}

export interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
  currentTarget: T;
}

interface ErrorEvent extends Event {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
}

interface Navigator {
  userLanguage?: string;
}

export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

export type EventHandler<E extends Event = Event, T extends EventTarget = HTMLElement> = 
  (event: E & { target: T }) => void;

export {};