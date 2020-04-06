import React, { useEffect } from 'react';
import Router from './Router';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

export interface AppProps {
  version?: string;
}

const App: React.FC<AppProps> = ({ version }) => {
  useEffect(() => {
    document.title = `Self Enrollment v${version || '0.0.0'}`;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <HeaderBar />
      </Router>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
