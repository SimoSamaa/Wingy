import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  className: string,
  pagination: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
  };
}

const OrdersPagination: React.FC<Props> = ({ pagination, className }) => {
  const totalItems = useSelector((state: RootState) => state.orders.totalItems);
  const perPage = 4;
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / perPage); // Calculate total pages
  }, [totalItems, perPage]);

  return (
    <div className={`gap-2 hidden ${className}`}>
      <button
        className="border rounded font-semibold grid place-items-center text-sm size-[25px] hover:bg-accent transition-colors duration-300 ease-out disabled:cursor-not-allowed disabled:bg-muted"
        onClick={() => pagination.setCurrentPage(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
      > <ChevronLeft size={16} /> </button>
      <button
        className="border rounded font-semibold grid place-items-center text-sm size-[25px] hover:bg-accent transition-colors duration-300 ease-out disabled:cursor-not-allowed disabled:bg-muted"
        onClick={() => pagination.setCurrentPage(pagination.currentPage + 1)}
        disabled={pagination.currentPage === totalPages}
      > <ChevronRight size={16} /> </button>
    </div>
  );
};

export default OrdersPagination;