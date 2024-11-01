import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import DataTable from '@/components/dashboard/products/DataTable';

const ProductsPage = () => {
  const products = useSelector((state: RootState) => state.products.products);

  console.log('products page render');

  return (
    <>
      <DataTable data={products} />
    </>
  );
};

export default ProductsPage;