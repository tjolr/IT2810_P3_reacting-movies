import {UPDATE_SEARCH_FIELD} from './actionTypes';

export const updateSearch = content => ({
  type: UPDATE_SEARCH_FIELD,
  payload: {
    content,
  },
});
