import React from 'react';
import {Container, Typography} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: '1rem',
      color: 'white',
    },
    root: {
      padding: theme.spacing(2),
    },
  })
);

const Info = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Movie Database
      </Typography>
    </div>
  );
};
export default Info;
