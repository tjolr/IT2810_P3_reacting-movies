import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {updateSearch} from '../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      width: '100%',
      marginBottom: '1rem',
    },
  })
);

const SearchField = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div>
      <TextField
        variant="filled"
        className={classes.searchField}
        color="secondary"
        label="Search movie"
        id="searchMovieField"
        onChange={e => {
          dispatch(updateSearch(e.target.value));
          console.log(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchField;
