import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from '../services/authApi';
import { api } from '../services/api';
import { clearAuth, setCredentials } from '../lib/redux/authSlice';
import type { LoginCredentials, RegisterData } from '../types/auth.types';
import { notifySuccess, notifyError } from '../utils/notifications';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isInitialized, isLoading } = useAppSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await loginMutation(credentials).unwrap();
        const loggedInUser = response.user;
        if (loggedInUser) {
          dispatch(setCredentials({ user: loggedInUser }));
          notifySuccess('Welcome back!', `Signed in as ${loggedInUser.name}`);
          return loggedInUser;
        } else {
          throw new Error(response.message || 'Login failed');
        }
      } catch (err: unknown) {
        const message = typeof err === 'object' && err !== null && 'data' in err
          ? (err as { data?: { message?: string } }).data?.message || 'Invalid credentials'
          : 'Invalid credentials';
        notifyError('Authentication Failed', message);
        throw err;
      }
    },
    [loginMutation, dispatch]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        const response = await registerMutation({
          fullName: data.name,
          name: data.name,
          email: data.email,
          password: data.password,
          organizationName: data.organizationName,
        }).unwrap();
        const registeredUser = response.user;
        if (registeredUser) {
          dispatch(setCredentials({ user: registeredUser }));
          notifySuccess('Account Created!', `Welcome to Billora, ${registeredUser.name}`);
          return registeredUser;
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      } catch (err: unknown) {
        const message = typeof err === 'object' && err !== null && 'data' in err
          ? (err as { data?: { message?: string } }).data?.message || 'Registration failed'
          : 'Failed to create account';
        notifyError('Registration Error', message);
        throw err;
      }
    },
    [registerMutation, dispatch]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Ignore API logout errors
    } finally {
      dispatch(clearAuth());
      dispatch(api.util.resetApiState());
      notifySuccess('Signed out', 'You have been logged out safely.');
    }
  }, [logoutMutation, dispatch]);

  return {
    user,
    isAuthenticated,
    isInitialized,
    isLoading: !isInitialized || isLoading || isLoginLoading || isRegisterLoading || isLogoutLoading,
    login,
    register,
    logout,
  };
};
