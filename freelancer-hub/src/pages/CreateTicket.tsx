import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
  IconButton,
  SelectChangeEvent,
  Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useMockDataContext } from '../context/MockDataContext';
import { TICKET_CATEGORIES, MainCategory } from '../types/tickets';

// Styled components
const UploadArea = styled('div')(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const FilePreview = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
}));

interface TicketForm {
  title: string;
  description: string;
  mainCategory: MainCategory | '';
  subCategory: string;
  priority: string;
  dueDate: string;
  project: string;
  notifyClient: boolean;
  files: File[];
}

const CreateTicket = () => {
  const navigate = useNavigate();
  const { projects } = useMockDataContext();
  const [formData, setFormData] = useState<TicketForm>({
    title: '',
    description: '',
    mainCategory: '',
    subCategory: '',
    priority: '',
    dueDate: '',
    project: '',
    notifyClient: false,
    files: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name === 'mainCategory') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        subCategory: '' // Reset sub-category when main category changes
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle ticket creation
    console.log('Form submitted:', formData);
    navigate('/tickets');
  };

  return (
    <Box sx={{ 
      bgcolor: '#FFFFFF', 
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '800px',
        py: { xs: 3, sm: 4 }, 
        px: { xs: 2, sm: 3 } 
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/tickets')}
            sx={{ mb: 2 }}
          >
            Back to Tickets
          </Button>
          <Typography variant="h4" sx={{ 
            fontSize: { xs: '1.75rem', sm: '2rem' },
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Create New Ticket
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Title */}
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              fullWidth
            />

            {/* Category Selection */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="mainCategory"
                  value={formData.mainCategory}
                  onChange={handleSelectChange}
                  label="Category"
                >
                  {Object.keys(TICKET_CATEGORIES).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required disabled={!formData.mainCategory}>
                <InputLabel>Sub-Category</InputLabel>
                <Select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleSelectChange}
                  label="Sub-Category"
                >
                  {formData.mainCategory && TICKET_CATEGORIES[formData.mainCategory as MainCategory].map((subCategory) => (
                    <MenuItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Description */}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
              fullWidth
            />

            {/* Priority and Due Date */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleSelectChange}
                  label="Priority"
                  required
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>

            {/* Project Selection */}
            <FormControl fullWidth>
              <InputLabel>Related Project (Optional)</InputLabel>
              <Select
                name="project"
                value={formData.project}
                onChange={handleSelectChange}
                label="Related Project (Optional)"
              >
                <MenuItem value="">None</MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* File Upload */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Attachments
              </Typography>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <UploadArea>
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography>
                    Drag and drop files here, or click to select files
                  </Typography>
                </UploadArea>
              </label>

              {/* File Preview */}
              {formData.files.map((file, index) => (
                <FilePreview key={index}>
                  <Typography noWrap sx={{ flex: 1 }}>
                    {file.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFile(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </FilePreview>
              ))}
            </Box>

            {/* Notify Client */}
            <FormControlLabel
              control={
                <Checkbox
                  name="notifyClient"
                  checked={formData.notifyClient}
                  onChange={handleCheckboxChange}
                />
              }
              label="Notify client about this ticket"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#6366F1',
                '&:hover': { bgcolor: '#4F46E5' },
                py: 1.5
              }}
            >
              Create Ticket
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateTicket;
