import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ordersInfo: {
    totalOrders: '28,345',
    newOrdersToday: '13',
    totalRevenue: '3600',
    revenueSteam: '3',
  },
  orders: [
    { id: 'c1', date: '17 Fev, 01:30 PM', fullName: 'Ahmed Noukta', price: '90', paymentMethod: 'Paid Online', status: 'Prepared' },
    { id: 'c2', date: '17 Fev, 01:30 PM', fullName: 'Mohamed Idbarhim', price: '80', paymentMethod: 'CON', status: 'Preparing' },
    { id: 'c3', date: '17 Fev, 01:30 PM', fullName: 'Achraf kayan', price: '60', paymentMethod: 'CON', status: 'Pending' },
    { id: 'c4', date: '17 Fev, 01:30 PM', fullName: 'Salma Barik', price: '90', paymentMethod: 'CON', status: 'Pending' },
  ]
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
    }
  }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;