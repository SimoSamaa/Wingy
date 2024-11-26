import React from 'react';
import { Card, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface RevenueSteamProps {
  payload: {
    revenueSteam: string;
    isLoading: boolean;
  };
}

const RevenueSteam: React.FC<RevenueSteamProps> = ({ payload }) => {
  return (
    <Card>
      {payload.isLoading && (
        <div className='bg-card rounded-lg absolute inset-0'>
          <Skeleton className='size-full' />
        </div>
      )}
      <CardHeader>
        <CardDescription>Revenue Steam</CardDescription>
        <div className='flex items-center gap-4'>
          <CardTitle className="text-4xl">{payload.revenueSteam}%</CardTitle>
          <TrendingDown className='text-red-500' />
        </div>
      </CardHeader>
    </Card>
  );
};

export default RevenueSteam;