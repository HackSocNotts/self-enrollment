import React from 'react';
import ReactDOM from 'react-dom';
import ServiceCard from './ServiceCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ServiceCard platform="Discord" buttonUrl="#" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
