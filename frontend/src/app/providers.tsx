import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './store';
import { useGetMeQuery } from '../services/authApi';
import { setCredentials, setInitialized, clearAuth } from '../lib/redux/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setCredentials({ user: data.user }));
    } else if (isError) {
      dispatch(clearAuth());
      dispatch(setInitialized(true));
    } else if (!isLoading && !data?.user) {
      dispatch(setInitialized(true));
    }
  }, [data, isSuccess, isError, isLoading, dispatch]);

  return <>{children}</>;
};

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};
