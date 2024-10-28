import { createSlice } from '@reduxjs/toolkit';
import Product from '@/types/productsTypes';

const initialState = {
  products: [] as Product[]
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
