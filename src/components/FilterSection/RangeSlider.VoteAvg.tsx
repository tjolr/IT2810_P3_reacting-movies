import React, {useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import {useDispatch} from 'react-redux';
import {updateRating} from '../../redux/actions';

/* Much of the same comments in RangeSlider.ReleaseDate is the same here */

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

const RangeSliderVoteAvg = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState<number[]>([0, 10]);

  const handleChange = (event: object, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    event: object,
    newValue: number | number[]
  ) => {
    dispatch(updateRating(newValue as number[]));
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Average vote:</Typography>
      <Typography variant="subtitle2" className={classes.yearNumber}>
        {value[0]}
      </Typography>
      <Typography
        variant="subtitle2"
        className={clsx(classes.floatRight, classes.yearNumber)}
      >
        {value[1]}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        /* Not a continous line function, but steps */
        step={0.5}
        /* Marks to show lines of the steps */
        marks
        min={0.0}
        max={10.0}
        color="primary"
      />
    </div>
  );
};
export default RangeSliderVoteAvg;
