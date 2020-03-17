import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './Profile.styles';
import CardHeader from '@material-ui/core/CardHeader';

export interface ProfileProps {
  username: string;
  imageURL: string;
}

const Profile: React.FC<ProfileProps> = ({ username, imageURL }) => {
  const classes = useStyles();
  const usernameParts = username.split('#');

  return (
    <CardHeader
      avatar={<Avatar alt={username} src={imageURL} className={classes.avatar} />}
      title={usernameParts[0]}
      subheader={`#${usernameParts[1]}`}
    />
  );
};

export default Profile;
