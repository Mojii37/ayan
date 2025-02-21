import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeCustomColors {
  primary: string;
  secondary: string;
}

interface SettingsState {
  theme: {
    mode: 'light' | 'dark';
    autoSwitch: boolean;
    customColors: ThemeCustomColors | null;
  };
  language: {
    current: 'fa' | 'en' | 'ar';
    direction: 'rtl' | 'ltr';
    dateFormat: 'jalali' | 'gregorian';
  };
  interface: {
    fontSize: 'small' | 'medium' | 'large';
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
    fontSize: 'small' | 'medium' | 'large';
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
    customColors: null,
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
    setThemeMode: (state, action: PayloadAction<SettingsState['theme']['mode']>) => {
      state.theme.mode = action.payload;
    },
    toggleAutoTheme: (state) => {
      state.theme.autoSwitch = !state.theme.autoSwitch;
    },
    updateCustomColors: (state, action: PayloadAction<ThemeCustomColors | null>) => {
      state.theme.customColors = action.payload;
    },
    setLanguage: (state, action: PayloadAction<SettingsState['language']['current']>) => {
      state.language.current = action.payload;
      state.language.direction = action.payload === 'fa' || action.payload === 'ar' ? 'rtl' : 'ltr';
    },
    setDateFormat: (state, action: PayloadAction<SettingsState['language']['dateFormat']>) => {
      state.language.dateFormat = action.payload;
    },
    updateInterface: (state, action: PayloadAction<Partial<SettingsState['interface']>>) => {
      Object.assign(state.interface, action.payload);
    },
    toggleSidebar: (state) => {
      state.interface.sidebarCollapsed = !state.interface.sidebarCollapsed;
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      Object.assign(state.notifications, action.payload);
    },
    updateAccessibilitySettings: (state, action: PayloadAction<Partial<SettingsState['accessibility']>>) => {
      Object.assign(state.accessibility, action.payload);
    },
    updatePrivacySettings: (state, action: PayloadAction<Partial<SettingsState['privacy']>>) => {
      Object.assign(state.privacy, action.payload);
    },
    resetSettings: () => initialState,
    resetSection: (state, action: PayloadAction<keyof SettingsState>) => {
      const key = action.payload;
      if (key in initialState) {
        return {
          ...state,
          [key]: { ...initialState[key] }
        };
      }
      return state;
    }
  },
});

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