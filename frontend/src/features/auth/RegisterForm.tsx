import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  organizationName: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { register: registerAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      organizationName: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerAuth(data);
      navigate(ROUTES.DASHBOARD);
    } catch {
      // Handled by useAuth
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Full Name
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="Rajesh Kumar"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow transition-colors"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400 font-semibold">{errors.name.message}</p>
        )}
      </div>

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
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Shop / Business Name
        </label>
        <input
          type="text"
          {...register('organizationName')}
          placeholder="Rajesh Supermarket"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Password
        </label>
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
        className="w-full py-3.5 bg-cyber-yellow text-dark-text font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyber-yellow/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
      >
        {isLoading ? <LoadingSpinner size={18} /> : 'Create Account'}
      </button>
    </form>
  );
};
