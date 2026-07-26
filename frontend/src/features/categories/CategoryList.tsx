import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tags } from 'lucide-react';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../services/categoryApi';
import type { Category } from '../../types/category.types';
import { CategoryModal } from './CategoryModal';
import { PageHeader } from '../../components/shared/PageHeader';
import { TableSkeleton } from '../../components/shared/Skeleton';
import { EmptyState } from '../../components/shared/EmptyState';
import { ErrorState } from '../../components/shared/ErrorState';
import { notifySuccess } from '../../utils/notifications';

export const CategoryList: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories = data?.data || [];

  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (category: Category) => {
    if (window.confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      try {
        await deleteCategory(category.id).unwrap();
        notifySuccess('Category Deleted', `Removed "${category.name}"`);
      } catch {
        // Handled globally
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Categories"
        subtitle="Organize store inventory by categories"
        action={
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyber-yellow/10"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        }
      />

      {isLoading ? (
        <TableSkeleton rows={4} columns={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : categories.length === 0 ? (
        <EmptyState
          title="No Categories Yet"
          description="Create product categories to organize your shop inventory efficiently."
          actionLabel="Create First Category"
          onAction={handleOpenCreate}
          icon={<Tags size={28} />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-surface/50 border border-white/10 p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white group-hover:text-cyber-yellow transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-cyber-yellow bg-cyber-yellow/10 px-2 py-1 rounded-full border border-cyber-yellow/20">
                    {category.productCount || 0} Products
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium line-clamp-2">
                  {category.description || 'No description provided.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleOpenEdit(category)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  title="Edit Category"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
};
