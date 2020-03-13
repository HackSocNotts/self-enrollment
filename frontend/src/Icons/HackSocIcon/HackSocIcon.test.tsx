import React from 'react';
import ReactDOM from 'react-dom';
import HackSocIcon from './HackSocIcon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HackSocIcon />, div);
  ReactDOM.unmountComponentAtNode(div);
});

xit('can change colour', () => {});
