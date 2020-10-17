import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Navbar from './components/Navbar';
import DataGridComponent from './components/GridSection/DataGridComponent';
import Info from './components/Info';
import SearchField from './components/SearchFieldComponent';
import Filters from './components/FilterSection/FiltersComponent';
import MainSection from './components/MainSectionComponent';

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[200],
      light: lightBlue[50],
    },
    secondary: {
      main: pink[200],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Navbar />
      <MainSection />
    </ThemeProvider>
  );
};

export default App;
