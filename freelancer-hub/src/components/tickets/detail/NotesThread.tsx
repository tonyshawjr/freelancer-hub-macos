import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, TextField, Button, Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CodeIcon from '@mui/icons-material/Code';

interface Note {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface NotesThreadProps {
  notes: Note[];
}

const NoteBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const FormatButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.primary.main,
  },
  '&.active': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));

const NotesThread: React.FC<NotesThreadProps> = ({ notes }) => {
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleFormatClick = (format: string) => {
    let formatText = '';
    switch (format) {
      case 'bold':
        formatText = '**bold text**';
        break;
      case 'italic':
        formatText = '_italic text_';
        break;
      case 'list':
        formatText = '- list item\n';
        break;
      case 'code':
        formatText = '`code`';
        break;
      default:
        formatText = '';
    }
    setNewNote((prev) => prev + formatText);
  };

  const handleSubmit = () => {
    if (newNote.trim()) {
      // Handle note submission
      console.log('Submitting note:', newNote);
      setNewNote('');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      // Handle edit save
      console.log('Saving edit:', editContent);
      setEditingNoteId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditContent('');
  };

  const formatMarkdown = (text: string) => {
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Lists
    text = text.replace(/^- (.*)/gm, '• $1');
    return text;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Notes & Comments
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note... (supports markdown)"
          sx={{
            mb: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            },
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Bold">
              <FormatButton onClick={() => handleFormatClick('bold')}>
                <FormatBoldIcon fontSize="small" />
              </FormatButton>
            </Tooltip>
            <Tooltip title="Italic">
              <FormatButton onClick={() => handleFormatClick('italic')}>
                <FormatItalicIcon fontSize="small" />
              </FormatButton>
            </Tooltip>
            <Tooltip title="List">
              <FormatButton onClick={() => handleFormatClick('list')}>
                <FormatListBulletedIcon fontSize="small" />
              </FormatButton>
            </Tooltip>
            <Tooltip title="Code">
              <FormatButton onClick={() => handleFormatClick('code')}>
                <CodeIcon fontSize="small" />
              </FormatButton>
            </Tooltip>
          </Stack>

          <Button
            onClick={handleSubmit}
            disabled={!newNote.trim()}
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Send
          </Button>
        </Box>
      </Box>

      <Stack spacing={2}>
        {notes.map((note) => (
          <NoteBox key={note.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                src={note.author.avatar}
                alt={note.author.name}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {note.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(note.createdAt).toLocaleString()}
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={1}>
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(note)}
                    sx={{
                      color: 'grey.500',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'primary.light',
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    sx={{
                      color: 'grey.500',
                      '&:hover': {
                        color: 'error.main',
                        bgcolor: 'error.lighter',
                      },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            {editingNoteId === note.id ? (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    size="small"
                    onClick={handleCancelEdit}
                    sx={{ textTransform: 'none' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSaveEdit}
                    disabled={!editContent.trim()}
                    sx={{ textTransform: 'none' }}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Box
                sx={{
                  '& p': { my: 0 },
                  '& ul': { my: 0.5, pl: 2 },
                  '& code': {
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    color: 'grey.800',
                    fontFamily: 'monospace',
                  },
                }}
              >
                <ReactMarkdown>{formatMarkdown(note.content)}</ReactMarkdown>
              </Box>
            )}
          </NoteBox>
        ))}
      </Stack>
    </Box>
  );
};

export default NotesThread;
