import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  currentTime: string;
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  currentTime: '2025-02-13 18:19:45'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCurrentTime: (state, action: PayloadAction<string>) => {
      state.currentTime = action.payload;
    }
  }
});

export const { toggleDarkMode, toggleSidebar, setCurrentTime } = uiSlice.actions;
export default uiSlice.reducer;