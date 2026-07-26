import { notifyError } from './notifications';
import type { ApiErrorResponse } from '../types/api.types';

export const parseErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';

  if (typeof error === 'string') return error;

  const errObj = error as { status?: number; data?: ApiErrorResponse; message?: string };

  if (errObj.data?.message) {
    return errObj.data.message;
  }

  if (errObj.message) {
    return errObj.message;
  }

  return 'Server failed to process the request';
};

export const handleApiError = (error: unknown, fallbackMessage = 'Operation failed') => {
  const message = parseErrorMessage(error);
  notifyError(fallbackMessage, message);
};
