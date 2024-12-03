import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import { fetchOrders, fetchOrdersInfo } from '@/store/orders/actions';
import { fetchRatingsInfo } from '@/store/ratings/actions';
import { useToast } from '@/hooks/use-toast.ts';
import TotalOrders from '@/components/dashboard/home/TotalOrders';
import NewOrders from '@/components/dashboard/home/NewOrders';
import TotalRevenue from '@/components/dashboard/home/TotalRevenue';
import RevenueSteam from '@/components/dashboard/home/RevenueSteam';
import Rating from '@/components/dashboard/home/Rating';
import CurrentOrders from '@/components/dashboard/home/CurrentOrders';
import OrderDetails from '@/components/dashboard/includes/OrderDetails';
import type { OrdersInfo } from '@/types/orderTypes';

// WORK JUST IN DEVELOPMENT MODE
let isMounted = true;
let isMounted2 = true;
let isMounted3 = true;

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const ordersInfo = useSelector((state: RootState) => state.orders.ordersInfo) as OrdersInfo;
  const ratings = useSelector((state: RootState) => state.rating.ratings);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState({ orders: false, ordersInfo: false, ratings: false });

  // => START FETCH ORDERS FUNCTION
  const loadOrders = useCallback(async () => {
    // WORK JUST IN DEVELOPMENT MODE
    if (isMounted) {
      isMounted = false;
      return;
    }

    setIsLoading((prevLoading) => ({ ...prevLoading, orders: true }));

    try {
      await dispatch(fetchOrders(currentPage));
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, orders: false }));
    }

  }, [dispatch, currentPage]);
  // => END FETCH ORDERS FUNCTION

  // => START FETCH ORDERS INFO FUNCTION
  const loadOrdersInfo = useCallback(async () => {
    // WORK JUST IN DEVELOPMENT MODE
    if (isMounted2) {
      isMounted2 = false;
      return;
    }

    setIsLoading((prevLoading) => ({ ...prevLoading, ordersInfo: true }));
    try {
      await dispatch(fetchOrdersInfo());
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, ordersInfo: false }));
    }

  }, [dispatch]);
  // => END FETCH ORDERS INFO FUNCTION

  // => START FETCH RATINGS INFO FUNCTION
  const loadRatings = useCallback(async () => {
    // WORK JUST IN DEVELOPMENT MODE
    if (isMounted3) {
      isMounted3 = false;
      return;
    }

    setIsLoading((prevLoading) => ({ ...prevLoading, ratings: true }));

    try {
      await dispatch(fetchRatingsInfo());
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, ratings: false }));
    }

  }, [dispatch]);
  // => END FETCH RATINGS INFO FUNCTION

  useEffect(() => { loadOrders(); }, [loadOrders]);
  useEffect(() => { loadOrdersInfo(); }, [loadOrdersInfo]);
  useEffect(() => { loadRatings(); }, [loadRatings]);

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders]);

  return (
    <main className="grid grid-cols-[1fr_30%] gap-5 max-xl:block">
      <div>
        <div className='grid gap-5 grid-cols-2 max-xl:grid-cols-1'>
          <div className='grid gap-5 grid-cols-2 max-xl:order-1'>
            <TotalOrders payload={{
              totalOrders: ordersInfo?.totalOrders || '0',
              isLoading: isLoading.ordersInfo
            }} />
            <NewOrders payload={{
              newOrdersToday: ordersInfo?.newOrdersToday || '0',
              isLoading: isLoading.ordersInfo
            }} />
            <TotalRevenue payload={{
              totalRevenue: ordersInfo?.totalRevenue || '0',
              isLoading: isLoading.ordersInfo
            }} />
            <RevenueSteam payload={{
              revenueSteam: ordersInfo?.revenueSteam || '0',
              isLoading: isLoading.ordersInfo
            }} />
          </div>
          <Rating payload={{
            ratings,
            isLoading: isLoading.ratings
          }} />
        </div>
        <CurrentOrders
          orders={orders}
          loading={isLoading.orders}
          onSelectOrder={setSelectedOrderId}
          onLoadOrders={loadOrders}
          selectedOrderId={selectedOrderId}
          pagination={{ currentPage, setCurrentPage }}
        />
      </div>
      <OrderDetails
        orders={orders}
        orderId={selectedOrderId}
        onSelectOrder={setSelectedOrderId}
        loading={isLoading.orders}
      />
    </main>
  );
};

export default HomePage;