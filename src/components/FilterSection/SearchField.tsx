import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {updateSearch} from '../../redux/actions';
import {useDebounce} from 'use-debounce';

const useStyles = makeStyles(() =>
  createStyles({
    searchField: {
      margin: 'auto',
    },
  })
);

const SearchField = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /* State that holds the value of the TextField */
  const [searchTerm, setSearchTerm] = useState('');
  /* Debounce to prevent calling too many GraphQL calls to backend*/
  const [debouncedSearchTerm] = useDebounce(searchTerm, 150);

  /* Useffect runs only when debouncedSearchTerm has changed */
  useEffect(() => {
    dispatch(updateSearch(searchTerm));
  }, [debouncedSearchTerm]);

  return (
    <TextField
      className={classes.searchField}
      color="primary"
      label="Search for a movie title"
      id="searchMovieField"
      onChange={e => {
        setSearchTerm(e.target.value);
      }}
    />
  );
};

export default SearchField;
