import {UPDATE_SEARCH_FIELD} from '../actionTypes';

const searchField = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default searchField;
