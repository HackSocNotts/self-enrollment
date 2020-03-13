import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useStyles from './Heading.styles';

const Heading: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Self Enrollment Service
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Use this service to self-enroll yourself on third party services that require you to hold a separate account.
        </Typography>
      </Container>
    </div>
  );
};

export default Heading;
