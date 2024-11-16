import type Product from '@/types/productsTypes';
import sendRequest from '@/lib/sendRequest';
import { productsActions } from './productsSlice';
import { AppDispatch, RootState } from '../index';

function shouldUpdate(lastFetch: number | null): boolean {
  if (!lastFetch) return true; // If lastFetch is null, fetch products
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastFetch;
  return timeDifference > 1000 * 60 * 60;
}

export const fetchProducts = () => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<void> => {

    const lastFetch = getState().products.lastFetch;
    if (!shouldUpdate(lastFetch)) return;

    try {
      type Response = Omit<Product, 'id'> & { _id: string; __v: number; };
      const res: Response[] = await sendRequest('products');
      const products = res.map((product: Response) => {
        const { __v: _, _id, ...rest } = product;
        return { ...rest, id: _id };
      });

      dispatch(productsActions.setProducts(products));
      dispatch(productsActions.setLastFetch(new Date().getTime()));

    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const addProduct = (product: Omit<Product, 'id'>) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const res: Omit<Product, 'id'> & { _id: string; } = await sendRequest('products', 'POST', product);
      dispatch(productsActions.setAddProduct({ ...product, id: res._id }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const uploadProductImage = (path: string, image: Blob) => {
  return async (): Promise<string> => {
    const formData = new FormData();
    formData.append('path', path);
    formData.append('image', image);

    try {
      const res: { productImage: string; } = await sendRequest('upload-image', 'POST', formData);
      return res.productImage;
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await sendRequest(`products/${productId}`, 'DELETE');
      dispatch(productsActions.setDeleteProduct(productId));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};

export const editProduct = (product: Product) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await sendRequest(`products/${product.id}`, 'PUT', product);
      dispatch(productsActions.setEditProduct({ ...product }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};