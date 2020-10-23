import React from 'react';
import {Container} from '@material-ui/core';
import Info from './Info';
import SearchField from './FilterSection/SearchFieldComponent';
import Filters from './FilterSection/FiltersComponent';
import DataGridComponent from './GridSection/DataGridComponent';

const MainSection = () => {
  return (
    <Container>
      <Info />
      <SearchField />
      <Filters />
      <DataGridComponent />
    </Container>
  );
};

export default MainSection;
