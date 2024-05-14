import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useStyles } from './FileUploader.style';

const ACCEPTED_FORMATS = ['.csv'];

const FileUploader = () => {
  const classes = useStyles();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    const fileToUpload = event.target.files?.[0];

    if (fileToUpload) {
      const extension = '.' + fileToUpload.name.split('.').pop();

      if (!extension || !ACCEPTED_FORMATS.includes(extension)) {
        alert(`Invalid file format. Accepted Formats: ${ACCEPTED_FORMATS.join(',')}.`);
        event.target.value = '';
        return;
      } else {
        alert('Handling Valid File');
      }
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          inputProps={{
            ...classes.textfield,
            accept: ACCEPTED_FORMATS,
          }}
          id="file-upload"
          onChange={(e) => handleFileChange(e)}
          type="file"
          variant='outlined'
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
