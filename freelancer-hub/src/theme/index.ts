import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 18, // This sets the base font size to 20px
    h1: {
      fontSize: '2.5rem', // 50px
    },
    h2: {
      fontSize: '2rem', // 40px
    },
    h3: {
      fontSize: '1.75rem', // 35px
    },
    h4: {
      fontSize: '1.5rem', // 30px
    },
    h5: {
      fontSize: '1.25rem', // 25px
    },
    h6: {
      fontSize: '1rem', // 20px
    },
    body1: {
      fontSize: '0.875rem', // 17.5px
    },
    body2: {
      fontSize: '0.75rem', // 15px
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          maxWidth: '1280px !important',
          paddingLeft: '24px',
          paddingRight: '24px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    // Add specific styles for dashboard cards
    MuiCard: {
      styleOverrides: {
        root: {
          '& .card-title': {
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          },
          '& .card-subtitle': {
            fontSize: '1rem',
            color: 'text.secondary',
          },
          '& .card-detail': {
            fontSize: '0.7rem',
            color: 'text.secondary',
            marginTop: '0.5rem',
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '&[data-page-content="true"]': {
            maxWidth: '1280px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '24px'
          }
        }
      }
    }
  },
  palette: {
  },
});
