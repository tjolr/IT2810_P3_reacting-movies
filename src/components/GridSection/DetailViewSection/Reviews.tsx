import React, {useEffect} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {motion} from 'framer-motion';
import {grey} from '@material-ui/core/colors';
import {MOVIE_REVIEW_QUERY} from '../../../GraphQL/QueryBuilder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.info.dark,
      borderRadius: '8px',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    reviewContainer: {
      background: `linear-gradient(45deg, ${grey[800]} 30%, ${grey[700]} 90%)`,
      borderRadius: '5px',
      padding: theme.spacing(1),
      marginTop: theme.spacing(0.5),
    },
    allReviewsContainer: {
      maxHeight: '20rem',
      /* Want to scroll the reviews if it surpasses maxHeight */
      overflow: 'scroll',
    },
  })
);

const Reviews = (props: any) => {
  const classes = useStyles();

  /* Fetchs all reviews for the chosen movie */
  const {loading, error, data, refetch} = useQuery(MOVIE_REVIEW_QUERY, {
    variables: {
      movieId: props.movieId,
    },
  });

  /* When a new review is added, we want to show it as a newly added review */
  useEffect(() => {
    refetch();
    // eslint-disable-next-line
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
            /* Filter out reviews without author or text. Should not be possible
            to put into db, but good to have double check */
            data.Reviews.filter(review => review.author && review.text)
              .slice(0)
              /* Reverses the list to show newest review on top */
              .reverse()
              .map(review => (
                /* Animation on render */
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
            /* Tells the user if there are no reviews for this movie */
            <Typography variant="body1" style={{marginTop: '1rem'}}>
              No reviews for this movie! Please add one below.
            </Typography>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Reviews;
