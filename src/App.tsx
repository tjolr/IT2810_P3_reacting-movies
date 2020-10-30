import React from 'react';
import './App.css';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import MainSection from './components/MainSectionComponent';
import {Container, withStyles} from '@material-ui/core';
import './index.css';
import {grey, blue, amber} from '@material-ui/core/colors';
import Background from './assets/interstellar.jpg';

/* Global Material UI theme
This is sent in a provider so that every component can use it. */
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
    /* Styles for full page image */
    /* Background image used is found here: https://wallpaperaccess.com/4k-interstellar */
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    minHeight: '100vh',
  },
});

/* GlobalCss that is used to override Material components */
const GlobalCss = withStyles({
  '@global': {
    '.MuiDataGrid-root': {
      backgroundColor: 'rgba(58, 58, 58, 0.88)',
    },
    '.MuiIconButton-root, .MuiTypography-root': {color: 'white'},
    '.MuiContainer-root, .MuiContainer-maxWidthLg': {
      marginBottom: 0,
    },
    /* Maxwidth to prevent max-container to getting too large */
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
    /* Themeprovider makes the theme prop available to all children components. */
    <ThemeProvider theme={globalTheme}>
      <GlobalCss />
      <div className={classes.root}>
        <Container maxWidth="xl">
          <MainSection />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
