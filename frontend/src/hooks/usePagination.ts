import { useState, useCallback } from 'react';
import { CONFIG } from '../constants/config';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const [page, setPage] = useState<number>(options.initialPage || 1);
  const [limit, setLimit] = useState<number>(options.initialLimit || CONFIG.DEFAULT_PAGE_SIZE);

  const goToNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const changePage = useCallback((newPage: number) => {
    setPage(Math.max(newPage, 1));
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to page 1 on limit change
  }, []);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    limit,
    goToNextPage,
    goToPreviousPage,
    changePage,
    changeLimit,
    resetPagination,
  };
};
