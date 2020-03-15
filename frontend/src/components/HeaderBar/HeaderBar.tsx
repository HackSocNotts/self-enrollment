import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from './HeaderBar.styles';
import HackSocIcon from '../../Icons/HackSocIcon';
import { NavLink } from 'react-router-dom';

const HeaderBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative" variant="outlined">
      <Toolbar>
        <HackSocIcon className={classes.icon} color="inherit" />
        <Typography variant="h6" color="inherit" component={NavLink} to="/" noWrap className={classes.headerLink}>
          HackSoc Self Enrollment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
