import { Types } from 'mongoose';
import { ReviewModel } from '../models/Review';
import { MovieModel } from '../models/Movie';

export const addReviewMutation = async (_, args: addReviewArgs) => {
  try {
    // Check if the recieved movie_id is a valid id
    if (!Types.ObjectId.isValid(args.review.movie_id)) {
      throw new TypeError('Not a valid movieID');
    }

    // Check if the movie exists in the database
    const reviewedMovie = await MovieModel.findById(
      args.review.movie_id,
      (err, movie) => {
        if (err) throw err;
        return movie;
      }
    );

    // If it exists, create a new review and return true if successful
    if (!reviewedMovie) {
      throw new Error('Not a movie in the database.');
    } else {
      const newReview = await ReviewModel.create({
        movie_id: args.review.movie_id,
        text: args.review.text,
        author: args.review.author,
      });
      return newReview ? true : false;
    }
  } catch (e) {
    console.error(e.name + ': ' + e.message);
    throw e;
  }
};

interface addReviewArgs {
  review: {
    movie_id: string;
    text: string;
    author: string;
  };
}
