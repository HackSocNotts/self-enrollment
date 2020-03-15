import React from 'react';
import Container from '@material-ui/core/Container';
import Heading from '../../components/Heading';
import ServiceCard from '../../components/ServiceCard';
import { DiscordReturnUrl } from '../../config';
import useStyles from './HomePage.styles';

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Heading />
      <div className={classes.container}>
        <Container maxWidth="md">
          <ServiceCard platform="Discord" buttonUrl={DiscordReturnUrl} />
        </Container>
      </div>
    </>
  );
};

export default HomePage;
