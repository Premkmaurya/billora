import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Customer, CreateCustomerData } from '../../types/customer.types';
import { useCreateCustomerMutation, useUpdateCustomerMutation } from '../../services/customerApi';
import { notifySuccess } from '../../utils/notifications';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

const customerSchema = z.object({
  name: z.string().min(2, 'Customer name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional(),
  gstin: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customer?: Customer | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSuccess, onCancel }) => {
  const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation();
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  const isEditing = Boolean(customer);
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        phone: customer.phone,
        email: customer.email || '',
        address: customer.address || '',
        gstin: customer.gstin || '',
      });
    } else {
      reset({
        name: '',
        phone: '',
        email: '',
        address: '',
        gstin: '',
      });
    }
  }, [customer, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (isEditing && customer) {
        await updateCustomer({ id: customer.id, data }).unwrap();
        notifySuccess('Customer Updated', `Updated "${data.name}"`);
      } else {
        await createCustomer(data as CreateCustomerData).unwrap();
        notifySuccess('Customer Added', `Added "${data.name}" to directory`);
      }
      onSuccess();
    } catch {
      // Handled globally
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Customer Name *
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="Suresh Kumar"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Mobile Number *
          </label>
          <input
            type="text"
            {...register('phone')}
            placeholder="+91 9876543210"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="suresh@gmail.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            GSTIN (Optional)
          </label>
          <input
            type="text"
            {...register('gstin')}
            placeholder="27AAAAA0000A1Z5"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyber-yellow uppercase"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
          Billing Address
        </label>
        <textarea
          {...register('address')}
          rows={2}
          placeholder="Flat 201, Green Apartments, Mumbai"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold rounded-xl hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? <LoadingSpinner size={16} /> : isEditing ? 'Update Customer' : 'Save Customer'}
        </button>
      </div>
    </form>
  );
};
