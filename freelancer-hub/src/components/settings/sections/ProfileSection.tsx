import { useState } from 'react';
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
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { SecondaryButton } from '../../common/buttons';

export default function ProfileSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    timeZone: 'UTC',
    language: 'en',
    twoFactorEnabled: false,
  });

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

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{ 
              width: 72, 
              height: 72,
              bgcolor: '#E9D7FE',
              color: '#6941C6',
              fontSize: '24px',
              fontWeight: 500
            }}
          >
            P
          </Avatar>
          <IconButton
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
              <FormControl 
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              >
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={formData.timeZone}
                  label="Time Zone"
                  onChange={handleSelectChange('timeZone')}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">Eastern Time</MenuItem>
                  <MenuItem value="CST">Central Time</MenuItem>
                  <MenuItem value="PST">Pacific Time</MenuItem>
                </Select>
              </FormControl>
              <FormControl 
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              >
                <InputLabel>Language</InputLabel>
                <Select
                  value={formData.language}
                  label="Language"
                  onChange={handleSelectChange('language')}
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
            <SecondaryButton
              sx={{ 
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '10px 16px',
                color: '#344054',
                borderColor: '#D0D5DD',
                '&:hover': {
                  borderColor: '#D0D5DD',
                  backgroundColor: '#F9FAFB',
                }
              }}
            >
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                🔒
              </Box>
              Change Password
            </SecondaryButton>
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.twoFactorEnabled}
                  onChange={handleSwitchChange('twoFactorEnabled')}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#6C5DD3',
                      '&:hover': {
                        backgroundColor: 'rgba(108, 93, 211, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#6C5DD3',
                    },
                  }}
                />
              }
              label="Enable Two-Factor Authentication"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '14px',
                  color: '#344054',
                }
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
