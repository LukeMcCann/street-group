import Box from '@mui/material/Box';
import { useStyles } from './Header.style';

const Header = () => {
  const classes = useStyles();

  return (
    <Box component='h1' sx={classes.header} >
      Homeowner Name Service
    </Box>
  );
}

export default Header;
