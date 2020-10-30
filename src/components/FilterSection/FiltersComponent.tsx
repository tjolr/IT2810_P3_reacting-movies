import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import RangeSlider from './RangeSlider.ReleaseDate';
import RangeSliderVote from './RangeSlider.VoteAvg';
import {motion} from 'framer-motion';
import SearchField from './SearchField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterSection: {
      backgroundColor: 'rgba(68, 68, 68, 0.78)',
      borderRadius: '.3rem',
      padding: '.5rem 1.5rem .5rem 1.5rem',
      marginBottom: '.5rem',
    },
    filterContainer: {
      display: 'flex',
      /* Add marginBottom on first child on small screens */
      [theme.breakpoints.down('sm')]: {
        '& > *:first-child': {
          marginBottom: theme.spacing(2),
        },
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      [theme.breakpoints.up('md')]: {
        /* Get all children of filterContainer */
        '& > *': {
          flex: 1,
          marginLeft: '2rem',
          marginRight: '2rem',
          /* Remove margins on sides of the first and last child */
          '&:first-child': {
            marginLeft: 0,
            flex: 2,
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
      <div className={classes.filterContainer}>
        <SearchField />
        <RangeSlider />
        <RangeSliderVote />
      </div>
    </motion.div>
  );
};

export default Filters;
