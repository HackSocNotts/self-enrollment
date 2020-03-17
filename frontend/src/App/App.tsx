import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
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
      <CookiesProvider>
        <Router>
          <HeaderBar />
        </Router>
      </CookiesProvider>
      <Footer />
    </>
  );
};

export default App;
