import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useStyles } from './StackLayout.style';

interface StaticLayoutProps {
  children: React.ReactNode;
}

const StackLayout = ({
  children,
}: StaticLayoutProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={classes.container}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}

export default StackLayout;
