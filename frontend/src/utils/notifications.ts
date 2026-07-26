import { toast } from 'sonner';

export const notifySuccess = (message: string, description?: string) => {
  toast.success(message, { description });
};

export const notifyError = (message: string, description?: string) => {
  toast.error(message, { description });
};

export const notifyInfo = (message: string, description?: string) => {
  toast.info(message, { description });
};

export const notifyWarning = (message: string, description?: string) => {
  toast.warning(message, { description });
};

export const notifyLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId?: string | number) => {
  toast.dismiss(toastId);
};
