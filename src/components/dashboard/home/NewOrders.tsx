import React from 'react';
import { Card, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface NewOrdersProps {
  payload: {
    newOrdersToday: string;
    isLoading: boolean;
  };
}

const NewOrders: React.FC<NewOrdersProps> = ({ payload }) => {
  return (
    <Card>
      {payload.isLoading && (
        <div className='bg-card rounded-lg absolute inset-0'>
          <Skeleton className='size-full' />
        </div>
      )}
      <CardHeader>
        <CardDescription>New Orders Today</CardDescription>
        <CardTitle className="text-4xl">{payload.newOrdersToday}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default NewOrders;