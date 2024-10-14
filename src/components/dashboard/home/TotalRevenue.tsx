import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { Card, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const TotalRevenue = () => {
  const totalRevenue = useSelector((state: RootState) => state.orders.ordersInfo.totalRevenue);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <div className='flex items-center gap-4'>
          <CardTitle className="text-4xl">{totalRevenue}DH</CardTitle>
          <TrendingUp className='text-green-500' />
        </div>
      </CardHeader>
    </Card>
  );
};

export default TotalRevenue;