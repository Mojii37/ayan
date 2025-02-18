
import { useDispatch, useSelector } from 'react-redux';
import {
  setThemeMode,
  setLanguage,
  selectThemeMode,
  selectLanguage,
  updateNotificationSettings,
} from '../store/slices/settingsSlice';

export const SettingsManager: React.FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);
  const language = useSelector(selectLanguage);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    dispatch(setThemeMode(newTheme));
  };

  const handleLanguageChange = (newLang: 'fa' | 'en' | 'ar') => {
    dispatch(setLanguage(newLang));
  };

  const updateNotifications = (settings: { sound?: boolean; email?: boolean }) => {
    dispatch(updateNotificationSettings(settings));
  };

  return (
    <div>
      {/* کامپوننت‌های تنظیمات */}
    </div>
  );
};