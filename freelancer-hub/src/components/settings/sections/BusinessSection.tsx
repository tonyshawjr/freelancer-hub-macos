import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { PrimaryButton } from '../../common/buttons';

export default function BusinessSection() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessCountry: '',
    businessType: '',
    businessColor: '#6C5DD3',
    businessStartTime: new Date(),
    businessEndTime: new Date(),
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

  const handleTimeChange = (name: string) => (value: Date | null) => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <Box>
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
            Business Information
          </Typography>
          
          <Stack spacing={3}>
            <TextField
              label="Business Name"
              name="businessName"
              value={formData.businessName}
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

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="Business Email"
                name="businessEmail"
                type="email"
                value={formData.businessEmail}
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
                label="Business Phone"
                name="businessPhone"
                value={formData.businessPhone}
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
            Business Address
          </Typography>
          
          <Stack spacing={3}>
            <TextField
              label="Street Address"
              name="businessAddress"
              value={formData.businessAddress}
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

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="City"
                name="businessCity"
                value={formData.businessCity}
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
                label="State/Province"
                name="businessState"
                value={formData.businessState}
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
                label="ZIP/Postal Code"
                name="businessZip"
                value={formData.businessZip}
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

            <FormControl 
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }
              }}
            >
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.businessCountry}
                label="Country"
                onChange={handleSelectChange('businessCountry')}
              >
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="AU">Australia</MenuItem>
              </Select>
            </FormControl>
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
            Business Settings
          </Typography>
          
          <Stack spacing={3}>
            <FormControl 
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }
              }}
            >
              <InputLabel>Business Type</InputLabel>
              <Select
                value={formData.businessType}
                label="Business Type"
                onChange={handleSelectChange('businessType')}
              >
                <MenuItem value="freelancer">Freelancer</MenuItem>
                <MenuItem value="agency">Agency</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TimePicker 
                label="Business Hours Start"
                value={formData.businessStartTime}
                onChange={handleTimeChange('businessStartTime')}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
              <TimePicker
                label="Business Hours End"
                value={formData.businessEndTime}
                onChange={handleTimeChange('businessEndTime')}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Box>

            <TextField
              label="Brand Color"
              name="businessColor"
              value={formData.businessColor}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      backgroundColor: formData.businessColor,
                      marginRight: 1
                    }}
                  />
                ),
              }}
            />
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <PrimaryButton type="submit">
            Save Changes
          </PrimaryButton>
        </Box>
      </Stack>
    </Box>
  );
}
