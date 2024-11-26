import React from 'react';
import { Card, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TotalRevenueProps {
  payload: {
    totalRevenue: string;
    isLoading: boolean;
  };
}

const TotalRevenue: React.FC<TotalRevenueProps> = ({ payload }) => {
  return (
    <Card>
      {payload.isLoading && (
        <div className='bg-card rounded-lg absolute inset-0'>
          <Skeleton className='size-full' />
        </div>
      )}
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <div className='flex items-center gap-4'>
          <CardTitle className="text-4xl">{payload.totalRevenue}DH</CardTitle>
          <TrendingUp className='text-green-500' />
        </div>
      </CardHeader>
    </Card>
  );
};

export default TotalRevenue;