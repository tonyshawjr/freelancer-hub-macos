import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  IconButton, 
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

interface CustomFile extends File {
  id: string;
  uploadedAt: string;
  url: string;
}

interface FilesListProps {
  files: CustomFile[];
}

const UploadArea = styled('div')(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const FileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FilesList: React.FC<FilesListProps> = ({ files = [] }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [fileToDelete, setFileToDelete] = React.useState<string | null>(null);

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
    multiple: true
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDeleteClick = (fileId: string) => {
    setFileToDelete(fileId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle file deletion logic here
    console.log('Deleting file:', fileToDelete);
    setDeleteDialogOpen(false);
    setFileToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setFileToDelete(null);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Files
      </Typography>

      <UploadArea {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 32, color: 'action.active', mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag and drop files here, or click to select files'}
        </Typography>
      </UploadArea>

      {files.length > 0 && (
        <List dense sx={{ mt: 2 }}>
          {files.map((file) => (
            <ListItem key={file.id} disablePadding sx={{ mb: 1 }}>
              <FileItem sx={{ width: '100%' }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={file.url}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    sx={{ 
                      color: 'primary.main',
                      display: 'block',
                      typography: 'body2',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {file.name}
                  </Link>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)} • Uploaded {formatDate(file.uploadedAt)}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  href={file.url}
                  download={file.name}
                  sx={{ ml: 1 }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(file.id)}
                  sx={{ ml: 0.5 }}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </FileItem>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Delete File
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this file? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilesList;
