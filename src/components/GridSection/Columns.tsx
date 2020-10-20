import {ColDef} from '@material-ui/data-grid';

export const columnDefs: ColDef[] = [
  {field: 'id', hide: true},
  {field: 'title', headerName: 'Title', width: 200},
  {
    field: 'popularity',
    headerName: 'popularity',
  },
  {
    field: 'revenue',
    headerName: 'revenue',
  },
  {
    field: 'runtime',
    headerName: 'Runtime',
  },
  {
    field: 'tagline',
    headerName: 'tagline',
  },
];
