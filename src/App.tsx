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
import {grey, teal, orange, blue, amber} from '@material-ui/core/colors';
import Background from './assets/interstellar.jpg';

const globalTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: amber[400],
    },
    secondary: {
      main: blue[500],
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
  '@global': {
    '.MuiDataGrid-root': {
      backgroundColor: 'rgba(58, 58, 58, 0.88)',
    },

    '.MuiIconButton-root, .MuiTypography-root': {color: 'white'},
    '.MuiContainer-root, .MuiContainer-maxWidthLg': {
      marginBottom: 0,
    },
    '.MuiContainer-maxWidthXl': {
      maxWidth: '1500px',
    },
    '.MuiDataGrid-cell:hover': {
      cursor: 'pointer',
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
