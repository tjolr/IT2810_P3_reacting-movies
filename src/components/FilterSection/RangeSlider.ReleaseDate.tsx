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
        minWidth: 350,
        maxWidth: 500,
      },
      [theme.breakpoints.up('md')]: {
        minWidth: 200,
        maxWidth: 400,
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

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: any, newValue: number | number[]) => {
    dispatch(updateReleaseYear(newValue as number[]));
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Release year:</Typography>
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
        min={1916}
        max={2020}
        color="secondary"
      />
    </div>
  );
};
export default RangeSliderReleaseDate;
