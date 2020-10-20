import gql from 'graphql-tag';
import {columnDefs} from '../components/GridSection/Columns';

export const buildQuery = (searchString: string) => {
  const fields: string[] = [];
  columnDefs.map(columnDef => fields.push(columnDef.field));
  const fieldString = fields.join('\n');

  searchString = searchString !== undefined ? searchString : '';

  const query = gql`
    query {
      Movie(searchString: "${searchString}") {
        movies {
          ${fieldString}
        }
      }
    }
  `;

  return query;
};
