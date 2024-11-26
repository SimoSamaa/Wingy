import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import ratingReducer from './ratings/ratingsSlice';
import ordersReducer from './orders/orderSlice';
import productsReducer from './products/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rating: ratingReducer,
    orders: ordersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;