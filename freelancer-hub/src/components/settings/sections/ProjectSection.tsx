import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PrimaryButton } from '../../common/buttons';

interface ProjectCategory {
  id: string;
  name: string;
  color: string;
}

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  defaultDuration: number;
  milestones: string[];
  tasks: string[];
}

export default function ProjectSection() {
  const [formData, setFormData] = useState({
    defaultDuration: 30,
    defaultMilestones: ['Planning', 'Development', 'Testing', 'Deployment'],
    categories: [
      { id: '1', name: 'Web Development', color: '#6C5DD3' },
      { id: '2', name: 'Mobile App', color: '#3B82F6' },
      { id: '3', name: 'Design', color: '#10B981' },
    ] as ProjectCategory[],
    storage: {
      maxSize: 1024, // MB
      allowedTypes: ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx'],
      backupEnabled: true,
      backupFrequency: 'daily',
    },
    clientAccess: {
      canViewFiles: true,
      canUploadFiles: true,
      canViewMilestones: true,
      canViewTasks: true,
      canComment: true,
    },
    templates: [
      {
        id: '1',
        name: 'Website Project',
        description: 'Template for web development projects',
        defaultDuration: 45,
        milestones: ['Discovery', 'Design', 'Development', 'Testing', 'Launch'],
        tasks: ['Setup Repository', 'Design Review', 'Frontend Development', 'Backend Development'],
      },
    ] as ProjectTemplate[],
    defaultTasks: [
      'Project Setup',
      'Requirements Gathering',
      'Design Review',
      'Development',
      'Testing',
      'Deployment',
    ],
  });

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Accordion defaultExpanded>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Project Defaults
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Set default project duration and milestones
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField
                label="Default Project Duration (days)"
                type="number"
                value={formData.defaultDuration}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  defaultDuration: parseInt(e.target.value)
                }))}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#344054',
                    mb: 1
                  }}
                >
                  Default Milestones
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.defaultMilestones.map((milestone, index) => (
                    <Chip
                      key={index}
                      label={milestone}
                      onDelete={() => {
                        setFormData(prev => ({
                          ...prev,
                          defaultMilestones: prev.defaultMilestones.filter((_, i) => i !== index)
                        }));
                      }}
                      sx={{
                        backgroundColor: '#F9FAFB',
                        borderRadius: '16px',
                        '& .MuiChip-label': {
                          color: '#344054',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Project Categories
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Manage project categories and labels
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {formData.categories.map((category, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      backgroundColor: category.color
                    }}
                  />
                  <TextField
                    value={category.name}
                    onChange={(e) => {
                      const newCategories = [...formData.categories];
                      newCategories[index].name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        categories: newCategories
                      }));
                    }}
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
              ))}
              <PrimaryButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    categories: [
                      ...prev.categories,
                      { id: Date.now().toString(), name: '', color: '#6C5DD3' }
                    ]
                  }));
                }}
              >
                Add Category
              </PrimaryButton>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                File Storage Settings
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure file storage limits and backup settings
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField
                label="Maximum Storage Size (MB)"
                type="number"
                value={formData.storage.maxSize}
                onChange={(e) => handleChange('storage', 'maxSize', parseInt(e.target.value))}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Backup Frequency</InputLabel>
                <Select
                  value={formData.storage.backupFrequency}
                  label="Backup Frequency"
                  onChange={(e) => handleChange('storage', 'backupFrequency', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                >
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.storage.backupEnabled}
                    onChange={(e) => handleChange('storage', 'backupEnabled', e.target.checked)}
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
                label="Enable Automatic Backups"
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Client Access Settings
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure what clients can view and access
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientAccess.canViewFiles}
                    onChange={(e) => handleChange('clientAccess', 'canViewFiles', e.target.checked)}
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
                label="Can View Files"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientAccess.canUploadFiles}
                    onChange={(e) => handleChange('clientAccess', 'canUploadFiles', e.target.checked)}
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
                label="Can Upload Files"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientAccess.canViewMilestones}
                    onChange={(e) => handleChange('clientAccess', 'canViewMilestones', e.target.checked)}
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
                label="Can View Milestones"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientAccess.canViewTasks}
                    onChange={(e) => handleChange('clientAccess', 'canViewTasks', e.target.checked)}
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
                label="Can View Tasks"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientAccess.canComment}
                    onChange={(e) => handleChange('clientAccess', 'canComment', e.target.checked)}
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
                label="Can Comment"
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <PrimaryButton type="submit">
            Save Changes
          </PrimaryButton>
        </Box>
      </Stack>
    </Box>
  );
}
