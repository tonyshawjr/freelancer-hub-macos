import React from 'react';
import { Box, Typography, Link, List, ListItem, Stack, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface RelatedItem {
  id: string;
  title: string;
  type: 'project' | 'ticket';
  status: string;
}

interface RelatedItemsProps {
  ticketId: string;
}

const RelatedItemsList = ({ items, type }: { items: RelatedItem[]; type: 'project' | 'ticket' }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {type === 'project' ? 'Related Projects' : 'Related Tickets'}
      </Typography>
      <List dense disablePadding>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link
              component={RouterLink}
              to={`/${type}s/${item.id}`}
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  width: '4px',
                  height: '4px',
                  bgcolor: 'text.secondary',
                  borderRadius: '50%',
                  mr: 1,
                  display: 'inline-block',
                }}
              />
              <Typography variant="body2">{item.title}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ ticketId }) => {
  // Mock data - replace with actual data fetching
  const projectItems: RelatedItem[] = [
    {
      id: '1',
      title: 'Website Redesign',
      type: 'project',
      status: 'in_progress'
    }
  ];

  const ticketItems: RelatedItem[] = [
    {
      id: '2',
      title: 'Update homepage banner',
      type: 'ticket',
      status: 'open'
    }
  ];

  return (
    <Box>
      {projectItems.length > 0 && (
        <RelatedItemsList items={projectItems} type="project" />
      )}

      {ticketItems.length > 0 && (
        <>
          {projectItems.length > 0 && <Box sx={{ mt: 3 }} />}
          <RelatedItemsList items={ticketItems} type="ticket" />
        </>
      )}
    </Box>
  );
};

export default RelatedItems;
