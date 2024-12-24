import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { 
  ProfileSection, 
  BusinessSection, 
  EmailSection,
  ProjectSection,
  TicketSection,
  InvoiceSection,
  IntegrationsSection,
} from "../components/settings/sections";
import PageTitle from '../components/common/PageTitle';
import { useDatabase } from '../contexts/DatabaseContext';

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

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function Settings() {
  const { db } = useDatabase();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      if (!db) return;
      try {
        const { data: { user }, error } = await db.client.auth.getUser();
        setIsAuthenticated(!!user && !error);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [db]);

  // Show nothing while checking auth
  if (isAuthenticated === null) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="xl" sx={{ maxWidth: '1280px !important' }}>
      <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4
        }}>
          <PageTitle>Settings</PageTitle>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '18px',
                fontWeight: 500,
                color: '#667085',
                '&.Mui-selected': {
                  color: '#101828',
                  fontWeight: 600,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#6C5DD3',
              },
            }}
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Business" {...a11yProps(1)} />
            <Tab label="Email" {...a11yProps(2)} />
            <Tab label="Projects" {...a11yProps(3)} />
            <Tab label="Tickets" {...a11yProps(4)} />
            <Tab label="Invoices" {...a11yProps(5)} />
            <Tab label="Integrations" {...a11yProps(6)} />
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
    </Container>
  );
}