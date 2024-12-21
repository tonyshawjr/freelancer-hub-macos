import React from 'react';
import { Box, Typography, List, ListItem, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

interface FilesListProps {
  files: {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: string;
    url: string;
  }[];
}

interface CustomFile extends File {
  id: string;
  uploadedAt: string;
  url: string;
}

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const FilesList: React.FC<FilesListProps> = ({ files }) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const customFiles = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(),
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(file)
    })) as CustomFile[];
    
    // Handle the files here
    console.log('Uploaded files:', customFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 5242880, // 5MB
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Files & Attachments
      </Typography>

      <UploadBox {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40, color: 'action.active', mb: 1 }} />
        <Typography>
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select files'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          (Max file size: 5MB)
        </Typography>
      </UploadBox>

      <List sx={{ mt: 2 }}>
        {files.map((file) => (
          <ListItem
            key={file.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 1,
              px: 2,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{file.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
              </Typography>
            </Box>
            <IconButton size="small" color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <DownloadIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ color: 'text.secondary' }}
              onClick={(e) => handleOpenMenu(e, file.id)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 180,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
              typography: 'body2',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)'
              }
            }
          }
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <DownloadIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FilesList;
