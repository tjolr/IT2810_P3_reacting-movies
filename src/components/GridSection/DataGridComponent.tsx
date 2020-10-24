import React, {useState, useEffect, useRef} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import '../../App.css';
import {DataGrid, SortModel} from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import DetailViewModal from './DetailView.Modal';
import {useQuery} from '@apollo/client';
import {buildMovieQuery} from '../../fetch/QueryBuilder';
import {columnDefs} from './Columns';
import {useDispatch} from 'react-redux';
import {changePage} from '../../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 500,
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

  const [rowCount, setRowCount] = useState({
    active: 0,
    prev: 4800,
  });

  const [sortModel, setSortModel] = useState<SortModel>([
    {field: 'username', sort: 'asc'},
  ]);

  const handleSortModelChange = params => {
    console.log('handleSortModelChange');
    /* if (params.sortModel !== sortModel) {
      setSortModel(params.sortModel);
    } */
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
        <h2>Error while loading data!</h2>
        Reason: ${error.message}
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
          rowHeight={42}
          columns={columnDefs}
          pagination
          pageSize={pageSize}
          page={pageRedux}
          rowCount={rowCount.active}
          paginationMode="server"
          onPageChange={handlePageChange}
          /* sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange} */
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
