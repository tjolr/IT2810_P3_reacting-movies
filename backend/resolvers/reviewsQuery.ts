import { ReviewModel, Review } from '../models/Review';

export const reviewsQuery = async (_, args: ReviewsArgs) => {
  try {
    const reviews = await ReviewModel.find(
      { movie_id: args.movie_id },
      (err: any, reviews: Review[]) => {
        if (err) throw err;
        return reviews;
      }
    );

    return reviews;
  } catch (e) {
    console.error(e.name + ': ' + e.message);
    throw e;
  }
};

interface ReviewsArgs {
  movie_id: string;
}
