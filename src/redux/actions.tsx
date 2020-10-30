import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
} from './actionTypes';

/* Actions for updating the movie queries */

export const updateSearch = content => ({
  type: UPDATE_SEARCH_FIELD,
  payload: {
    content,
  },
});

export const changePage = content => ({
  type: CHANGE_PAGE,
  payload: {
    content,
  },
});

export const updateReleaseYear = content => ({
  type: UPDATE_RELEASE_YEAR,
  payload: {
    content,
  },
});

export const updateRating = content => ({
  type: UPDATE_RATING,
  payload: {
    content,
  },
});

export const updateSort = content => ({
  type: UPDATE_SORT,
  /* Setting default sort if no sort is made */
  payload: {
    field: content ? content.field : 'popularity',
    sort: content ? content.sort : 'desc',
  },
});
