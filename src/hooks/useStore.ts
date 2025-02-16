import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useAuth = () => useSelector((state: RootState) => state.auth);
export const useUI = () => useSelector((state: RootState) => state.ui);
