import {ColDef} from '@material-ui/data-grid';
import {getLanguageName} from '../../utils/isoLanguages';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const minutesToHourString = (minutes: number) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

export const columnDefs: ColDef[] = [
  {field: 'id', hide: true},
  {field: '_id', hide: true},
  {field: 'title', headerName: 'Title', width: 340},
  {
    field: 'original_language',
    headerName: 'Original language',
    width: 150,
    valueFormatter: ({value}: any) => getLanguageName(value),
  },
  {
    field: 'release_date',
    headerName: 'Release year',
    width: 120,
    type: 'number',
    valueFormatter: ({value}: any) => new Date(value).getFullYear(),
  },
  {
    field: 'popularity',
    headerName: 'Popularity',
    width: 120,
    type: 'number',
  },
  {
    field: 'vote_average',
    headerName: 'Average vote',
    type: 'number',
    width: 120,
  },
  {
    field: 'vote_count',
    headerName: 'Votes',
    type: 'number',
  },
  {
    field: 'budget',
    headerName: 'Budget',
    type: 'number',
    width: 160,
    valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    type: 'number',
    width: 160,
    valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
  },

  {
    field: 'runtime',
    headerName: 'Runtime',
    type: 'number',
    valueFormatter: ({value}) => minutesToHourString(value as number),
  },
];
