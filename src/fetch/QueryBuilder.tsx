import gql from 'graphql-tag';
import {columnDefs} from '../components/GridSection/Columns';

export const buildMovieQuery = () => {
  const fields: string[] = [];
  columnDefs.map(columnDef => fields.push(columnDef.field));
  const fieldString = fields.join('\n');

  const query = gql`
    query($searchString: String, $page: Int, $filter: Filter) {
      Movie(
        searchString: $searchString
        page: $page
        filter: $filter
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
