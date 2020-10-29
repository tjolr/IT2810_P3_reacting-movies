import { MovieModel, Movie } from '../models/Movie';

export const movieQuery = async (_, args: MovieArgs) => {
  try {
    // Set default values, and overwrite with the args
    const searchString = args.searchString || '';
    const page = args.page || 1;
    const filter = args.filter || null;
    const sort = args.sort || { field: 'popularity', direction: 'desc' };

    const limit = 25;

    // Set up the basic search query
    let searchQuery: MovieSearchQuery = {
      title: { $regex: searchString, $options: 'i' },
    };

    // Apply rating filter if present
    if (filter && filter.rating) {
      searchQuery = {
        ...searchQuery,
        vote_average: {
          $gte: filter.rating.from,
          $lte: filter.rating.to,
        },
      };
    }

    // Apply release-year filter if present
    if (filter && filter.release_year) {
      searchQuery = {
        ...searchQuery,
        release_date: {
          $gte: new Date(String(filter.release_year.from)),
          $lt: new Date(String(filter.release_year.to + 1)),
        },
      };
    }

    // Sortstring is fieldname with '-' in from when descending
    const sortString = `${SortPrefix[sort.direction]}${sort.field}`;

    // Get the movies that match the searchQuery from the database
    const movies = await MovieModel.find(
      searchQuery,
      (err: any, movies: Movie[]) => {
        if (err) throw err;
        return movies;
      }
    )
      .limit(limit) // Results per page limit
      .skip((page - 1) * limit) // Skip results to get to correct page
      .sort(sortString); // Apply the sorting

    // Count result of searchQuery to get number of rows and number of pages
    const totalRowCount: number = await MovieModel.countDocuments(
      searchQuery,
      (err: any, count: number) => {
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
  } catch (e) {
    console.error(e.name + ': ' + e.message);
    throw e;
  }
};

interface MovieArgs {
  searchString?: string;
  page?: number;
  filter?: {
    rating: {
      from: number;
      to: number;
    };
    release_year: {
      from: number;
      to: number;
    };
  };
  sort?: {
    field: string;
    direction: string;
  };
}

interface MovieSearchQuery {
  title: object;
  vote_average?: object;
  release_date?: object;
}

enum SortPrefix {
  'asc' = '',
  'desc' = '-',
}
