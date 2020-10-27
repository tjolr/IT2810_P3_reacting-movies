import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import RangeSlider from './RangeSlider.ReleaseDate';
import {Typography} from '@material-ui/core';
import RangeSliderVote from './RangeSlider.VoteAvg';
import {motion} from 'framer-motion';
import SearchField from './SearchFieldComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterSection: {
      backgroundColor: 'rgba(68, 68, 68, 0.95)',
      borderRadius: '.3rem',
      padding: '1rem 3rem 1rem 3rem',
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
      [theme.breakpoints.up('md')]: {
        '& > *': {
          marginLeft: '2rem',
          marginRight: '2rem',
          '&:first-child': {
            marginLeft: 0,
          },
          '&:last-child': {
            marginRight: 0,
          },
        },
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
      <SearchField />
      <div className={classes.filterContainer}>
        <RangeSlider />
        <RangeSliderVote />
      </div>
    </motion.div>
  );
};

export default Filters;
