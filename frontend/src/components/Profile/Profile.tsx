import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './Profile.styles';
import CardHeader from '@material-ui/core/CardHeader';

export interface ProfileProps {
  name: string;
  username: string;
  usernameIdentifier: string;
  imageURL: string;
}

const Profile: React.FC<ProfileProps> = ({ username, name, usernameIdentifier, imageURL }) => {
  const classes = useStyles();

  return (
    <CardHeader
      avatar={<Avatar alt={username} src={imageURL} className={classes.avatar} />}
      title={name}
      subheader={`${usernameIdentifier}${username}`}
    />
  );
};

export default Profile;
