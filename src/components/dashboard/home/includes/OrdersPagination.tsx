import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

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
  const totalPages = Math.ceil(totalItems / perPage); // Calculate total pages

  return (
    <div className={`gap-2 hidden ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={
            `border rounded font-semibold grid place-items-center text-sm size-[25px] hover:bg-accent transition-colors duration-300 ease-out
          ${pagination.currentPage === index + 1 ? 'bg-accent' : ''}`
          }
          onClick={() => pagination.setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default OrdersPagination;