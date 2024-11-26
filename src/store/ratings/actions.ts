import type { Ratings } from '@/types/starRatingsTypes';
import sendRequest from '@/lib/sendRequest';
import { ratingsActions } from './ratingsSlice';
import { AppDispatch } from '../index';

export const fetchRatingsInfo = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const { ratings }: { ratings: Ratings; } = await sendRequest('ratings');
      dispatch(ratingsActions.steRatings({ ratings }));
    } catch (error) {
      throw (error as Error).message;
    }
  };
};