import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import { fetchOrders } from '@/store/orders/actions';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast.ts';
import DataTable from '@/components/dashboard/orders/DataTable';
import OrderDetails from '@/components/dashboard/includes/OrderDetails';

let isMounted = true;

const OrdersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Pending', 'Preparing', 'Prepared', 'Picked up', 'Completed'];

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

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const getStatusClassName = (status: string) => {
    switch (status) {
      case statuses[1]: return 'border-yellow-500 text-yellow-500 bg-yellow-100';
      case statuses[2]: return 'border-orange-500 text-orange-500 bg-orange-100';
      case statuses[3]: return 'border-green-500 text-green-500 bg-green-100';
      case statuses[4]: return 'border-blue-500 text-blue-500 bg-blue-100';
      case statuses[5]: return 'border-fuchsia-500 text-fuchsia-500 bg-fuchsia-100';
      default: return 'bg-muted';
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders]);

  return (
    <main className="grid grid-cols-[1fr_30%] gap-5 max-xl:block">
      <div>
        <div className='flex gap-2 justify-between'>
          <Input type='search' placeholder='Search by order ID' />
          <div className='flex gap-2'>
            {statuses.map((status, index) => (
              <button
                key={index}
                onClick={() => setSelectedStatus(status)}
                className={`max-lg:hidden border px-4 rounded-md transition-colors duration-300 ease-out ${selectedStatus === status ? getStatusClassName(status) : ' bg-background'}`}>
                {status}</button>
            ))}

            <Select
              value={selectedStatus}
              onValueChange={selectedStatus => setSelectedStatus(selectedStatus)}
            >
              <SelectTrigger className="w-[150px] hidden max-lg:flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status, ind) => (
                  <SelectItem key={ind} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DataTable
          orders={orders}
          isLoading={isLoading}
          onloadOrders={loadOrders}
          onGetStatusClassName={getStatusClassName}
          selectedOrder={{ setSelectedOrderId, selectedOrderId }}
        />
      </div>
      <OrderDetails
        orders={orders}
        orderId={selectedOrderId}
        onSelectOrder={setSelectedOrderId}
        loading={isLoading}
      />
    </main>
  );
};

export default OrdersPage;