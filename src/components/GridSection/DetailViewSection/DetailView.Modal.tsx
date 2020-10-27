import React, {forwardRef, useImperativeHandle} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Typography} from '@material-ui/core';
import {getDateInYearString} from '../../../utils/dates';
import {getLanguageName} from '../../../utils/isoLanguages';
import {useQuery} from '@apollo/client';
import {buildDetailMovieQuery} from '../../../fetch/QueryBuilder';
import {initMovieState} from '../../../redux/reducers/movie.reducer';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ReviewForm from './ReviewForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '10vh',
        maxHeight: '80vh',
        width: '97vw',
        margin: 'auto',
        overflow: 'scroll',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    paper: {
      overflow: 'scroll',

      backgroundColor: theme.palette.background.paper,
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
      [theme.breakpoints.up('md')]: {
        minHeight: '50vh',
        width: '40vw',
        padding: theme.spacing(4),
      },
    },
    closeButton: {
      marginTop: theme.spacing(1),
      display: 'block',
      margin: 'auto',
    },
  })
);

const DetailViewModal = forwardRef((props: any, ref) => {
  const classes = useStyles();
  useImperativeHandle(ref, () => ({
    toggleDetailView() {
      open ? handleClose() : handleOpen();
    },
  }));
  const [open, setOpen] = React.useState(false);

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
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {props.detailViewParams && (
            <div>
              {props.detailViewParams.title && (
                <Typography variant="h5">
                  {props.detailViewParams.title}
                </Typography>
              )}
              <br />

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
              ) : (
                <div>
                  {props.detailViewParams.tagline && (
                    <Typography variant="subtitle1">
                      "<i>{props.detailViewParams.tagline}</i>"
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
                      <b>Average vote:</b> {props.detailViewParams.vote_average}
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

          <ReviewForm
            movieId={props.detailViewParams && props.detailViewParams._id}
          />

          <IconButton
            onClick={handleClose}
            size="small"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Fade>
    </Modal>
  );
});

export default DetailViewModal;
