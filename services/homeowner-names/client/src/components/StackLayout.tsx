import Grid from '@mui/material/Grid';
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
        <div style={classes.container}>
          {children}
        </div>
      </Grid>
    </Grid>
  );
}

export default StackLayout;
