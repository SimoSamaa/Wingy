import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { Card, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

const NewOrders = () => {
  const newOrdersToday = useSelector((state: RootState) => state.orders.ordersInfo.newOrdersToday);

  return (
    <Card>
      <CardHeader>
        <CardDescription>New Orders Today</CardDescription>
        <CardTitle className="text-4xl">{newOrdersToday}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default NewOrders;