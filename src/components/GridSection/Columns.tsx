import {ColDef} from '@material-ui/data-grid';
import {getLanguageName} from '../../utils/isoLanguages';

export const columnDefs: ColDef[] = [
  {field: 'id', hide: true},
  {field: '_id', hide: false},
  {field: 'title', headerName: 'Title', width: 250},
  {
    field: 'release_date',
    headerName: 'Release year',
    width: 120,
    type: 'number',
    valueFormatter: ({value}: any) => new Date(value).getFullYear(),
  },
  {
    field: 'vote_average',
    headerName: 'Avg. vote',
    type: 'number',
  },
  {
    field: 'popularity',
    headerName: 'popularity',
    width: 120,
    type: 'number',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    type: 'number',
    width: 160,
  },
  {
    field: 'original_language',
    headerName: 'Original lang.',
    width: 120,
    valueFormatter: ({value}: any) => getLanguageName(value),
  },
  {
    field: 'runtime',
    headerName: 'Runtime',
    type: 'number',
  },
  {
    field: 'tagline',
    headerName: 'Tagline',
    width: 450,
  },
];
