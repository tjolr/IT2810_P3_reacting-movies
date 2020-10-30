import React, {useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import {useDispatch} from 'react-redux';
import {updateReleaseYear} from '../../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        minWidth: '95%',
      },
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
    title: {
      display: 'block',
      textAlign: 'center',
    },
    yearNumber: {
      display: 'inline-block',
    },
    floatRight: {
      float: 'right',
    },
  })
);

function valuetext(value: number) {
  return `${value}`;
}

const RangeSliderReleaseDate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState<number[]>([1916, 2020]);

  /* The event:object is sent by the Component method as parameter, and therefore
  it needs to be passed as an argument even though it is not used in this function */
  /* HandleChange is updated when the slider is moved or pushed */
  const handleChange = (event: object, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  /* Handle change committed is only triggered when a mouseup is used
  or a touch event ends. This is to only fetch data while the user has found 
  it's wanted value */
  const handleChangeCommitted = (
    event: object,
    newValue: number | number[]
  ) => {
    dispatch(updateReleaseYear(newValue as number[]));
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Release year:</Typography>
      <Typography
        variant="subtitle2"
        className={classes.yearNumber}
        id="fromReleaseYear"
      >
        {value[0]}
      </Typography>
      <Typography
        variant="subtitle2"
        className={clsx(classes.floatRight, classes.yearNumber)}
        id="toReleaseYear"
      >
        {value[1]}
      </Typography>
      <Slider
        value={value}
        /* Callback methods */
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        /* Default min and max values based on our dataset */
        min={1916}
        max={2020}
        color="primary"
      />
    </div>
  );
};
export default RangeSliderReleaseDate;
