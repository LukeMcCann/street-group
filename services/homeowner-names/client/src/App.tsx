import { useState } from 'react';
import StackLayout from './components/StackLayout';
import FileUploader from './components/FileUploader';
import Header from './components/Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const [uploadResponse, setUploadResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUploadResponse = (response: any) => {
    setUploadResponse(response);
    setIsLoading(false);
  };

  const handleUploadStart = () => {
    setIsLoading(true);
  };

  return (
    <StackLayout>
      <Header />
      <FileUploader onUploadStart={handleUploadStart} onUploadResponse={handleUploadResponse} />
      {isLoading && <CircularProgress sx={{ margin: '200px' }} />}
      {(!isLoading && uploadResponse) && (
        <Box sx={{ padding: 10, paddingTop: 5 }}>
          <Typography component="p">Data Saved At: {uploadResponse.csv_file_path}</Typography>
          <Box textAlign="center">
            <textarea
              readOnly
              style={{ width: '100%', height: '300px', textAlign: 'left' }}
              value={JSON.stringify(uploadResponse.people, null, 2)}
            />
          </Box>
        </Box>
      )}
    </StackLayout>
  );
};

export default App;
