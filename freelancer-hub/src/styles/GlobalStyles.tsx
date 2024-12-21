import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <MuiGlobalStyles
      styles={{
        ':root': {
          fontSize: '18px', // Base root font size
        },
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%',
        },
        body: {
          backgroundColor: theme.palette.background.default,
          height: '100%',
          width: '100%',
        },
        '#root': {
          height: '100%',
          width: '100%',
        },
        '.page-container': {
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          width: '100%',
        },
      }}
    />
  );
};

export default GlobalStyles;
