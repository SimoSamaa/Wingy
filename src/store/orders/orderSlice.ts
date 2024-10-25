import { createSlice } from '@reduxjs/toolkit';
import Order from '@/types/orderTypes';

const initialState = {
  ordersInfo: {
    totalOrders: '28,345',
    newOrdersToday: '13',
    totalRevenue: '3600',
    revenueSteam: '3',
  },
  totalItems: 0,
  orders: [
    // {
    //   id: 'c1',
    //   date: '17 Fev, 01:30 PM',
    //   fullName: 'Ahmed Noukta',
    //   totalPrice: '90',
    //   paymentMethod: 'Paid Online',
    //   status: 'Prepared',
    //   details: [
    //     { name: "pizza", count: 3, price: 30 },
    //     { name: "tacos", count: 2, price: 30 },
    //     { name: "noodles", count: 2, price: 40 },
    //     { name: "noodles", count: 2, price: 40 },
    //     { name: "noodles", count: 2, price: 40 },
    //     { name: "noodles", count: 2, price: 40 },
    //   ],
    //   address: 'Rue 12, Marrakech',
    //   email: 'test1@gmail.com',
    //   phone: '0612345678',
    // },
    // {
    //   id: 'c2',
    //   date: '17 Fev, 01:30 PM',
    //   fullName: 'Mohamed Idbarhim',
    //   totalPrice: '80',
    //   paymentMethod: 'CON',
    //   status: 'Preparing',
    //   details: [
    //     { name: "burger", count: 4, price: 40 },
    //     { name: "fries", count: 2, price: 20 },
    //   ],
    //   address: 'Avenue Hassan II, Casablanca',
    //   email: 'mohamed.ibrahim23@mail.com',
    //   phone: '0623456789',
    // },
    // {
    //   id: 'c3',
    //   date: '17 Fev, 01:30 PM',
    //   fullName: 'Achraf Kayan',
    //   totalPrice: '60',
    //   paymentMethod: 'CON',
    //   status: 'Pending',
    //   details: [
    //     { name: "shawarma", count: 3, price: 45 },
    //     { name: "soda", count: 1, price: 15 },
    //   ],
    //   address: 'Boulevard El Fida, Casablanca',
    //   email: 'achraf.kayan@mail.com',
    //   phone: '0634567890',
    // },
    // {
    //   id: 'c4',
    //   date: '17 Fev, 01:30 PM',
    //   fullName: 'Salma Barik',
    //   totalPrice: '90',
    //   paymentMethod: 'CON',
    //   status: 'Pending',
    //   details: [
    //     { name: "sushi", count: 5, price: 50 },
    //     { name: "noodles", count: 2, price: 40 },
    //   ],
    //   address: 'Rue Tarik Ibn Ziad, Rabat',
    //   email: 'salma.barik@mail.com',
    //   phone: '0645678901',
    // }
  ] as Order[]
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
    }
  }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;