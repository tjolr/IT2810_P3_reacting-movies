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
import {grey, teal, orange} from '@material-ui/core/colors';
import Background from './assets/interstellar.jpg';

const globalTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: orange[200],
    },
    secondary: {
      main: teal[400],
      dark: teal[900],
    },
    info: {
      main: grey[500],
    },
  },
});

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${Background})`,
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

    '.MuiIconButton-root, .MuiTypography-root': {color: 'white'},
    '.MuiContainer-root, .MuiContainer-maxWidthLg': {
      marginBottom: 0,
    },
    '.MuiContainer-maxWidthXl': {
      maxWidth: '1500px',
    },
  },
})(() => null);

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalCss />
      <div className={classes.root}>
        <Container maxWidth="xl">
          <Info />
          <MainSection />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
