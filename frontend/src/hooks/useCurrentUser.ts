import { useAppSelector } from './useAppDispatch';
import type { User } from '../types/auth.types';

export const useCurrentUser = (): User | null => {
  return useAppSelector((state) => state.auth.user);
};
