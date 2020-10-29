import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
  Typography,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {getDateInYearString} from '../../../utils/dates';
import {getLanguageName} from '../../../utils/isoLanguages';
import {useQuery} from '@apollo/client';
import {buildDetailMovieQuery} from '../../../fetch/QueryBuilder';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      marginTop: theme.spacing(1),
      display: 'block',
      margin: 'auto',
    },
  })
);

const DetailViewModal = forwardRef((props: any, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useImperativeHandle(ref, () => ({
    toggleDetailView() {
      open ? handleClose() : handleOpen();
    },
  }));
  const [open, setOpen] = React.useState(false);
  const [newReviewAdded, setNewReviewAdded] = useState(0);

  const handleNewReviewAdded = () => {
    setNewReviewAdded(newReviewAdded + 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {loading, error, data} = useQuery(buildDetailMovieQuery(), {
    variables: {
      searchString:
        props.detailViewParams != null ? props.detailViewParams.title : '',
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        fullScreen={isMobile}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          {props.detailViewParams && props.detailViewParams.title}
        </DialogTitle>

        <DialogContent dividers={true}>
          <div>
            {props.detailViewParams && (
              <div>
                {loading ? (
                  <div>
                    <Skeleton animation="wave" width={450} height={22} />
                    <br />
                    <Skeleton animation="wave" width={200} height={22} />
                    <Skeleton animation="wave" width={200} height={22} />
                    <Skeleton animation="wave" width={200} height={22} />
                    <br />
                    <Skeleton animation="wave" height={90} />
                    <br />
                  </div>
                ) : error ? (
                  <Typography variant="h6" color="error">
                    Error while fetching details about the movie
                  </Typography>
                ) : (
                  <div>
                    {data && (
                      <Typography variant="subtitle1">
                        "<i>{data.Movie.movies[0].tagline}</i>"
                      </Typography>
                    )}
                    <br />

                    {props.detailViewParams.release_date && (
                      <Typography variant="subtitle1">
                        <b>Release date:</b>{' '}
                        {getDateInYearString(
                          new Date(props.detailViewParams.release_date)
                        )}
                      </Typography>
                    )}
                    {props.detailViewParams.vote_average && (
                      <Typography variant="subtitle1">
                        <b>Average vote:</b>{' '}
                        {props.detailViewParams.vote_average}
                      </Typography>
                    )}
                    {props.detailViewParams.original_language && (
                      <Typography variant="subtitle1">
                        <b>Original language:</b>{' '}
                        {getLanguageName(
                          props.detailViewParams.original_language
                        )}
                      </Typography>
                    )}
                    {data && (
                      <Typography variant="subtitle1">
                        <b>Genres:</b>{' '}
                        {data.Movie.movies[0].genres
                          .map(genre => genre.name)
                          .join(', ')}
                      </Typography>
                    )}
                    <br />
                    {data && (
                      <Typography variant="body1">
                        {data.Movie.movies[0].overview}
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            )}

            <br></br>

            <Reviews
              movieId={props.detailViewParams && props.detailViewParams._id}
              newReviewAdded={newReviewAdded}
            />

            <ReviewForm
              movieId={props.detailViewParams && props.detailViewParams._id}
              handleNewReviewAdded={handleNewReviewAdded}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <IconButton
            onClick={handleClose}
            size="small"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DetailViewModal;
