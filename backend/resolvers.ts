import { Movie } from './models/Movie';

const movieResolver = async (_, args) => {
  // Set default values, and overwrite with the args
  const searchString = args.searchString || '';
  const page = args.page || 1;
  const rating = args.rating || { rating_from: 0, rating_to: 10 };

  const limit = 10;

  const searchQuery = {
    title: { $regex: searchString, $options: 'i' },
    vote_average: { $gte: rating.rating_from, $lte: rating.rating_to },
  };

  const movies = await Movie.find(searchQuery, (err, movies) => {
    if (err) throw err;
    return movies;
  })
    .limit(limit)
    .skip((page - 1) * limit);

  const totalRowCount = await Movie.countDocuments(
    searchQuery,
    (err, count) => {
      if (err) throw err;
      return count;
    }
  );
  const totalPages = Math.ceil(totalRowCount / limit);

  return {
    movies,
    totalPages,
    totalRowCount,
  };
};

export const resolvers = {
  Query: {
    Movie: movieResolver,
  },
};
