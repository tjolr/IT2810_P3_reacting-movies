import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import Navbar from './components/Navbar';
import DataGridComponent from './components/DataGridComponent';
import Info from './components/Info';

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: pink[300],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Navbar />
      <Info />
      <DataGridComponent />
    </ThemeProvider>
  );
};

export default App;
