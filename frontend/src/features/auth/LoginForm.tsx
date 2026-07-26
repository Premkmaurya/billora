import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate(ROUTES.DASHBOARD);
    } catch {
      // Handled by useAuth / error utility
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

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
            Password
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-xs text-cyber-yellow hover:underline font-semibold"
          >
            Forgot Password?
          </Link>
        </div>
        <input
          type="password"
          {...register('password')}
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow transition-colors"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-400 font-semibold">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-cyber-yellow text-dark-text font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyber-yellow/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? <LoadingSpinner size={18} /> : 'Sign In'}
      </button>
    </form>
  );
};
