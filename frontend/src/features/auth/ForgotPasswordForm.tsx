import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../services/authApi';
import { ROUTES } from '../../constants/routes';
import { notifySuccess } from '../../utils/notifications';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export const ForgotPasswordForm: React.FC = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormData) => {
    try {
      await forgotPassword(data).unwrap();
      notifySuccess('Reset link sent!', 'Check your email inbox for instructions.');
    } catch {
      // Handled globally
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Email Address
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="shop@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow transition-colors"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400 font-semibold">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-cyber-yellow text-dark-text font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyber-yellow/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? <LoadingSpinner size={18} /> : 'Send Reset Link'}
      </button>

      <div className="text-center">
        <Link to={ROUTES.LOGIN} className="text-xs text-gray-400 hover:text-white font-semibold">
          ← Back to Login
        </Link>
      </div>
    </form>
  );
};
