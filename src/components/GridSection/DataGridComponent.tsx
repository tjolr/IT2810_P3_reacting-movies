import React, {useState, useEffect, useRef} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import '../../App.css';
import {DataGrid, SortModel} from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import DetailViewModal from './DetailViewSection/DetailView.Modal';
import {useQuery} from '@apollo/client';
import {buildMovieQuery} from '../../fetch/QueryBuilder';
import {columnDefs} from './Columns';
import {useDispatch} from 'react-redux';
import {changePage, updateSort} from '../../redux/actions';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 700,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    searchField: {
      width: '50%',
      marginBottom: '1rem',
    },
  })
);

const DataGridComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageSize = 10;

  const detailViewChildRef = useRef<any>(null);
  const [detailViewParams, setDetailViewParams] = useState(null);
  const searchStringRedux = useSelector(
    state => state.movieReducer.searchString
  );
  const pageRedux = useSelector(state => state.movieReducer.page);
  const filterRedux = useSelector(state => state.movieReducer.filter);
  const sortRedux = useSelector(state => state.movieReducer.sort);

  const [rowCount, setRowCount] = useState({
    active: 0,
    prev: 4800,
  });

  const [sortModel, setSortModel] = useState<SortModel>([
    {field: 'username', sort: 'asc'},
  ]);

  const handleSortModelChange = params => {
    dispatch(updateSort(params.sortModel[0]));
  };

  const handlePageChange = params => {
    dispatch(changePage(params.page));
  };

  const onRowClick = (e: any) => {
    setDetailViewParams(e.data);
    detailViewChildRef.current.toggleDetailView();
  };

  const {loading, error, data} = useQuery(buildMovieQuery(), {
    variables: {
      searchString: searchStringRedux !== undefined ? searchStringRedux : '',
      page: pageRedux,
      filter: filterRedux,
      sort: sortRedux,
    },
  });

  useEffect(() => {
    const tmpRowCount = {...rowCount};
    if (data === undefined) {
      tmpRowCount.active = tmpRowCount.prev;
    } else {
      tmpRowCount.active = data.Movie.totalRowCount;
      tmpRowCount.prev = data.Movie.totalRowCount;
    }

    setRowCount(tmpRowCount);
  }, [data]);

  if (error)
    return (
      <div>
        <Typography variant="h4">Error while loading data!</Typography>
        <Typography variant="h6">Reason: ${error.message}</Typography>
      </div>
    );

  return (
    <motion.div
      initial={{y: '200px', opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.6}}
      className={classes.root}
    >
      <div style={{height: 1000, width: '100%'}}>
        <DataGrid
          rows={loading ? [] : data.Movie.movies}
          rowHeight={34}
          autoHeight={true}
          columns={columnDefs}
          pagination
          pageSize={pageSize}
          page={pageRedux}
          rowCount={rowCount.active}
          paginationMode="server"
          onPageChange={handlePageChange}
          sortingMode="server"
          sortModel={sortRedux}
          onSortModelChange={handleSortModelChange}
          disableSelectionOnClick={true}
          onRowClick={onRowClick}
          loading={loading}
        />
      </div>

      <DetailViewModal
        ref={detailViewChildRef}
        detailViewParams={detailViewParams}
      />
    </motion.div>
  );
};

export default DataGridComponent;
