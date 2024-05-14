import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useStyles } from './FileUploader.style';

const FileUploader = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          inputProps={classes.textfield}
          id="file-upload"
          type="file"
          variant='outlined'
          fullWidth
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="success">
          Parse
        </Button>
      </Grid>
    </Grid>
  );
};

export default FileUploader;
