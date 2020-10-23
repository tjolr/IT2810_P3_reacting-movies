import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import RangeSlider from './RangeSlider.ReleaseDate';
import MultipleSelect from './MultipleSelect.SpokenLang';
import {Typography} from '@material-ui/core';
import RangeSliderVote from './RangeSlider.VoteAvg';
import {motion} from 'framer-motion';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterSection: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '.3rem',
      padding: '.8rem',
      marginBottom: '.5rem',
    },
    filterContainer: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
    },
  })
);

const Filters = () => {
  const classes = useStyles();

  return (
    <motion.div
      initial={{x: '-300px', opacity: 0}}
      animate={{x: 0, opacity: 1}}
      className={classes.filterSection}
    >
      <Typography variant="h6">FILTERS</Typography>
      <div className={classes.filterContainer}>
        <RangeSlider />
        <RangeSliderVote />
        <MultipleSelect />
      </div>
    </motion.div>
  );
};

export default Filters;
