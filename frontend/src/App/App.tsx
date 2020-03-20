import React, { useEffect } from 'react';
import Router from './Router';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

export interface AppProps {
  version?: string;
}

const App: React.FC<AppProps> = ({ version }) => {
  useEffect(() => {
    document.title = `Self Enrollment v${version || '0.0.0'}`;
  });

  return (
    <>
      <CssBaseline />
      <Router>
        <HeaderBar />
      </Router>
      <Footer />
    </>
  );
};

export default App;
