import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { Card, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';

const RevenueSteam = () => {
  const revenueSteam = useSelector((state: RootState) => state.orders.ordersInfo.revenueSteam);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Revenue Steam</CardDescription>
        <div className='flex gap-4 items-center'>
          <CardTitle className="text-4xl">{revenueSteam}%</CardTitle>
          <TrendingDown className='text-red-500' />
        </div>
      </CardHeader>
    </Card>
  );
};

export default RevenueSteam;