import React from 'react';
import {Container} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: '1rem',
    },
  })
);

const Info = () => {
  const classes = useStyles();
  return (
    <Container>
      <h1 className={classes.title}>Movie Database</h1>
    </Container>
  );
};
export default Info;
