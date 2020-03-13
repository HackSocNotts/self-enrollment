import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store';
import HomePage from '../Pages/HomePage';
import _404Page from '../Pages/404Page';

export interface RouterProps {
  children?: React.ReactNode;
}

const Router: React.FC<RouterProps> = ({ children }) => {
  return (
    <ConnectedRouter history={history}>
      {children && children}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route component={_404Page} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;
