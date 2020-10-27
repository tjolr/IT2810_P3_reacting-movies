import React, {useEffect, useState} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import {buildMovieReviewsQuery} from '../../../fetch/QueryBuilder';
import {useQuery} from '@apollo/client';
import {motion} from 'framer-motion';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.info.dark,
      borderRadius: '8px',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    reviewContainer: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: '8px',
      padding: theme.spacing(1),
      marginTop: theme.spacing(0.5),
    },
    allReviewsContainer: {
      maxHeight: '20rem',
      overflow: 'scroll',
    },
  })
);

const Reviews = (props: any) => {
  const classes = useStyles();

  const {loading, error, data, refetch} = useQuery(buildMovieReviewsQuery(), {
    variables: {
      movieId: props.movieId,
    },
  });

  useEffect(() => {
    refetch();
  }, [props.newReviewAdded]);

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" style={{display: 'inline'}}>
        Reviews:
      </Typography>
      <Typography
        variant="subtitle1"
        style={{display: 'inline', float: 'right'}}
      >
        {data && data.Reviews.length}
      </Typography>
      <Divider />
      {loading ? (
        <div style={{padding: '1rem', margin: 'auto'}}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography variant="body1" color="error" style={{marginTop: '1rem'}}>
          Error while fetching reviews!
        </Typography>
      ) : (
        <motion.div className={classes.allReviewsContainer}>
          {data && data.Reviews.length > 0 ? (
            data.Reviews.slice(0)
              .reverse()
              .map(review => (
                <motion.div
                  initial={{y: 30, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.3}}
                  className={classes.reviewContainer}
                  key={review.text + Math.random()}
                >
                  <Typography variant="subtitle2">
                    <b>{review.author}</b>
                  </Typography>
                  <Typography variant="body2">{review.text}</Typography>
                </motion.div>
              ))
          ) : (
            <Typography variant="body1" style={{marginTop: '1rem'}}>
              No reviews for this movie!
            </Typography>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Reviews;
