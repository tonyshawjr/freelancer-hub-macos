import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Button,
  CircularProgress,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { SecondaryButton } from '../../common/buttons';
import { useDatabase } from '../../../contexts/DatabaseContext';

interface Profile {
  id: string;
  full_name: string;
  title: string;
  timezone: string;
  avatar_url: string | null;
}

export default function ProfileSection() {
  const { db } = useDatabase();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    timeZone: 'UTC',
    language: 'en',
    twoFactorEnabled: false,
    avatarUrl: null as string | null,
  });

  useEffect(() => {
    if (db) {
      loadProfile();
    }
  }, [db]);

  const loadProfile = async () => {
    try {
      // First check if we have an authenticated user
      const { data: { user }, error: userError } = await db.client.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setMessage({ type: 'error', text: 'Please sign in to view your profile' });
        return;
      }

      // Try to get the profile
      const { data, error } = await db.from('profiles', true) // Use admin client
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If table doesn't exist, just use defaults
        if (error.code === '42P01') {
          return;
        }
        throw error;
      }

      if (data) {
        const names = data.full_name?.split(' ') || ['', ''];
        setFormData(prev => ({
          ...prev,
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          timeZone: data.timezone || 'UTC',
          avatarUrl: data.avatar_url,
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      if (error.message === 'Auth session missing!') {
        setMessage({ type: 'error', text: 'Please sign in to view your profile' });
      } else {
        setMessage({ type: 'error', text: 'Failed to load profile' });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const handleSwitchChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  const handleSave = async () => {
    if (!db) return;
    
    setLoading(true);
    try {
      // Get the user's ID from auth
      const { data: { user }, error: userError } = await db.client.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setMessage({ type: 'error', text: 'Please sign in to update your profile' });
        return;
      }

      // Try to create/update the profile
      const { error } = await db.from('profiles', true) // Use admin client
        .upsert({
          id: user.id,
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          timezone: formData.timeZone,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (error) {
        // If table doesn't exist, show a more helpful message
        if (error.code === '42P01') {
          setMessage({ type: 'error', text: 'Database setup required. Please run migrations first.' });
          return;
        }
        throw error;
      }

      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.message === 'Auth session missing!') {
        setMessage({ type: 'error', text: 'Please sign in to update your profile' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || !db) return;
    
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const { data: { user }, error: userError } = await db.client.auth.getUser();
    if (userError || !user) {
      setMessage({ type: 'error', text: 'Failed to get user information' });
      return;
    }

    const filePath = `${user.id}/avatar.${fileExt}`;

    setLoading(true);
    try {
      // Upload image
      const { error: uploadError } = await db.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = db.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with admin client
      const { error: updateError } = await db.from('profiles', true)
        .upsert({
          id: user.id,
          avatar_url: data.publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      setFormData(prev => ({
        ...prev,
        avatarUrl: data.publicUrl,
      }));
      
      setMessage({ type: 'success', text: 'Avatar updated successfully' });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setMessage({ type: 'error', text: 'Failed to update avatar' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={formData.avatarUrl || undefined}
            sx={{ 
              width: 72, 
              height: 72,
              bgcolor: '#E9D7FE',
              color: '#6941C6',
              fontSize: '24px',
              fontWeight: 500
            }}
          >
            {formData.firstName ? formData.firstName[0].toUpperCase() : 'P'}
          </Avatar>
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              backgroundColor: '#fff',
              border: '1px solid #D0D5DD',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              padding: '6px',
              '&:hover': {
                backgroundColor: '#F9FAFB',
              },
            }}
            size="small"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleAvatarChange}
            />
            <PhotoCameraIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      <Stack spacing={4}>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: '#101828',
              mb: 3
            }}
          >
            Personal Information
          </Typography>
          
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Box>

            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }
              }}
            />
          </Stack>
        </Box>

        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: '#101828',
              mb: 3
            }}
          >
            Contact Information
          </Typography>
          
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: '#101828',
              mb: 3
            }}
          >
            Preferences
          </Typography>
          
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="timezone-label">Time Zone</InputLabel>
                <Select
                  labelId="timezone-label"
                  value={formData.timeZone}
                  label="Time Zone"
                  onChange={handleSelectChange('timeZone')}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                  <MenuItem value="GMT">GMT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={formData.language}
                  label="Language"
                  onChange={handleSelectChange('language')}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: '#101828',
              mb: 3
            }}
          >
            Security
          </Typography>
          
          <Stack spacing={3}>
            <SecondaryButton>
              🔒 Change Password
            </SecondaryButton>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.twoFactorEnabled}
                  onChange={handleSwitchChange('twoFactorEnabled')}
                />
              }
              label="Enable Two-Factor Authentication"
            />
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: '#7F56D9',
              '&:hover': {
                bgcolor: '#6941C6',
              },
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setMessage(null)}
          severity={message?.type}
          sx={{ width: '100%' }}
        >
          {message?.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}
