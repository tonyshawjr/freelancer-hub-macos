import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Ticket } from '../../types/tickets';

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  onStatusChange: (ticketId: string, status: string) => void;
  onPriorityChange: (ticketId: string, priority: string) => void;
  onAddNote: (ticketId: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onTicketClick,
  onStatusChange,
  onPriorityChange,
  onAddNote,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortField, setSortField] = React.useState('updatedAt');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, ticketId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticketId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleAction = (action: string) => {
    if (!selectedTicket) return;

    switch (action) {
      case 'status':
        onStatusChange(selectedTicket, 'In Progress');
        break;
      case 'priority':
        onPriorityChange(selectedTicket, 'High');
        break;
      case 'note':
        onAddNote(selectedTicket);
        break;
      case 'close':
        onStatusChange(selectedTicket, 'Closed');
        break;
    }
    handleMenuClose();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return {
          bg: '#EF4444',
          shadow: '0 0 0 2px rgba(239, 68, 68, 0.2)'
        };
      case 'Medium':
        return {
          bg: '#F59E0B',
          shadow: '0 0 0 2px rgba(245, 158, 11, 0.2)'
        };
      case 'Low':
        return {
          bg: '#10B981',
          shadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
        };
      default:
        return {
          bg: '#6B7280',
          shadow: '0 0 0 2px rgba(107, 114, 128, 0.2)'
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'primary';
      case 'In Progress':
        return 'warning';
      case 'Closed':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ pl: 3, width: 50 }} />
              <TableCell 
                onClick={() => handleSort('title')}
                sx={{ 
                  cursor: 'pointer', 
                  fontWeight: 600, 
                  py: 2,
                  fontSize: 20
                }}
              >
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, fontSize: 20 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, fontSize: 20 }}>Client</TableCell>
              <TableCell 
                onClick={() => handleSort('createdAt')}
                sx={{ 
                  cursor: 'pointer', 
                  fontWeight: 600, 
                  py: 2,
                  fontSize: 20
                }}
              >
                Created
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, py: 2, pr: 3, fontSize: 20 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket) => (
                <TableRow
                  hover
                  key={ticket.id}
                  onClick={() => onTicketClick(ticket)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox" sx={{ pl: 3, width: 50 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: getPriorityColor(ticket.priority).bg,
                        boxShadow: getPriorityColor(ticket.priority).shadow,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.2)',
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: 20
                      }}
                    >
                      {ticket.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: 20
                      }}
                    >
                      {ticket.mainCategory}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography 
                      sx={{ 
                        color: 'text.primary',
                        fontSize: 20
                      }}
                    >
                      {ticket.clientName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: 20
                      }}
                    >
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ py: 2, pr: 3 }}>
                    <IconButton
                      size="medium"
                      onClick={(e) => handleMenuOpen(e, ticket.id)}
                    >
                      <MoreVertIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 20, 25]}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('status')}>Change Status</MenuItem>
        <MenuItem onClick={() => handleAction('priority')}>Change Priority</MenuItem>
        <MenuItem onClick={() => handleAction('note')}>Add Note</MenuItem>
        <MenuItem onClick={() => handleAction('close')}>Close Ticket</MenuItem>
      </Menu>
    </Paper>
  );
};

export default TicketList;
