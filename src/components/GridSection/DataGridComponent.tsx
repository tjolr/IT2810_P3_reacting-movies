import React, {useState, useEffect, useRef} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {DataGrid} from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import DetailViewModal from './DetailViewSection/DetailView.Modal';
import {useQuery} from '@apollo/client';
import {buildMovieQuery} from '../../GraphQL/QueryBuilder';
import {columnDefs} from './Columns';
import {useDispatch} from 'react-redux';
import {changePage, updateSort} from '../../redux/actions';
import {Typography} from '@material-ui/core';
import '../../App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        height: 400,
      },
      // Lets the grid use the rest of the available space below filters.
      [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 320px)',
      },
    },
  })
);

const DataGridComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageSize = 25;

  // Reference to the detailView modal
  const detailViewChildRef = useRef<any>(null);
  // DetailViewParams are data loaded in the grid and should also
  // be showed in detailView. These are passed as props so that
  // detailView doesn't need to fetch data that already has been
  // requested
  const [detailViewParams, setDetailViewParams] = useState(null);

  /* Here are four selectors that listens to changes in the redux store.
  These are use to fetch new data from DB when values are changed by user */
  const searchStringRedux = useSelector(
    state => state.movieReducer.searchString
  );
  const pageRedux = useSelector(state => state.movieReducer.page);
  const filterRedux = useSelector(state => state.movieReducer.filter);
  const sortRedux = useSelector(state => state.movieReducer.sort);

  /* When the grid is loading, I want to show the previous number of rows
  until the new one are loaded in. Therefore we need a state that holds
  both the active number of rows, and previous. */
  const [rowCount, setRowCount] = useState({
    active: 0,
    prev: 0,
  });

  /* Dispatches new sort with field and direction */
  const handleSortModelChange = params => {
    dispatch(updateSort(params.sortModel[0]));
  };

  /* Dispatches change to new page */
  const handlePageChange = params => {
    dispatch(changePage(params.page));
  };

  /* Pass data from row to detailView, and then shows it */
  const onRowClick = (e: any) => {
    setDetailViewParams(e.data);
    detailViewChildRef.current.toggleDetailView();
  };

  /* The useQuery hook for sending GraphQL query requests  */
  const {loading, error, data} = useQuery(buildMovieQuery(), {
    variables: {
      searchString: searchStringRedux !== undefined ? searchStringRedux : '',
      page: pageRedux,
      filter: filterRedux,
      sort: sortRedux,
    },
  });

  /* When data is changed, the rowCount also gets updated */
  useEffect(() => {
    const tmpRowCount = {...rowCount};
    if (data === undefined) {
      tmpRowCount.active = tmpRowCount.prev;
    } else {
      tmpRowCount.active = data.Movie.totalRowCount;
      tmpRowCount.prev = data.Movie.totalRowCount;
    }

    setRowCount(tmpRowCount);
    // eslint-disable-next-line
  }, [data]);

  if (error)
    return (
      <div>
        <Typography variant="h4">Error while loading data!</Typography>
        <Typography variant="h6">Reason: ${error.message}</Typography>
      </div>
    );

  return (
    /* Start animation */
    <motion.div
      initial={{y: '200px', opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.6}}
      className={classes.root}
    >
      <div style={{height: '100%', width: '100%'}}>
        <DataGrid
          rows={loading ? [] : data.Movie.movies}
          rowHeight={34}
          columns={columnDefs}
          pagination
          pageSize={pageSize}
          /* Material DataGrid by default shows rowPerPageOptions
          so passed in just one value to hide it. */
          rowsPerPageOptions={[pageSize]}
          page={pageRedux}
          rowCount={rowCount.active}
          /* Server side pagination, this disables the DataGrids client side pagination */
          paginationMode="server"
          /* Callback on page change */
          onPageChange={handlePageChange}
          /* Server side sorting */
          sortingMode="server"
          sortModel={sortRedux}
          /* Callback for sort chagne */
          onSortModelChange={handleSortModelChange}
          /* To disable selection features in dataGrid */
          disableSelectionOnClick={true}
          /* Callback that opens up the detailView */
          onRowClick={onRowClick}
          /* Loading spinner when data is beeing fetched */
          loading={loading}
        />
      </div>

      {/* DetailView with detailed information about the movie
      and reviews. */}
      <DetailViewModal
        ref={detailViewChildRef}
        detailViewParams={detailViewParams}
      />
    </motion.div>
  );
};

export default DataGridComponent;
