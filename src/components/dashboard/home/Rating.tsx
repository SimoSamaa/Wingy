import React, { useMemo } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Star } from 'lucide-react';
import type { Ratings } from '@/types/starRatingsTypes';
import { Skeleton } from '@/components/ui/skeleton';

interface RatingProps {
  payload: {
    isLoading: boolean;
    ratings: Ratings | {};
  };
}

const Rating: React.FC<RatingProps> = ({ payload }) => {
  const { ratings } = payload;
  const rating = ratings as Ratings;

  const ratingsData = useMemo(() => [
    { star: 5, rating: rating?.fiveStars || 0 },
    { star: 4, rating: rating?.fourStars || 0 },
    { star: 3, rating: rating?.threeStars || 0 },
    { star: 2, rating: rating?.twoStars || 0 },
    { star: 1, rating: rating?.oneStar || 0 },
  ], [rating]);

  const averageRating = useMemo(() => {
    const totalStars =
      (5 * rating.fiveStars) +
      (4 * rating.fourStars) +
      (3 * rating.threeStars) +
      (2 * rating.twoStars) +
      (1 * rating.oneStar);

    return (totalStars / rating.totalReviews || 0).toFixed(1);
  }, [rating]);

  // Helper function to calculate the percentage for each star rating
  const getProgressValue = (count: number) => (count / rating.totalReviews) * 100;

  return (
    <Card className='px-6 py-4 grid gap-2'>
      {payload.isLoading && (
        <div className='bg-card rounded-lg absolute inset-0 z-[10]'>
          <Skeleton className='size-full' />
        </div>
      )}
      <div className='flex items-center gap-2 mx-auto w-fit'>
        <CardTitle className='font-bold'>{averageRating}</CardTitle>
        <Star className='text-yellow-500 size-[30px] fill-yellow-500' />
      </div>
      <p className='text-center'>Based on {rating.totalReviews} ratings</p>
      <ul className='grid gap-1'>
        {ratingsData.map((item) => (
          <li key={item.star} className='flex items-center gap-3'>
            <p className='text-nowrap mb-1'>{item.star} stars</p>
            <Progress value={getProgressValue(item.rating)} />
            <p>{item.rating}</p>
          </li>
        ))}
      </ul>
      <p className='text-center'>Ratings since {rating.date}</p>
    </Card>
  );
};

export default React.memo(Rating);