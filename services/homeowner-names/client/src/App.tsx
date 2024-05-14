import StackLayout from './components/StackLayout';
import FileUploader from './components/FileUploader';
import Box from '@mui/material/Box';

const App = () => (
  <StackLayout>
    <Box component='h1' sx={{ padding: 2 }} >
      Homeowner Name Service
    </Box>
    <FileUploader />
  </StackLayout>
);

export default App
