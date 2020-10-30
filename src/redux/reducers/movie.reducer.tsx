import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
} from '../actionTypes';

/* Initial movie state
Also used in the cypress testing, and therefore it needs to be exported */
export const initMovieState = {
  searchString: '',
  page: 1,
  filter: {
    rating: {
      from: 0,
      to: 10,
    },
    release_year: {
      from: 1916,
      to: 2020,
    },
  },
  sort: {
    field: 'popularity',
    direction: 'desc',
  },
};

/* Movie Reducer
Many times when filters, sorts or search is changed the user wants to 
see the best results for its search. Therefore many times the page is 
set to the first page. */
const movieReducer = (state = initMovieState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD:
      return {
        ...state,
        searchString: action.payload.content,
        page: 1,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.content,
      };
    case UPDATE_RELEASE_YEAR:
      return {
        ...state,
        page: 1,
        filter: {
          /* Important use of spread operator here
          to also remain the nested childs of the state
          and not replace two children with one new child */
          ...state.filter,
          release_year: {
            from: action.payload.content[0],
            to: action.payload.content[1],
          },
        },
      };
    case UPDATE_RATING:
      return {
        ...state,
        page: 1,
        filter: {
          /* Important use of spread operator here
          to also remain the nested childs of the state
          and not replace two children with one new child */
          ...state.filter,
          rating: {
            from: action.payload.content[0],
            to: action.payload.content[1],
          },
        },
      };
    case UPDATE_SORT:
      return {
        ...state,
        page: 1,
        sort: {
          field: action.payload.field,
          direction: action.payload.sort,
        },
      };
    default:
      return state;
  }
};

export default movieReducer;
