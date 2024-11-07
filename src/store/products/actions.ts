import type Product from '@/types/productsTypes';
import sendRequest from '@/lib/sendRequest';
import { productsActions } from './productsSlice';
import { AppDispatch } from '../index';

export const fetchProducts = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      interface ProductResponse {
        [key: string]: Product;
      }
      const res: ProductResponse = await sendRequest(null, 'products.json');
      const products: Product[] = res ? Object.keys(res).map((key) => ({ ...res[key], id: key })) : [];
      dispatch(productsActions.setProducts(products));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const addProduct = (product: Omit<Product, 'id'>) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const res = await sendRequest(null, 'products.json', 'POST', product);
      const id = res.name as string;
      dispatch(productsActions.setAddProduct({ ...product, id }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await sendRequest(null, `products/${productId}.json`, 'DELETE');
      dispatch(productsActions.setDeleteProduct(productId));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const editProduct = (product: Product) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await sendRequest(null, `products/${product.id}.json`, 'PUT', product);
      dispatch(productsActions.setEditProduct({ ...product }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};