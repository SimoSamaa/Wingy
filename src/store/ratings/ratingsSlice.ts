import { createSlice } from '@reduxjs/toolkit';
import type { Ratings, InitialRatingsState } from '@/types/starRatingsTypes';

const initialState: InitialRatingsState = {
  ratings: {}
};

const rating = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    steRatings(state, { payload }: { payload: { ratings: Ratings; }; }) {
      state.ratings = payload.ratings;
    }
  }
});

export const ratingsActions = rating.actions;
export default rating.reducer;