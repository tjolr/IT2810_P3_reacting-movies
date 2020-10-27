import { Types } from 'mongoose';
import { ReviewModel, Review } from '../models/Review';

export const reviewsQuery = async (_, args: ReviewsArgs) => {
  try {
    // Check if the recieved movie_id is a valid id
    if (!Types.ObjectId.isValid(args.movie_id)) {
      throw new TypeError('Not a valid movieID');
    }

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
