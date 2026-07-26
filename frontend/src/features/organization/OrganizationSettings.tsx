import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetOrganizationQuery, useUpdateOrganizationMutation } from '../../services/organizationApi';
import { PageHeader } from '../../components/shared/PageHeader';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { Skeleton } from '../../components/shared/Skeleton';
import { notifySuccess } from '../../utils/notifications';

const orgSchema = z.object({
  name: z.string().min(2, 'Organization name is required'),
  gstin: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  currency: z.string(),
  taxRate: z.number().min(0).max(100),
});

type OrgFormData = z.infer<typeof orgSchema>;

export const OrganizationSettings: React.FC = () => {
  const { data, isLoading } = useGetOrganizationQuery();
  const [updateOrg, { isLoading: isSaving }] = useUpdateOrganizationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrgFormData>({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: '',
      currency: 'INR',
      taxRate: 18,
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name || '',
        gstin: data.data.gstin || '',
        address: data.data.address || '',
        phone: data.data.phone || '',
        email: data.data.email || '',
        currency: data.data.currency || 'INR',
        taxRate: data.data.taxRate ?? 18,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: OrgFormData) => {
    try {
      await updateOrg(formData).unwrap();
      notifySuccess('Organization Updated', 'Your store profile has been saved.');
    } catch {
      // Handled globally
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Organization Settings"
        subtitle="Manage your store details, GSTIN number, and default tax rates"
      />

      <div className="bg-surface/50 border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Business / Store Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                GSTIN Number
              </label>
              <input
                type="text"
                {...register('gstin')}
                placeholder="27AAAAA0000A1Z5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-cyber-yellow uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                {...register('phone')}
                placeholder="+91 9876543210"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Store Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="store@billora.app"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Store Address
            </label>
            <textarea
              {...register('address')}
              rows={3}
              placeholder="Shop No. 12, Main Market, Mumbai"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Currency Symbol
              </label>
              <select
                {...register('currency')}
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Default GST Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('taxRate', { valueAsNumber: true })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow"
              />
              {errors.taxRate && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.taxRate.message}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <LoadingSpinner size={16} /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
