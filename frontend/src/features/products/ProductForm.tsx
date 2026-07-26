import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Product, CreateProductData } from '../../types/product.types';
import { useGetCategoriesQuery } from '../../services/categoryApi';
import { useCreateProductMutation, useUpdateProductMutation } from '../../services/productApi';
import { notifySuccess } from '../../utils/notifications';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  sku: z.string().min(2, 'SKU / Barcode is required'),
  hsnCode: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  costPrice: z.number().min(0).optional(),
  stock: z.number().int('Stock must be an integer').min(0),
  minStockAlert: z.number().int().min(0).optional(),
  unit: z.string(),
  taxRate: z.number().min(0).max(100),
  categoryId: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess, onCancel }) => {
  const { data: categoryData } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const categories = categoryData?.data || [];
  const isEditing = Boolean(product);
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      hsnCode: '',
      price: 0,
      costPrice: 0,
      stock: 10,
      minStockAlert: 5,
      unit: 'PCS',
      taxRate: 18,
      categoryId: '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sku: product.sku,
        hsnCode: product.hsnCode || '',
        price: product.price,
        costPrice: product.costPrice || 0,
        stock: product.stock,
        minStockAlert: product.minStockAlert || 5,
        unit: product.unit || 'PCS',
        taxRate: product.taxRate ?? 18,
        categoryId: product.categoryId || '',
      });
    } else {
      reset({
        name: '',
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        hsnCode: '',
        price: 0,
        costPrice: 0,
        stock: 10,
        minStockAlert: 5,
        unit: 'PCS',
        taxRate: 18,
        categoryId: '',
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditing && product) {
        await updateProduct({ id: product.id, data }).unwrap();
        notifySuccess('Product Updated', `Updated "${data.name}"`);
      } else {
        await createProduct(data as CreateProductData).unwrap();
        notifySuccess('Product Created', `Added "${data.name}" to inventory`);
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
            Product Name *
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="Basmati Rice 5kg"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            SKU / Barcode *
          </label>
          <input
            type="text"
            {...register('sku')}
            placeholder="SKU-1001"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.sku && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.sku.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            {...register('categoryId')}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            HSN Code
          </label>
          <input
            type="text"
            {...register('hsnCode')}
            placeholder="1006.30"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-cyber-yellow"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Selling Price (₹) *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.price && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Cost Price (₹)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('costPrice', { valueAsNumber: true })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Initial Stock *
          </label>
          <input
            type="number"
            {...register('stock', { valueAsNumber: true })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
          {errors.stock && <p className="mt-1 text-xs text-red-400 font-semibold">{errors.stock.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Low Stock Alert Level
          </label>
          <input
            type="number"
            {...register('minStockAlert', { valueAsNumber: true })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Unit
          </label>
          <select
            {...register('unit')}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          >
            <option value="PCS">PCS (Pieces)</option>
            <option value="KG">KG (Kilograms)</option>
            <option value="LTR">LTR (Liters)</option>
            <option value="BOX">BOX (Boxes)</option>
            <option value="PACK">PACK (Packs)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            GST Tax Rate (%) *
          </label>
          <select
            {...register('taxRate', { valueAsNumber: true })}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-yellow"
          >
            <option value="0">0% (Exempted)</option>
            <option value="5">5% GST</option>
            <option value="12">12% GST</option>
            <option value="18">18% GST</option>
            <option value="28">28% GST</option>
          </select>
        </div>
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
          {isLoading ? <LoadingSpinner size={16} /> : isEditing ? 'Update Product' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};
