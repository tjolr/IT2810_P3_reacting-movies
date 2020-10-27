import React from 'react';
import './App.css';
import {
  createMuiTheme,
  ThemeProvider,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Navbar from './components/Navbar';
import MainSection from './components/MainSectionComponent';
import Info from './components/Info';
import {Container, withStyles} from '@material-ui/core';
import './index.css';
import {blue, grey, yellow, teal, green} from '@material-ui/core/colors';

const globalTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[400],
    },
    secondary: {
      main: teal[500],
      dark: teal[900],
    },
    info: {
      main: grey[500],
    },
    error: {
      main: green[100],
    },
  },
});

const useStyles = makeStyles({
  root: {
    background: 'url(https://wallpaperaccess.com/full/1746017.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    minHeight: '100vh',
  },
});

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiDataGrid-root': {
      backgroundColor: 'rgba(58, 58, 58, 0.95)',
    },
    '.MuiTablePagination-root': {},
    '.MuiIconButton-root': {color: 'white'},
    '.MuiContainer-root': {
      marginBottom: 0,
    },
    '.MuiContainer-maxWidthLg': {
      marginBottom: 0,
    },
  },
})(() => null);

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalCss />
      <div className={classes.root}>
        <Container>
          <Info />
          <MainSection />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
