import React, { useCallback, useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Stack, 
  Tooltip, 
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
}

interface FilesListProps {
  files: File[];
}

const DropZone = styled(Box)(({ theme }) => ({
  border: '1px dashed',
  borderColor: 'divider',
  backgroundColor: '#fff',
  borderRadius: 1,
  p: 3,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: 'primary.main',
    backgroundColor: 'rgba(99, 102, 241, 0.04)'
  }
}));

const FileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const FileIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.grey[700],
}));

const FilesList: React.FC<FilesListProps> = ({ files }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md'],
    },
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon />;
      case 'pdf':
        return <PictureAsPdfIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, fileId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileId(fileId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFileId(null);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'text.primary',
          mb: 2
        }}
      >
        Files & Attachments
      </Typography>

      <DropZone {...getRootProps()} sx={{
        border: '1px dashed',
        borderColor: 'divider',
        backgroundColor: '#fff',
        borderRadius: 1,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'rgba(99, 102, 241, 0.04)'
        }
      }}>
        <input {...getInputProps()} />
        <CloudUploadIcon
          sx={{
            fontSize: 40,
            color: 'text.secondary',
            mb: 1
          }}
        />
        {isDragActive ? (
          <Typography variant="body1" color="text.secondary">
            Drop the files here...
          </Typography>
        ) : (
          <>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Drag and drop files here, or click to select files
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supported formats: Images, PDF, Text files
            </Typography>
          </>
        )}
      </DropZone>

      <Stack spacing={1} sx={{ mt: 2 }}>
        {files.map((file) => (
          <Box
            key={file.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              backgroundColor: '#fff',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)'
              }
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                color: 'primary.main'
              }}
            >
              {getFileIcon(file.type)}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Download">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton 
                  size="small" 
                  sx={{ color: 'text.secondary' }}
                  onClick={(e) => handleOpenMenu(e, file.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        ))}
      </Stack>

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
