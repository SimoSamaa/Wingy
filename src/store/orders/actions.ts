import type { Order, OrdersInfo } from '@/types/orderTypes';
import sendRequest from '@/lib/sendRequest';
import { ordersActions } from './orderSlice';
import { AppDispatch } from '../index';

export const fetchOrders = (page: number = 1) => {
  return async (dispatch: AppDispatch): Promise<void> => {

    try {

      type ResponseData = { orders: (Omit<Order & { _id: string; }, 'id'>)[]; totalItems: number; };
      const { orders, totalItems }: ResponseData = await sendRequest('orders', 'GET', null, page);

      const formattedOrders = orders.map((order) => {
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

export const fetchOrdersInfo = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const { ordersInfo }: { ordersInfo: OrdersInfo; } = await sendRequest('orders/info');
      dispatch(ordersActions.steOrdersInfo({ ordersInfo }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};
