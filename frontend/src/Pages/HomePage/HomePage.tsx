import React from 'react';
import Container from '@material-ui/core/Container';
import Heading from '../../components/Heading';
import useStyles from './HomePage.styles';
import DiscordServiceCard from '../../components/DiscordServiceCard';
import GitHubServiceCard from '../../components/GitHubServiceCard';

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Heading />
      <div className={classes.container}>
        <Container maxWidth="md" className={classes.innerContainer}>
          <DiscordServiceCard />
        </Container>
      </div>
    </>
  );
};

export default HomePage;
