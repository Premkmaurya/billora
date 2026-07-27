import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package, AlertTriangle } from 'lucide-react';
import { useGetProductsQuery, useDeleteProductMutation } from '../../services/productApi';
import { useGetCategoriesQuery } from '../../services/categoryApi';
import type { Product } from '../../types/product.types';
import { ProductModal } from './ProductModal';
import { PageHeader } from '../../components/shared/PageHeader';
import { TableSkeleton } from '../../components/shared/Skeleton';
import { EmptyState } from '../../components/shared/EmptyState';
import { ErrorState } from '../../components/shared/ErrorState';
import { useDebounce } from '../../hooks/useDebounce';
import { usePagination } from '../../hooks/usePagination';
import { formatCurrency } from '../../utils/formatters';
import { notifySuccess } from '../../utils/notifications';

export const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 350);

  const { page, limit, goToNextPage, goToPreviousPage, changePage } = usePagination();

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    page,
    limit,
    search: debouncedSearch || undefined,
    categoryId: selectedCategory || undefined,
  });

  const { data: categoryData } = useGetCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const products = data?.data?.products || [];
  const totalPages = data?.data?.pagination || 1;
  const categories = categoryData?.categories || [];

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Delete product "${product.name}"?`)) {
      try {
        await deleteProduct(product.id).unwrap();
        notifySuccess('Product Deleted', `Removed "${product.name}"`);
      } catch {
        // Handled globally
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products & Inventory"
        subtitle="Manage product prices, barcodes, stocks, and GST tax brackets"
        action={
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyber-yellow/10"
          >
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        }
      />

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-surface/40 p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, SKU, barcode..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyber-yellow"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={6} columns={6} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No Products Found"
          description="Add items to your shop inventory to start creating fast invoices."
          actionLabel="Add First Product"
          onAction={handleOpenCreate}
          icon={<Package size={28} />}
        />
      ) : (
        <div className="bg-surface/50 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4 font-mono">SKU / HSN</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock</th>
                  <th className="py-4 px-4">Tax</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => {
                  const isLowStock = product.stock <= (product.minStockAlert || 5);
                  return (
                    <tr key={product._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm">{product.name}</div>
                        <span className="text-[10px] text-gray-500 font-mono">Unit: {product.unit}</span>
                      </td>
                      <td className="py-4 px-4 font-mono text-gray-400">
                        <div>{product.sku}</div>
                        {product.hsnCode && (
                          <span className="text-[10px] text-cyber-yellow">HSN: {product.hsnCode}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {product.categoryName || 'Uncategorized'}
                      </td>
                      <td className="py-4 px-4 font-bold text-white">
                        {formatCurrency(product.sellingPrice)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                            isLowStock
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {isLowStock && <AlertTriangle size={12} />}
                          {product.stock} {product.unit}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-cyber-yellow">
                        {product.taxRate}%
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            title="Edit Item"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                            title="Delete Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">
                Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={page <= 1}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 hover:text-white disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      page === i + 1
                        ? 'bg-cyber-yellow text-dark-text'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={goToNextPage}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 hover:text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};
