import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    MuiBox?: {
      styleOverrides?: {
        root?: {
          '&[data-page-content="true"]'?: {
            maxWidth: string;
            width: string;
            marginLeft: string;
            marginRight: string;
            padding: string;
          };
        };
      };
    };
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 18,
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
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
          },
        },
      },
    },
  },
  palette: {
  },
});
