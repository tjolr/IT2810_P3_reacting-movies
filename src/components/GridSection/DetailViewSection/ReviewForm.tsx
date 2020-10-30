import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {TextField, Typography, Button} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {useMutation} from '@apollo/client';
import {ADD_REVIEW} from '../../../GraphQL/MutationBuilder';
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
      /* Override material default margin */
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

  /* State controlling the string values in the form */
  const [formValues, setFormValues] = useState({
    author: '',
    text: '',
  });
  const [submitSuccessfull, setSubmitSuccessfull] = useState(undefined);
  /* Mutation hook for adding a new review
  On complete it notifies the reviews component to show the newly added review */
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

    /* Tries to add a new review
    If it catches an error then show error message to user */
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
        /* Callback when submit button is clicked */
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
          /* Disables the button until both author and text is not empty 
          to prevent empy reviews */
          disabled={mutationLoading || !formValues.author || !formValues.text}
          className={classes.button}
          /* Loading spinner when review is beeing submitted */
          endIcon={
            mutationLoading ? <CircularProgress size={24} /> : <SendIcon />
          }
        >
          Submit review
        </Button>

        {/* Feedback messages if the review was successfully submitted or 
          if there was any errors */}
        {submitSuccessfull !== undefined && submitSuccessfull ? (
          <Typography variant="subtitle1" style={{color: 'lightgreen'}}>
            Review successfully saved!
          </Typography>
        ) : (
          submitSuccessfull !== undefined &&
          mutationError && (
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
