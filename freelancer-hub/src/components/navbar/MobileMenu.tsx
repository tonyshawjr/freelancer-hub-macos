import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { navigationLinks } from '../../data/navigationLinks';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        sx: {
          zIndex: 1300
        }
      }}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: '#FFFFFF',
          borderRadius: 0,
          p: 2
        }
      }}
    >
      <List>
        {navigationLinks.map((link) => (
          <ListItem 
            key={link.path} 
            disablePadding
            onClick={onClose}
          >
            <ListItemButton
              component={RouterLink}
              to={link.path}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(99, 102, 241, 0.04)',
                },
              }}
            >
              <ListItemText 
                primary={link.label}
                primaryTypographyProps={{
                  sx: { 
                    color: '#1a1a1a',
                    fontWeight: 500
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileMenu;
