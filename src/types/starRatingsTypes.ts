interface Ratings {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  totalReviews: number;
  date: string;
}

interface InitialRatingsState {
  ratings: Ratings | {};
}

export type { InitialRatingsState, Ratings };