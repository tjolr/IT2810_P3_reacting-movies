import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import {
  RowsProp,
  DataGrid,
  ColDef,
  RowData,
  SortModel,
} from '@material-ui/data-grid';

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
  {id: 1, username: 'tr', age: '14'},
  {id: 2, username: 'ans', age: '16'},
  {id: 3, username: 'trdw', age: '14'},
  {id: 4, username: 'ansdwd', age: '16'},
  {id: 5, username: 'tradd', age: '14'},
  {id: 6, username: 'ansss', age: '16'},
  {id: 7, username: 'trsss', age: '14'},
  {id: 8, username: 'ansgg', age: '16'},
  {id: 9, username: 'thhhfhfhr', age: '14'},
  {id: 10, username: 'ansgs', age: '16'},
  {id: 11, username: 'tffr', age: '14'},
  {id: 12, username: 'anfdfs', age: '16'},
];

function loadServerRows(
  sortModel: SortModel,
  page: number,
  data: any
): Promise<any> {
  return new Promise<any>(resolve => {
    setTimeout(() => {
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

  const columns: ColDef[] = [
    {field: 'id', hide: true},
    {
      field: 'username',
      headerName: 'Username',
      description:
        'The identification used by the person with access to the online service.',
    },
    {field: 'age', headerName: 'Age'},
  ];

  const [data, setData] = useState({
    columns: columns,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<RowsProp>([]);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState<SortModel>([
    {field: 'username', sort: 'asc'},
  ]);

  const handleSortModelChange = params => {
    debugger;
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
      const newRows = await loadServerRows(sortModel, page, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [sortModel, page, data]);

  return (
    <Container>
      <div className={classes.root}>
        <TextField
          className={classes.searchField}
          label="Search"
          id="searchMovieField"
          onChange={e => console.log(e.target.value)}
        />
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
