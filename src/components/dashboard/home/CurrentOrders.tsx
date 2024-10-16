import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import courier from '@/assets/courier.png';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, User } from 'lucide-react';
import { ordersActions } from '@/store/orders';

const CurrentOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

  const ordersStatus = (status: string, style: string) => {
    if (style === 'text') {
      return status === 'Prepared' ? 'text-green-500' : status === 'Preparing' ? 'text-yellow-500' : status === 'Pending' ? 'text-red-500' : 'text-blue-500';
    }

    if (style === 'bg') {
      return status === 'Prepared' ? 'bg-green-500' : status === 'Preparing' ? 'bg-yellow-500' : status === 'Pending' ? 'bg-red-500' : 'bg-blue-500';
    }
  };

  const declineOrderHandler = (id: string) => {
    dispatch(ordersActions.declineOrder({ id }));
  };

  const acceptOrderHandler = (id: string) => {
    dispatch(ordersActions.acceptOrder({ id, status: 'Preparing' }));
  };

  const preparedOrderHandler = (id: string) => {
    dispatch(ordersActions.preparedOrder({ id, status: 'Prepared' }));
  };

  const pickedupOrderHandler = (id: string) => {
    dispatch(ordersActions.preparedOrder({ id, status: 'Picked up' }));
  };

  return (
    <>
      {/* <Card className='my-5 px-6 py-4'>
        <h1 className='font-semibold'>Current Orders</h1>
      </Card> */}
      <ul className='grid gap-5 mt-5'>
        {orders.map((order, ind) => (
          <li key={ind}>
            <Card>
              <div className='flex items-center justify-between py-[10px] px-4'>
                <div className='flex items-center'>
                  <div className='px-4'>
                    <img src={courier} alt='courier' className='size-7' />
                  </div>
                  <div className='pr-4 border-r-[1px]'>
                    <p className='font-semibold'>ID_ORDER #{ind + 1}</p>
                    <p className='text-muted-foreground text-xs'>{order.date}</p>
                  </div>
                  <div className='pl-4'>
                    <p className='font-semibold flex items-center gap-1 text-nowrap w-[175px]'>
                      <User size={20} />
                      {order.fullName}
                    </p>
                    <p className='text-muted-foreground text-xs flex gap-1 items-center'>
                      <CreditCard size={16} strokeWidth={1.5} />
                      {order.price}DH ({order.paymentMethod})
                    </p>
                  </div>
                </div>
                {/* STATUS ORDER */}
                <div className={`flex font-semibold items-center gap-2 w-[91px] ${ordersStatus(order.status, 'text')}`}>
                  <span className={`size-3 rounded-full ${ordersStatus(order.status, 'bg')}`}></span>
                  {order.status}
                </div>
                {/* ACTIONS */}
                <div className='flex gap-4 w-[170.49px] [&_*]:w-full'>
                  {/* Picked-up order */}
                  {(order.status === 'Prepared' || order.status === 'Picked up') && (
                    <Button className='!bg-black' disabled={order.status === 'Picked up'} onClick={() => pickedupOrderHandler(order.id)}>Mark as Picked-up</Button>
                  )}

                  {/* Preparing order */}
                  {order.status === 'Preparing' && (
                    <Button className='!bg-blue-500' onClick={() => preparedOrderHandler(order.id)}>Mark as Prepared</Button>
                  )}

                  {/* Pending order */}
                  {order.status === 'Pending' && (
                    <>
                      <Button variant='destructive' onClick={() => declineOrderHandler(order.id)}>Decline</Button>
                      <Button variant='success' onClick={() => acceptOrderHandler(order.id)}>Accept</Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CurrentOrders;