import gql from 'graphql-tag';
import {columnDefs} from '../components/GridSection/Columns';

export const buildMovieQuery = () => {
  const fields: string[] = [];
  columnDefs.map(columnDef => fields.push(columnDef.field));
  const fieldString = fields.join('\n');

  const query = gql`
    query($searchString: String, $page: Int, $filter: Filter, $sort: Sort) {
      Movie(
        searchString: $searchString
        page: $page
        filter: $filter
        sort: $sort
      ) {
        movies {
          ${fieldString}
        }
        totalRowCount 
      }
    }
  `;

  return query;
};

export const buildDetailMovieQuery = () => {
  const query = gql`
    query($searchString: String) {
      Movie(searchString: $searchString) {
        movies {
          overview
        }
      }
    }
  `;

  return query;
};

export const buildMovieReviewsQuery = () => {
  const query = gql`
    query($movieId: String) {
      Reviews(movie_id: $movieId) {
        movie_id
        author
        text
      }
    }
  `;

  return query;
};
