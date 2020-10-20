import React, {useState, useEffect, useRef} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import '../../App.css';
import {
  RowsProp,
  DataGrid,
  ColDef,
  RowData,
  SortModel,
} from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import DetailViewModal from './DetailView.Modal';
import {useQuery, gql} from '@apollo/client';
import {Typography} from '@material-ui/core';
import {buildQuery} from '../../fetch/QueryBuilder';
import {columnDefs} from './Columns';

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

const rowData: RowData[] = [
  {id: 1, username: 'tr', age: '2'},
  {id: 2, username: 'ans', age: '5'},
  {id: 3, username: 'trdw', age: '14'},
  {id: 4, username: 'ansdwd', age: '71'},
  {id: 5, username: 'tradd', age: '14'},
  {id: 6, username: 'ansss', age: '16'},
  {id: 7, username: 'trsss', age: '4'},
  {id: 8, username: 'ansgg', age: '7'},
  {id: 9, username: 'thhfhr', age: '14'},
  {id: 10, username: 'ansgs', age: '16'},
  {id: 11, username: 'tffr', age: '46'},
  {id: 12, username: 'anfdfs', age: '68'},
];

function loadServerRows(
  sortModel: SortModel,
  page: number,
  searchFieldValue: String
): Promise<any> {
  return new Promise<any>(resolve => {
    setTimeout(() => {
      if (searchFieldValue && searchFieldValue.length > 0) {
        const matchingRows = rowData.filter(row =>
          row.username.includes(searchFieldValue)
        );

        resolve(matchingRows);
        return;
      }

      if (sortModel.length === 0) {
        resolve(rowData.slice((page - 1) * 5, page * 5));
        return;
      }

      const sortedColumn = sortModel[0];

      let sortedRows = [
        ...rowData.sort((a, b) =>
          String(a[sortedColumn.field]).localeCompare(
            String(b[sortedColumn.field])
          )
        ),
      ];

      if (sortModel[0].sort === 'desc') {
        sortedRows = sortedRows.reverse();
      }
      resolve(sortedRows);
    }, Math.random() * 500 + 100);
  });
}

const DataGridComponent = () => {
  const classes = useStyles();
  const [rowDataState, setRowDataState] = useState<RowsProp>([]);

  const detailViewChildRef = useRef<any>(null);
  const [detailViewParams, setDetailViewParams] = useState(null);
  const searchFieldValue = useSelector(state => state.searchField.content);

  const [data2] = useState({
    columns: columnDefs,
  });
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState<SortModel>([
    {field: 'username', sort: 'asc'},
  ]);

  const handleSortModelChange = params => {
    if (params.sortModel !== sortModel) {
      setSortModel(params.sortModel);
    }
  };

  const handlePageChange = params => {
    setPage(params.page);
  };

  const onRowClick = (e: any) => {
    console.log(e);
    setDetailViewParams(e.data);
    detailViewChildRef.current.toggleDetailView();
  };

  useEffect(() => {
    console.log('searchFieldValue:', searchFieldValue);
  }, [searchFieldValue]);
  const {loading, error, data} = useQuery(buildQuery(searchFieldValue));

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
          columns={data2.columns}
          pagination
          pageSize={5}
          rowCount={100}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          paginationMode="server"
          onPageChange={handlePageChange}
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
