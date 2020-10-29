import React from 'react';
import {mount} from 'cypress-react-unit-test';
import Info from '../../src/components/Info';

describe('Info', () => {
  it('Renders info with white text', () => {
    mount(<Info />);
  });
});
