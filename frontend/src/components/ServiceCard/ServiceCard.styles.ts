import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  error: {
    borderColor: theme.palette.error.main,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: theme.shape.borderRadius,
  },
  info: {
    borderColor: theme.palette.info.main,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: theme.shape.borderRadius,
  },
}));

export default useStyles;
