import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Order } from '@/types/orderTypes';

interface DataTableProps {
  orders: Order[];
  isLoading: boolean;
  onloadOrders: () => void;
  onGetStatusClassName: (status: string) => string;
  selectedOrder: {
    setSelectedOrderId: (id: string) => void;
    selectedOrderId: string | null;
  };
}

const ordersTable: React.FC<DataTableProps> = ({
  orders,
  isLoading,
  onloadOrders,
  onGetStatusClassName,
  selectedOrder
}) => {
  return (
    <div>
      <div className="mt-4 bg-background border rounded-md h-[522.8px] relative">
        {orders && orders.length > 0
          ? (
            <Table className='min-w-[550px]'>
              <TableHeader className='bg-muted/50'>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className='text-center'>Date</TableHead>
                  <TableHead className='text-center'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, ind) => (
                  <TableRow
                    key={order?.id}
                    className={`cursor-pointer ${order?.id === selectedOrder.selectedOrderId ? 'bg-muted/50' : ''}`}
                    onClick={() => selectedOrder.setSelectedOrderId(order.id)}>
                    <TableCell className="font-medium">#{ind + 1}</TableCell>
                    <TableCell>{order?.fullName}</TableCell>
                    <TableCell>{order?.totalPrice}DH</TableCell>
                    <TableCell className='text-center'>{order?.date}</TableCell>
                    <TableCell className='flex justify-center'>
                      <span className={`${onGetStatusClassName(order.status)} border px-3 py-1 rounded-sm`}>{order?.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
          : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {!orders.length && !isLoading && (
                <div className='text-center grid gap-2 font-semibold'>
                  No Orders
                  {orders.length === 0 && (
                    <Button size='sm' onClick={onloadOrders}>Refresh Products</Button>
                  )}
                </div>
              )}
              {isLoading && (<Loader2 className="animate-spin text-primary size-20" />)}
            </div>
          )}
      </div>
      <div className="flex items-center justify-between mt-7">
        <div>INFO</div>
        <div className="flex gap-2">
          <button
            className='size-[30px] disabled:cursor-not-allowed disabled:bg-muted rounded border grid place-items-center bg-white hover:bg-accent duration-300 transition-colors ease-out'>
            <ChevronLeft size={16} />
          </button>
          <button
            className='size-[30px] disabled:cursor-not-allowed disabled:bg-muted rounded border grid place-items-center bg-white hover:bg-accent duration-300 transition-colors ease-out'>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ordersTable;