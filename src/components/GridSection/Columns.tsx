import {ColDef} from '@material-ui/data-grid';
import {getLanguageName} from '../../utils/isoLanguages';
import {
  currencyFormatter,
  minutesToHourString,
} from '../../utils/columnFormatting';

/* ColDef for dataGrid. */
export const columnDefs: ColDef[] = [
  /* Needs the id rows to pass to detailview so it can review
  the chosen movieId */
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
    /* Formats the date to only show the year */
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
    /* Shows a dollarsign before and .00 behind the value */
    valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    type: 'number',
    width: 160,
    /* Shows a dollarsign before and .00 behind the value */
    valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
  },

  {
    field: 'runtime',
    headerName: 'Runtime',
    type: 'string',
    /* Shows minutes and hours instead of just minutes which is 
    more understandable */
    valueFormatter: ({value}) => minutesToHourString(value as number),
  },
];
