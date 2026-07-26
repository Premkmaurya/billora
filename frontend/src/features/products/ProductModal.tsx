import React from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../types/product.types';
import { ProductForm } from './ProductForm';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-2xl p-6 relative space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white">
            {product ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <ProductForm product={product} onSuccess={onClose} onCancel={onClose} />
      </div>
    </div>
  );
};
