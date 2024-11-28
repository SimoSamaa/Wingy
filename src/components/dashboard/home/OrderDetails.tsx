import React, { useMemo } from 'react';
import type { Order } from '@/types/orderTypes';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import OrdersButtons from '../includes/OrdersButtons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  orders: Order[];
  orderId: string | null;
  onChangeColorStatus: (status: string, style: string) => string;
  onSelectOrder: (id: string) => void;
  loading: boolean;
  pagination: {
    currentPage: number,
    setCurrentPage: (page: number) => void;
  };
}

const OrderDetails: React.FC<Props> = ({
  orders,
  orderId,
  loading,
  onChangeColorStatus,
  onSelectOrder,
  pagination
}) => {

  const orderIndex = useMemo(() => {
    return orders.findIndex((order) => order.id === orderId);
  }, [orders, orderId]);

  const order = orders[orderIndex];

  const handelNext = () => {
    if (!(orderIndex < orders.length - 1)) return;
    onSelectOrder(orders[orderIndex + 1].id);
  };

  const handelPrev = () => {
    if (!(orderIndex > 0)) return;
    onSelectOrder(orders[orderIndex - 1].id);
  };

  return (
    <Card
      className="overflow-hidden flex flex-col justify-between max-xl:mt-5 h-[calc(100vh-88px)] relative" x-chunk="dashboard-05-chunk-4"
    >
      {loading ? (<Skeleton className='absolute inset-0' />)
        : (
          <>
            {orders && orders.length === 0
              ? (
                <h2 className='font-semibold text-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                  No order details
                </h2>
              )
              : (
                <>
                  <CardHeader className="flex flex-row items-center justify-between bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        ID_{order?.orderId}
                      </CardTitle>
                      <div className='flex gap-1 items-center'>
                        <span className={`size-3 rounded-full ${onChangeColorStatus(order?.status ?? '', 'bg')}`}></span>
                        <p className={`font-semibold ${onChangeColorStatus(order?.status ?? '', 'text')}`}>{order?.status}</p>
                      </div>
                    </div>
                    {order && <OrdersButtons payload={{ id: order.id, status: order.status }} />}
                  </CardHeader>
                  <CardContent className="p-6 text-sm flex-1 sidebar_order-details overflow-auto">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        {order?.details.map((detail, ind) => (
                          <li key={ind} className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {detail.name} x <span>{detail.count}</span>
                            </span>
                            <span>{detail.price}DH</span>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-2" />
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>{order?.totalPrice}DH</span>
                      </li>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <div className="grid gap-3">
                        <div className="font-semibold">Address Information</div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                          {order?.address}
                        </address>
                      </div>

                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>{order?.fullName}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd>
                            <a href="mailto:">{order?.email}</a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Phone</dt>
                          <dd>
                            <a href="tel:">{order?.phone}</a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Date</span>
                      <span>{order?.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      {orderIndex + 1} of {orders.length}
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={handelPrev}
                        disabled={orderIndex === 0}
                        className='size-[30px] disabled:cursor-not-allowed disabled:bg-muted rounded border grid place-items-center bg-white hover:bg-accent duration-300 transition-colors ease-out'>
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={handelNext}
                        disabled={orderIndex === orders.length - 1}
                        className='size-[30px] disabled:cursor-not-allowed disabled:bg-muted rounded border grid place-items-center bg-white hover:bg-accent duration-300 transition-colors ease-out'>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </CardFooter>
                </>
              )}
          </>
        )}
    </Card>
  );
};

export default React.memo(OrderDetails);