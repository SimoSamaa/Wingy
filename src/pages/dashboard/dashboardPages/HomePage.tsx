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
import OrderDetails from '@/components/dashboard/home/OrderDetails';
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
  const [isLoading, setIsLoading] = useState(true);

  // => START FETCH ORDERS FUNCTION
  const loadOrders = useCallback(async () => {
    // WORK JUST IN DEVELOPMENT MODE
    if (isMounted) {
      isMounted = false;
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(fetchOrders(currentPage));
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setIsLoading(false);

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

    setIsLoading(true);

    try {
      await dispatch(fetchOrdersInfo());
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);

    try {
      await dispatch(fetchRatingsInfo());
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: error as string,
      });
    } finally {
      setIsLoading(false);
    }

  }, [dispatch]);
  // => END FETCH RATINGS INFO FUNCTION

  useEffect(() => {
    loadOrders();
    loadOrdersInfo();
    loadRatings();
  }, [loadOrders, loadOrdersInfo, loadRatings]);

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
            <TotalOrders payload={{ totalOrders: ordersInfo?.totalOrders || '0', isLoading }} />
            <NewOrders payload={{ newOrdersToday: ordersInfo?.newOrdersToday || '0', isLoading }} />
            <TotalRevenue payload={{ totalRevenue: ordersInfo?.totalRevenue || '0', isLoading }} />
            <RevenueSteam payload={{ revenueSteam: ordersInfo?.revenueSteam || '0', isLoading }} />
          </div>
          <Rating payload={{ ratings, isLoading }} />
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
        loading={isLoading}
      />
    </main>
  );
};

export default HomePage;