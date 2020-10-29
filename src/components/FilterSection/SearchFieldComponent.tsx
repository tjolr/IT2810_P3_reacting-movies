import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {updateSearch} from '../../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      width: '100%',
      height: '100% ',
      margin: 'auto',
    },
  })
);

const SearchField = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <TextField
      className={classes.searchField}
      color="primary"
      label="Search for a movie title"
      id="searchMovieField"
      onChange={e => {
        dispatch(updateSearch(e.target.value));
      }}
    />
  );
};

export default SearchField;
