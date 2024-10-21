import React from 'react';
import { useDispatch } from 'react-redux';
import { ordersActions } from '@/store/orders/orderSlice';
import { Button } from '@/components/ui/button';

type ClickEvent = React.MouseEvent<HTMLButtonElement>;

const OrdersButtons: React.FC<{ payload: { id: string; status: string; }; }> = ({ payload }) => {
  const dispatch = useDispatch();

  const declineOrderHandler = (e: ClickEvent, id: string) => {
    e.stopPropagation();
    dispatch(ordersActions.declineOrder({ id }));
  };

  const acceptOrderHandler = (e: ClickEvent, id: string) => {
    e.stopPropagation();
    dispatch(ordersActions.acceptOrder({ id, status: 'Preparing' }));
  };

  const preparedOrderHandler = (e: ClickEvent, id: string) => {
    e.stopPropagation();
    dispatch(ordersActions.preparedOrder({ id, status: 'Prepared' }));
  };

  const pickedupOrderHandler = (e: ClickEvent, id: string) => {
    e.stopPropagation();
    dispatch(ordersActions.preparedOrder({ id, status: 'Picked up' }));
  };

  return (
    <div className='flex gap-4 w-[170.49px] [&_*]:w-full'>
      {/* Picked-up payload */}
      {(payload.status === 'Prepared' || payload.status === 'Picked up') && (
        <Button
          variant='blue'
          disabled={payload.status === 'Picked up'}
          onClick={(e) => pickedupOrderHandler(e, payload.id)}>Mark as Picked-up</Button>
      )}

      {/* Preparing payload */}
      {payload.status === 'Preparing' && (
        <Button
          variant='green'
          onClick={(e) => preparedOrderHandler(e, payload.id)}>Mark as Prepared</Button>
      )}

      {/* Pending payload */}
      {payload.status === 'Pending' && (
        <>
          <Button
            variant='destructive'
            onClick={(e) => declineOrderHandler(e, payload.id)}>Decline</Button>
          <Button
            variant='yellow'
            onClick={(e) => acceptOrderHandler(e, payload.id)}>Accept</Button>
        </>
      )}
    </div>
  );
};

export default OrdersButtons;