import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { Category, CreateCategoryData } from '../../types/category.types';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../services/categoryApi';
import { notifySuccess } from '../../utils/notifications';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, category }) => {
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const isEditing = Boolean(category);
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || '',
      });
    } else {
      reset({ name: '', description: '' });
    }
  }, [category, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing && category) {
        await updateCategory({ id: category._id, data }).unwrap();
        notifySuccess('Category Updated', `Updated "${data.name}"`);
      } else {
        await createCategory(data as CreateCategoryData).unwrap();
        notifySuccess('Category Created', `Created "${data.name}"`);
      }
      onClose();
    } catch {
      // Handled globally
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-md p-6 relative space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white">
            {isEditing ? 'Edit Category' : 'Create New Category'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Category Name *
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Grains & Pulses"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Essential kitchen supplies, rice, dal..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-yellow resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold rounded-xl hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <LoadingSpinner size={16} /> : isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
