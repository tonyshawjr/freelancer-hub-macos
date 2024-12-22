import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import GlobalStyles from './styles/GlobalStyles';
import Router from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MockDataProvider } from './context/MockDataContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <GlobalStyles />
        <MockDataProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </MockDataProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
