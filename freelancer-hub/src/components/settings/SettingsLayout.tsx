import { useState } from 'react';
import { Box, Paper, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Assignment as ProjectIcon,
  ConfirmationNumber as TicketIcon,
  Receipt as InvoiceIcon,
  Extension as IntegrationIcon,
  Settings as GeneralSettingsIcon,
  Notifications as NotificationsIcon,
  CreditCard as BillingIcon,
  Palette as ThemeIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

import {
  ProfileSection,
  BusinessSection,
  EmailSection,
  ProjectSection,
  TicketSection,
  InvoiceSection,
  IntegrationsSection,
} from './sections';

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: { id: string; label: string }[];
}

const navSections: NavSection[] = [
  {
    title: 'Personal Settings',
    icon: <PersonIcon />,
    items: [
      { id: 'profile', label: 'My Profile' },
      { id: 'account', label: 'Account Settings' },
      { id: 'preferences', label: 'Preferences' },
      { id: 'billing', label: 'Billing & Subscription' },
    ],
  },
  {
    title: 'Business Settings',
    icon: <BusinessIcon />,
    items: [
      { id: 'business-profile', label: 'Business Profile' },
      { id: 'work-hours', label: 'Work Hours' },
      { id: 'service-rates', label: 'Service Rates' },
      { id: 'client-portal', label: 'Client Portal Settings' },
    ],
  },
  {
    title: 'Email Settings',
    icon: <EmailIcon />,
    items: [
      { id: 'email-accounts', label: 'Email Accounts' },
      { id: 'email-templates', label: 'Email Templates' },
      { id: 'email-notifications', label: 'Notification Settings' },
      { id: 'email-signatures', label: 'Email Signatures' },
    ],
  },
  {
    title: 'Project Settings',
    icon: <ProjectIcon />,
    items: [
      { id: 'project-defaults', label: 'Default Settings' },
      { id: 'project-categories', label: 'Categories' },
      { id: 'project-templates', label: 'Templates' },
      { id: 'project-storage', label: 'File Storage' },
      { id: 'project-access', label: 'Client Access' },
    ],
  },
  {
    title: 'Ticket Settings',
    icon: <TicketIcon />,
    items: [
      { id: 'ticket-categories', label: 'Categories' },
      { id: 'ticket-priorities', label: 'Priority Levels' },
      { id: 'ticket-templates', label: 'Response Templates' },
      { id: 'ticket-sla', label: 'SLA Settings' },
      { id: 'ticket-assignment', label: 'Auto-Assignment' },
      { id: 'ticket-communication', label: 'Client Communication' },
      { id: 'ticket-numbering', label: 'Numbering Format' },
    ],
  },
  {
    title: 'Invoice Settings',
    icon: <InvoiceIcon />,
    items: [
      { id: 'invoice-template', label: 'Template Design' },
      { id: 'invoice-terms', label: 'Default Terms' },
      { id: 'invoice-payment', label: 'Payment Methods' },
      { id: 'invoice-late-fees', label: 'Late Fee Rules' },
      { id: 'invoice-tax', label: 'Tax Settings' },
      { id: 'invoice-currency', label: 'Currency Options' },
      { id: 'invoice-numbering', label: 'Numbering Sequence' },
      { id: 'invoice-notes', label: 'Default Notes' },
    ],
  },
  {
    title: 'Integrations',
    icon: <IntegrationIcon />,
    items: [
      { id: 'integration-database', label: 'Database' },
      { id: 'integration-payment', label: 'Payment Gateways' },
      { id: 'integration-storage', label: 'Storage Providers' },
      { id: 'integration-api', label: 'API Settings' },
    ],
  },
  {
    title: 'App Settings',
    icon: <GeneralSettingsIcon />,
    items: [
      { id: 'general', label: 'General Settings' },
      { id: 'theme', label: 'Theme & Display' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'security', label: 'Security' },
    ],
  },
];

interface SettingsLayoutProps {
  children?: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [openSections, setOpenSections] = useState<string[]>(['Personal Settings']);

  const handleSectionClick = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleItemClick = (id: string) => {
    setSelectedSection(id);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <ProfileSection />;
      case 'business-profile':
        return <BusinessSection />;
      case 'email-accounts':
        return <EmailSection />;
      case 'project-defaults':
      case 'project-categories':
      case 'project-templates':
      case 'project-storage':
      case 'project-access':
        return <ProjectSection />;
      case 'ticket-categories':
      case 'ticket-priorities':
      case 'ticket-templates':
      case 'ticket-sla':
      case 'ticket-assignment':
      case 'ticket-communication':
      case 'ticket-numbering':
        return <TicketSection />;
      case 'invoice-template':
      case 'invoice-terms':
      case 'invoice-payment':
      case 'invoice-late-fees':
      case 'invoice-tax':
      case 'invoice-currency':
      case 'invoice-numbering':
      case 'invoice-notes':
        return <InvoiceSection />;
      case 'integration-database':
      case 'integration-payment':
      case 'integration-storage':
      case 'integration-api':
        return <IntegrationsSection />;
      default:
        return (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Select a setting to configure
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: 'calc(100vh - 64px)' }}>
      {/* Left Navigation */}
      <Paper 
        sx={{ 
          width: 280, 
          flexShrink: 0,
          maxHeight: 'calc(100vh - 96px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <List component="nav">
          {navSections.map((section) => (
            <Box key={section.title}>
              <ListItemButton 
                onClick={() => handleSectionClick(section.title)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(108, 93, 211, 0.08)',
                  },
                  ...(openSections.includes(section.title) && {
                    backgroundColor: 'rgba(108, 93, 211, 0.08)',
                  }),
                }}
              >
                <ListItemIcon sx={{ color: openSections.includes(section.title) ? '#6C5DD3' : 'inherit' }}>
                  {section.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={section.title}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: openSections.includes(section.title) ? 600 : 400,
                      color: openSections.includes(section.title) ? '#101828' : '#344054',
                    },
                  }}
                />
                {openSections.includes(section.title) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSections.includes(section.title)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {section.items.map((item) => (
                    <ListItemButton
                      key={item.id}
                      selected={selectedSection === item.id}
                      onClick={() => handleItemClick(item.id)}
                      sx={{ 
                        pl: 4,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(108, 93, 211, 0.12)',
                          '&:hover': {
                            backgroundColor: 'rgba(108, 93, 211, 0.16)',
                          },
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(108, 93, 211, 0.08)',
                        },
                      }}
                    >
                      <ListItemText 
                        primary={item.label}
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: '14px',
                            fontWeight: selectedSection === item.id ? 500 : 400,
                            color: selectedSection === item.id ? '#6C5DD3' : '#475467',
                          },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Paper>

      {/* Content Area */}
      <Paper 
        sx={{ 
          flex: 1, 
          p: 3,
          maxHeight: 'calc(100vh - 96px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {renderContent()}
      </Paper>
    </Box>
  );
}
