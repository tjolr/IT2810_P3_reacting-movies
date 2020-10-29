import React from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    title: {
      color: 'white',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        borderBottomColor: 'transparent',
      },
      [theme.breakpoints.up('md')]: {
        borderBottom: '4px solid',
        borderBottomColor: theme.palette.primary.main,
      },
    },
    body: {
      [theme.breakpoints.down('sm')]: {
        width: '95%',
        textAlign: 'left',
        borderLeft: '4px solid',
        borderLeftColor: theme.palette.primary.main,
        paddingLeft: theme.spacing(1),
      },
      [theme.breakpoints.up('md')]: {
        width: '50%',
        textAlign: 'center',
        borderRight: '4px solid',
        borderRightColor: theme.palette.primary.main,
      },
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
      <Typography variant="subtitle1" className={classes.body}>
        Welcome to the movie database! Here you can search, filter and sort
        movies. If you want to see more details or write a review about a
        specific movie, just click on the row. Enjoy!
      </Typography>
    </div>
  );
};
export default Info;
