import { Movie } from './models/Movie';

export const resolvers = {
  Query: {
    getMovie: (_, { title }) =>
      Movie.find({ title: title }, (err, movie) => {
        if (err) throw err;
        console.log({ ...movie });
        return { ...movie };
      }),
    getMovies: () =>
      Movie.find({}, (err, movies) => {
        if (err) throw err;
        return movies;
      }),
  },
};
