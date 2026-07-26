import React from 'react';
import { X } from 'lucide-react';
import type { Customer } from '../../types/customer.types';
import { CustomerForm } from './CustomerForm';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, customer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-xl p-6 relative space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white">
            {customer ? 'Edit Customer Profile' : 'Add New Customer'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <CustomerForm customer={customer} onSuccess={onClose} onCancel={onClose} />
      </div>
    </div>
  );
};
