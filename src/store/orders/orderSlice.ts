import { createSlice } from '@reduxjs/toolkit';
import type { Order, InitialOrdersState, OrdersInfo } from '@/types/orderTypes';

const initialState: InitialOrdersState = {
  ordersInfo: {},
  totalItems: 0,
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    declineOrder(state, { payload }: { payload: { id: string; }; }) {
      state.orders = state.orders.filter(order => order.id !== payload.id);
      // SEND REQUEST TO SERVER TO CHANGE STATUS TO DECLINED
    },
    acceptOrder(state, { payload }: { payload: { id: string; status: string; }; }) {
      state.orders = state.orders.map(order => order.id === payload.id ? { ...order, status: payload.status } : order);
      // SEND REQUEST TO SERVER TO CHANGE STATUS TO Preparing
    },
    preparedOrder(state, { payload }: { payload: { id: string; status: string; }; }) {
      state.orders = state.orders.map(order => order.id === payload.id ? { ...order, status: payload.status } : order);
      // SEND REQUEST TO SERVER TO CHANGE STATUS TO Prepared
    },
    pickedupOrder(state, { payload }: { payload: { id: string; status: string; }; }) {
      state.orders = state.orders.map(order => order.id === payload.id ? { ...order, status: payload.status } : order);
      // SEND REQUEST TO SERVER TO CHANGE STATUS TO Picked-up
    },
    setOrders(state, { payload }: { payload: { orders: Order[]; totalItems: number; }; }) {
      state.orders = payload.orders;
      state.totalItems = payload.totalItems;
    },
    steOrdersInfo(state, { payload }: { payload: { ordersInfo: OrdersInfo; }; }) {
      state.ordersInfo = payload.ordersInfo;
    }
  }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;