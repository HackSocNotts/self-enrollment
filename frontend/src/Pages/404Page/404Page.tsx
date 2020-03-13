import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const _404Page: React.FC = () => (
  <Container maxWidth="sm">
    <Typography align="center" variant="h3">
      Page not found.
    </Typography>
  </Container>
);

export default _404Page;
