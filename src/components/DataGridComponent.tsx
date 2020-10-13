import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../App.css';
import {
  RowsProp,
  DataGrid,
  ColDef,
  RowData,
  SortModel,
} from '@material-ui/data-grid';
import SearchField from './SearchFieldComponent';
import {useSelector} from 'react-redux';

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

  const searchFieldValue = useSelector(state => state.searchField.content);

  const columns: ColDef[] = [
    {field: 'id', hide: true},
    {
      field: 'username',
      headerName: 'Username',
    },
    {field: 'age', headerName: 'Age'},
  ];

  const [data] = useState({
    columns: columns,
  });
  const [rows, setRows] = useState<RowsProp>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(sortModel, page, searchFieldValue);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [sortModel, page, searchFieldValue]);

  return (
    <Container>
      <div className={classes.root}>
        <SearchField />
        <div style={{height: 1000, width: '100%'}}>
          <DataGrid
            rows={rows}
            columns={data.columns}
            pagination
            pageSize={5}
            rowCount={100}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            paginationMode="server"
            onPageChange={handlePageChange}
            loading={loading}
          />
        </div>
      </div>
    </Container>
  );
};

export default DataGridComponent;
