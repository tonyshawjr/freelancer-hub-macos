import { useEffect } from 'react';
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';
import PageTitle from '../components/common/PageTitle';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Settings component mounted at:', location.pathname);
    
    // Log the component tree
    let parent = document.getElementById('root');
    let tree = '';
    while (parent) {
      tree += parent.tagName + ' > ';
      parent = parent.firstElementChild as HTMLElement;
    }
    console.log('Component tree:', tree);

    // Log the current route state
    console.log('Current route state:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      key: location.key,
      state: location.state
    });
  }, [location]);

  return (
    <Box>
      <PageTitle>Settings</PageTitle>
      
      <Paper sx={{ p: 4, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              This is the settings page
            </Typography>
            <Typography color="text.secondary">
              Settings content will go here
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
