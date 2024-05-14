import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useStyles } from './FileUploader.style';

const PARSING_ENDPOINT = 'http://localhost:8081/parse-csv';
const ACCEPTED_FORMATS = ['.csv'];

interface FileUploaderProps {
  onUploadResponse: (response: any) => void;
  onUploadStart: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadStart, onUploadResponse }) => {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileToUpload = event.target.files?.[0];

    if (fileToUpload) {
      const extension = '.' + fileToUpload.name.split('.').pop();

      if (!extension || !ACCEPTED_FORMATS.includes(extension)) {
        alert(`Invalid file format. Accepted Formats: ${ACCEPTED_FORMATS.join(',')}.`);
        event.target.value = '';
        return;
      } else {
        setFile(fileToUpload);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert(`Please select a file to upload. Accepted Formats: ${ACCEPTED_FORMATS.join(',')}.`);
      return;
    }

    onUploadStart();
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(PARSING_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log({ data: response.data });
      onUploadResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
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
          onChange={handleFileChange}
          type="file"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Button onClick={handleFileUpload} variant="contained" color="success">
          Parse
        </Button>
      </Grid>
    </Grid>
  );
};

export default FileUploader;
