import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import { fetchOrders } from '@/store/orders/actions';
import TotalOrders from '@/components/dashboard/home/TotalOrders';
import NewOrders from '@/components/dashboard/home/NewOrders';
import TotalRevenue from '@/components/dashboard/home/TotalRevenue';
import RevenueSteam from '@/components/dashboard/home/RevenueSteam';
import Rating from '@/components/dashboard/home/Rating';
import CurrentOrders from '@/components/dashboard/home/CurrentOrders';
import OrderDetails from '@/components/dashboard/home/OrderDetails';
let isMounted = true;

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    if (isMounted) {
      isMounted = false;
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(fetchOrders(currentPage));
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }, [dispatch, currentPage]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders]);

  const orderStatus = (status: string, style: string) => {
    if (style === 'text') {
      return status === 'Prepared'
        ? 'text-green-500' : status === 'Preparing'
          ? 'text-yellow-500' : status === 'Pending'
            ? 'text-red-500' : 'text-blue-500';
    }

    if (style === 'bg') {
      return status === 'Prepared'
        ? 'bg-green-500' : status === 'Preparing'
          ? 'bg-yellow-500' : status === 'Pending'
            ? 'bg-red-500' : 'bg-blue-500';
    }

    return '';
  };

  return (
    <main className="grid grid-cols-[1fr_30%] gap-5 max-xl:block">
      <div>
        <div className='grid gap-5 grid-cols-2 max-xl:grid-cols-1'>
          <div className='grid gap-5 grid-cols-2 max-xl:order-1'>
            <TotalOrders />
            <NewOrders />
            <TotalRevenue />
            <RevenueSteam />
          </div>
          <Rating />
        </div>
        <CurrentOrders
          orders={orders}
          loading={isLoading}
          onSelectOrder={setSelectedOrderId}
          onLoadOrders={loadOrders}
          selectedOrderId={selectedOrderId}
          onChangeColorStatus={orderStatus}
          pagination={{ currentPage, setCurrentPage }}
        />
      </div>
      <OrderDetails
        orders={orders}
        orderId={selectedOrderId}
        onChangeColorStatus={orderStatus}
        onSelectOrder={setSelectedOrderId}
        pagination={{ currentPage, setCurrentPage }}
      />
    </main>
  );
};

export default HomePage;