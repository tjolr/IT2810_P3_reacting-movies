import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
} from '../actionTypes';

const initState = {
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
};

const movieReducer = (state = initState, action) => {
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
    default:
      return state;
  }
};

export default movieReducer;
