import React from 'react';
import Filters from './FilterSection/FiltersComponent';
import DataGridComponent from './GridSection/DataGridComponent';
import Info from './InfoSection/Info';

/* Main section component is basically holding all the important 
components with its children */
const MainSection = () => {
  return (
    <div>
      <Info />
      <Filters />
      <DataGridComponent />
    </div>
  );
};

export default MainSection;
