import type Product from '@/types/productsTypes';
import sendRequest from '@/lib/sendRequest';
import { productsActions } from './productsSlice';
import { AppDispatch } from '../index';

export const fetchProducts = () => {
  return async () => { };
};

export const addProduct = (product: Omit<Product, 'id'>) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const res = await sendRequest(null, 'products.json', 'POST', product);
      const id = res.name;
      dispatch(productsActions.setAddProduct({ ...product, id }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await sendRequest(null, 'products.json', 'DELETE', productId);
      dispatch(productsActions.setDeleteProduct(productId));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const editProduct = (product: Product) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await sendRequest(null, 'products.json', 'PUT', product);
      dispatch(productsActions.setEditProduct({ ...product }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};