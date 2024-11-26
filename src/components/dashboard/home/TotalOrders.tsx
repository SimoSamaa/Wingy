import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

interface TotalOrdersProps {
  payload: {
    totalOrders: string;
    isLoading: boolean;
  };
}

const TotalOrders: React.FC<TotalOrdersProps> = ({ payload }) => {

  return (
    <Card>
      {payload.isLoading && (
        <div className='bg-card rounded-lg absolute inset-0'>
          <Skeleton className='size-full' />
        </div>
      )}
      <CardHeader>
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="text-4xl">{payload.totalOrders}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TotalOrders;