import React from 'react';
import type { Order } from '@/types/orderTypes';
import courier from '@/assets/orders/courier.png';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, User, PackageX } from 'lucide-react';
import OrdersButtons from '../includes/OrdersButtons';
import OrdersPagination from '../includes/OrdersPagination';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  orders: Order[];
  loading: boolean;
  selectedOrderId: string | null;
  onSelectOrder: (id: string) => void;
  onLoadOrders: () => Promise<void>;
  onChangeColorStatus: (status: string, style: string) => string;
  pagination: { currentPage: number, setCurrentPage: (page: number) => void; };
}

const CurrentOrders: React.FC<Props> = ({
  orders,
  loading,
  selectedOrderId,
  onSelectOrder,
  onLoadOrders,
  onChangeColorStatus,
  pagination,
}) => {
  return (
    <Card className='px-5 pb-4 mt-5 min-h-[45vh] relative max-[850px]:hidden'>
      <div className='py-[14px] flex justify-between'>
        <CardTitle>Current Orders</CardTitle>
        {/* CURRENT ORDERS PAGINATION */}
        <OrdersPagination className='home-current__order-pagination' pagination={pagination} />
      </div>
      {orders.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <PackageX className="size-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders for now</h3>
          <p className="text-gray-500 mb-4">When new orders come in, they will appear here.</p>
          <Button onClick={onLoadOrders}>Refresh Orders</Button>
        </div>
      )}
      {loading && (
        <div className='bg-card rounded-lg absolute inset-0'>
          <Skeleton className='size-full' />
        </div>
      )}
      {orders.length > 0 && !loading && (
        <ul>
          {orders.map((order) => (
            <li
              key={order.id}
              onClick={() => onSelectOrder(order.id)}
              className={
                `px-4 border-t cursor-pointer transition-colors hover:bg-muted/50
                ${selectedOrderId === order.id ? 'bg-accent' : ''}`
              }>
              <div className='flex items-center justify-between py-3'>
                <div className='flex items-center'>
                  <div>
                    <img src={courier} alt='courier' className='size-7' />
                  </div>
                  <div className='px-4 border-r-[1px] w-[135px]'>
                    <p className='font-semibold'>ID_{order?.orderId}</p>
                    <p className='text-muted-foreground text-xs'>{order.date}</p>
                  </div>
                  <div className='pl-4'>
                    <p className='font-semibold flex items-center gap-1 text-nowrap w-[175px]'>
                      <User size={20} />
                      {order.fullName}
                    </p>
                    <p className='text-muted-foreground text-xs flex gap-1 items-center'>
                      <CreditCard className='size-4 stroke-[1.5] ml-[2px]' />
                      {order.totalPrice}DH
                    </p>
                  </div>
                </div>
                {/* STATUS ORDER */}
                <div className={`flex font-semibold items-center gap-2 w-[91px] ${onChangeColorStatus(order.status, 'text')}`}>
                  <span className={`size-3 rounded-full ${onChangeColorStatus(order.status, 'bg')}`}></span>
                  {order.status}
                </div>
                {/* ACTIONS */}
                <OrdersButtons payload={{ id: order.id, status: order.status }} />
              </div>
            </li>
          ))}
        </ul >
      )}
    </Card>
  );
};

export default React.memo(CurrentOrders);