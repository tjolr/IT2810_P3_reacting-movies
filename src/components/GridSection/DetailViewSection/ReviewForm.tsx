import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {TextField, Typography, Button} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';
import {useMutation, gql} from '@apollo/client';
import {ADD_REVIEW} from '../../../fetch/MutationBuilder';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.info.dark,
      borderRadius: '8px',
      padding: theme.spacing(2),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',

      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
      },
    },
    button: {
      marginTop: theme.spacing(1),
    },
  })
);

const ReviewForm = (props: any) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    author: '',
    text: '',
  });
  const [submitSuccessfull, setSubmitSuccessfull] = useState(undefined);
  const [
    addReview,
    {loading: mutationLoading, error: mutationError},
  ] = useMutation(ADD_REVIEW, {
    onCompleted(data) {
      if (data.addReview) {
        props.handleNewReviewAdded();
      }
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await addReview({
        variables: {
          review: {
            movie_id: props.movieId,
            text: formValues.text,
            author: formValues.author,
          },
        },
      });
      setSubmitSuccessfull(true);
    } catch (mutationError) {
      setSubmitSuccessfull(false);
    }
    clearForm();
  };

  const clearForm = () => {
    setFormValues({author: '', text: ''});
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">Write a review:</Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-textarea"
          label="Author"
          placeholder="Your name"
          variant="outlined"
          value={formValues.author}
          onChange={e => setFormValues({...formValues, author: e.target.value})}
        />
        <TextField
          id="outlined-multiline-static"
          label="Text"
          placeholder="Your review"
          multiline
          rows={3}
          variant="outlined"
          value={formValues.text}
          onChange={e => setFormValues({...formValues, text: e.target.value})}
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={mutationLoading || !formValues.author || !formValues.text}
          className={classes.button}
          endIcon={
            mutationLoading ? <CircularProgress size={24} /> : <SendIcon />
          }
        >
          Submit review
        </Button>

        {submitSuccessfull != undefined && submitSuccessfull ? (
          <Typography variant="subtitle1" style={{color: 'green'}}>
            Review successfully saved!
          </Typography>
        ) : (
          submitSuccessfull != undefined && (
            <Typography variant="subtitle1" color="error">
              Error! Please try again.
            </Typography>
          )
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
