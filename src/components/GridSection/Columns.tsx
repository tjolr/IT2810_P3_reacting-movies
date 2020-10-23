import {ColDef} from '@material-ui/data-grid';

export const columnDefs: ColDef[] = [
  {field: 'id', hide: true},
  {field: 'title', headerName: 'Title', width: 250},
  {
    field: 'release_date',
    headerName: 'Release year',
    width: 120,
    type: 'date',
    valueFormatter: ({value}: any) => new Date(value).getFullYear(),
  },
  {
    field: 'vote_average',
    headerName: 'Avg. vote',
  },
  {
    field: 'original_language',
    headerName: 'Original lang.',
    width: 120,
  },
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
    headerName: 'Tagline',
  },
];
