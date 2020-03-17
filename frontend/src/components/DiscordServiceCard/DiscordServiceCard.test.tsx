import React from 'react';
import ReactDOM from 'react-dom';
import DiscordServiceCard from './DiscordServiceCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DiscordServiceCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
