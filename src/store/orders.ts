import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ordersInfo: {
    totalOrders: '28,345',
    newOrdersToday: '13',
    totalRevenue: '3600',
    revenueSteam: '3',
  },
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {}
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;