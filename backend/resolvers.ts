import { Movie } from './models/Movie';

const movieResolver = async (_, args) => {
  const { searchString = null, page = 1 } = args;
  const limit = 10;

  const searchQuery = {
    title: { $regex: searchString, $options: 'i' },
  };

  const movies = await Movie.find(searchQuery, (err, movies) => {
    if (err) throw err;
    return movies;
  })
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Movie.countDocuments(searchQuery, (err, count) => {
    if (err) throw err;
    return count;
  });
  const totalPages = Math.ceil(count / limit);

  return {
    movies,
    totalPages,
  };
};

export const resolvers = {
  Query: {
    Movie: movieResolver,
  },
};
