import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
} from '../actionTypes';

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
