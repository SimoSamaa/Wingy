import type Order from '@/types/orderTypes';
import { ordersActions } from './orderSlice';
import { AppDispatch } from '../index';

export const fetchOrders = (page: number = 1) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:3000/orders?page=${page}`);

      if (!response.ok) {
        throw new Error('Could not fetch Orders!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const { orders, totalItems } = await sendRequest();
      const formattedOrders: Order[] = orders.map((order: Order & { _id: string; }) => {
        const { _id, ...rest } = order;
        const slicedId = order._id.slice(-7);
        const reversedId = slicedId.split('').reverse().join('');
        return { ...rest, id: _id, orderId: reversedId };
      });

      dispatch(ordersActions.setOrders({ orders: formattedOrders, totalItems }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};
