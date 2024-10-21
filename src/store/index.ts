import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import ratingReducer from './starRatings';
import ordersReducer from './orders/orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rating: ratingReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;