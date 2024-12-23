import { useState } from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Assignment as ProjectIcon,
  ConfirmationNumber as TicketIcon,
  Receipt as InvoiceIcon,
  Extension as IntegrationIcon,
} from '@mui/icons-material';

// Import sections
import {
  ProfileSection,
  BusinessSection,
  EmailSection,
  ProjectSection,
  TicketSection,
  InvoiceSection,
  IntegrationsSection,
} from './sections';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function SettingsTabs() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 64, // Height of the top navbar
          zIndex: 1,
          px: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="settings tabs"
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<BusinessIcon />} label="Business" />
          <Tab icon={<EmailIcon />} label="Email" />
          <Tab icon={<ProjectIcon />} label="Projects" />
          <Tab icon={<TicketIcon />} label="Tickets" />
          <Tab icon={<InvoiceIcon />} label="Invoices" />
          <Tab icon={<IntegrationIcon />} label="Integrations" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ProfileSection />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <BusinessSection />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <EmailSection />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <ProjectSection />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <TicketSection />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <InvoiceSection />
      </TabPanel>

      <TabPanel value={value} index={6}>
        <IntegrationsSection />
      </TabPanel>

    </Box>
  );
}
