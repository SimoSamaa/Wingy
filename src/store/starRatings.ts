import { createSlice } from '@reduxjs/toolkit';

interface RatingState {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  totalReviews: number;
  date: string;
}

const initialState: RatingState = {
  fiveStars: 36,
  fourStars: 32,
  threeStars: 10,
  twoStars: 12,
  oneStar: 8,
  totalReviews: 98,
  date: 'Feb 24, 2022',
};

const rating = createSlice({
  name: 'rating',
  initialState,
  reducers: {}
});

export const ordersActions = rating.actions;
export default rating.reducer;