// src/store/slices/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';
export type SupportedLanguage = 'fa' | 'en' | 'ar';
export type FontSize = 'small' | 'medium' | 'large';

export interface SettingsState {
  theme: {
    mode: ThemeMode;
    autoSwitch: boolean;
    customColors?: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  language: {
    current: SupportedLanguage;
    direction: 'rtl' | 'ltr';
    dateFormat: 'jalali' | 'gregorian';
  };
  interface: {
    fontSize: FontSize;
    compactMode: boolean;
    sidebarCollapsed: boolean;
    animationsEnabled: boolean;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    email: boolean;
    desktop: boolean;
    pushNotifications: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
    fontSize: FontSize;
  };
  privacy: {
    analyticsEnabled: boolean;
    cookiesAccepted: boolean;
    marketingEmails: boolean;
  };
}

const initialState: SettingsState = {
  theme: {
    mode: 'light',
    autoSwitch: true,
    customColors: {
      primary: '#1a73e8',
      secondary: '#4285f4',
      accent: '#fbbc04',
    },
  },
  language: {
    current: 'fa',
    direction: 'rtl',
    dateFormat: 'jalali',
  },
  interface: {
    fontSize: 'medium',
    compactMode: false,
    sidebarCollapsed: false,
    animationsEnabled: true,
  },
  notifications: {
    enabled: true,
    sound: true,
    email: true,
    desktop: false,
    pushNotifications: false,
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    fontSize: 'medium',
  },
  privacy: {
    analyticsEnabled: true,
    cookiesAccepted: false,
    marketingEmails: false,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.theme.mode = action.payload;
    },
    toggleAutoTheme(state) {
      state.theme.autoSwitch = !state.theme.autoSwitch;
    },
    updateCustomColors(state, action: PayloadAction<Partial<typeof initialState.theme.customColors>>) {
      if (state.theme.customColors) {
        state.theme.customColors = {
          ...state.theme.customColors,
          ...action.payload,
        };
      }
    },
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.language.current = action.payload;
      state.language.direction = action.payload === 'fa' || action.payload === 'ar' ? 'rtl' : 'ltr';
    },
    setDateFormat(state, action: PayloadAction<'jalali' | 'gregorian'>) {
      state.language.dateFormat = action.payload;
    },
    updateInterface(state, action: PayloadAction<Partial<typeof initialState.interface>>) {
      state.interface = {
        ...state.interface,
        ...action.payload,
      };
    },
    toggleSidebar(state) {
      state.interface.sidebarCollapsed = !state.interface.sidebarCollapsed;
    },
    updateNotificationSettings(state, action: PayloadAction<Partial<typeof initialState.notifications>>) {
      state.notifications = {
        ...state.notifications,
        ...action.payload,
      };
    },
    updateAccessibilitySettings(state, action: PayloadAction<Partial<typeof initialState.accessibility>>) {
      state.accessibility = {
        ...state.accessibility,
        ...action.payload,
      };
    },
    updatePrivacySettings(state, action: PayloadAction<Partial<typeof initialState.privacy>>) {
      state.privacy = {
        ...state.privacy,
        ...action.payload,
      };
    },
    resetSettings: () => initialState,
    resetSection(state, action: PayloadAction<keyof SettingsState>) {
      state[action.payload] = initialState[action.payload];
    },
  },
});

// Selectors
export const selectThemeMode = (state: { settings: SettingsState }) => state.settings.theme.mode;
export const selectLanguage = (state: { settings: SettingsState }) => state.settings.language.current;
export const selectDirection = (state: { settings: SettingsState }) => state.settings.language.direction;
export const selectInterface = (state: { settings: SettingsState }) => state.settings.interface;
export const selectNotifications = (state: { settings: SettingsState }) => state.settings.notifications;
export const selectAccessibility = (state: { settings: SettingsState }) => state.settings.accessibility;

export const {
  setThemeMode,
  toggleAutoTheme,
  updateCustomColors,
  setLanguage,
  setDateFormat,
  updateInterface,
  toggleSidebar,
  updateNotificationSettings,
  updateAccessibilitySettings,
  updatePrivacySettings,
  resetSettings,
  resetSection,
} = settingsSlice.actions;

export default settingsSlice.reducer;