import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/products/actions.ts';
import { AppDispatch } from '@/store/index.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { useToast } from '@/hooks/use-toast';
import DataTable from '@/components/dashboard/products/DataTable';

let isMounted: boolean = true;

const ProductsPage = () => {
  console.log('products page render');
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const products = useSelector((state: RootState) => state.products.products);
  const [isLoading, setLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    if (isMounted) {
      isMounted = false;
      return;
    }

    try {
      setLoading(true);
      await dispatch(fetchProducts());
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, toast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <DataTable data={products} loadingState={{ isLoading, loadProducts }} />
    </>
  );
};

export default ProductsPage;