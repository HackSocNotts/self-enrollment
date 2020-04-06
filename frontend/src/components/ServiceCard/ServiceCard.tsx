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
  enrolFunction?: () => void;
  info?: string;
  error?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  platform,
  loginURL,
  loading,
  profile,
  message,
  enrolFunction,
  info,
  error,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      {loading && <LinearProgress />}
      <CardHeader title={platform} />
      {!error && info && <CardContent className={classes.info}>{info}</CardContent>}
      {error && <CardContent className={classes.error}>{error}</CardContent>}
      {profile && <Profile {...profile} />}
      <CardContent>
        {!profile && <Typography>Login with {platform} below to enroll.</Typography>}
        {profile && message && <>{message}</>}
      </CardContent>
      <CardActions>
        {loginURL && !profile && (
          <Button size="small" component={Link} href={loginURL} disabled={loading}>
            Login to {platform}
          </Button>
        )}
        {profile && enrolFunction && (
          <Button size="small" onClick={enrolFunction} disabled={loading}>
            Enroll
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
