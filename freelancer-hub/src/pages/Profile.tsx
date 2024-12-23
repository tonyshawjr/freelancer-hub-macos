import { Typography, Box, Paper, Grid, Avatar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PageTitle from '../components/common/PageTitle';

const Profile = () => {
  console.log('Profile component mounted');

  // Mock user data - replace with actual user data from your context/state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Freelancer',
    joinDate: 'January 2024',
    avatar: '' // Add avatar URL if available
  };

  return (
    <Box>
      <PageTitle>Profile</PageTitle>

      <Paper sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12} display="flex" alignItems="center" gap={3}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#6366F1'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {user.joinDate}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                borderColor: '#6366F1',
                color: '#6366F1',
                '&:hover': {
                  borderColor: '#4F46E5',
                  bgcolor: 'rgba(99, 102, 241, 0.04)'
                }
              }}
            >
              Edit Profile
            </Button>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Profile Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1">{user.role}</Typography>
              </Grid>
              {/* Add more profile fields as needed */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
