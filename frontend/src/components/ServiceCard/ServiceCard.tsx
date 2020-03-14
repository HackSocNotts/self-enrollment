import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './ServiceCard.styles';

export interface ServiceCardProps {
  platform: 'Discord' | 'GitHub';
  buttonUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ platform, buttonUrl }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {platform}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={buttonUrl}>
          Login to {platform}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
