import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './ServiceCard.styles';
import { LinearProgress, CardHeader } from '@material-ui/core';
import Profile, { ProfileProps } from '../Profile';

export interface ServiceCardProps {
  platform: 'Discord' | 'GitHub';
  loginURL?: string;
  loading: boolean;
  profile?: ProfileProps;
  message?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ platform, loginURL, loading, profile, message }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      {loading && <LinearProgress />}
      <CardHeader title={platform} />
      {profile && <Profile {...profile} />}
      <CardContent>
        {!profile && <Typography>Login with {platform} below to enroll.</Typography>}
        {profile && message && <>{message}</>}
      </CardContent>
      <CardActions>
        {loginURL && !profile && (
          <Button size="small" component={Link} href={loginURL}>
            Login to {platform}
          </Button>
        )}
        {profile && <Button size="small">Enroll</Button>}
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
