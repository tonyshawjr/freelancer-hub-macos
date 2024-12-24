import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { theme } from './theme';
import { MockDataProvider } from './contexts/MockDataContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { AuthProvider } from './contexts/AuthContext';
import Router from './routes';

function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
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
      </AuthProvider>
    </DatabaseProvider>
  );
}

export default App;
