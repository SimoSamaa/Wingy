import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { Card, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

const TotalOrders = () => {
  const TotalOrders = useSelector((state: RootState) => state.orders.ordersInfo.totalOrders);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="text-4xl">{TotalOrders}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TotalOrders;