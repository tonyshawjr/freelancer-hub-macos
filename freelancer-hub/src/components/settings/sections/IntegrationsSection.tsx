import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  Alert,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PrimaryButton } from '../../common/buttons';
import { secureStorage, StorageKey } from '../../../utils/storage';
import { useDatabase } from '../../../contexts/DatabaseContext';

interface DatabaseConfig {
  provider: 'supabase' | 'firebase' | 'mysql';
  supabase?: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  firebase?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  mysql?: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    ssl: boolean;
  };
}

interface PaymentGateway {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
  secretKey: string;
  webhookUrl: string;
  testMode: boolean;
}

interface StorageProvider {
  id: string;
  name: string;
  enabled: boolean;
  accessKey: string;
  secretKey: string;
  bucket: string;
  region: string;
}

export default function IntegrationsSection() {
  const { db, setProvider } = useDatabase();
  const [formData, setFormData] = useState({
    database: {
      provider: 'supabase',
      supabase: {
        url: '',
        anonKey: '',
        serviceRoleKey: '',
      },
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      },
      mysql: {
        host: 'localhost',
        port: 3306,
        database: '',
        username: '',
        password: '',
        ssl: true,
      },
    } as DatabaseConfig,
    paymentGateways: [
      {
        id: 'stripe',
        name: 'Stripe',
        enabled: false,
        apiKey: '',
        secretKey: '',
        webhookUrl: '',
        testMode: true,
      },
      {
        id: 'paypal',
        name: 'PayPal',
        enabled: false,
        apiKey: '',
        secretKey: '',
        webhookUrl: '',
        testMode: true,
      },
    ] as PaymentGateway[],
    storageProviders: [
      {
        id: 'aws',
        name: 'Amazon S3',
        enabled: false,
        accessKey: '',
        secretKey: '',
        bucket: '',
        region: 'us-east-1',
      },
      {
        id: 'gcp',
        name: 'Google Cloud Storage',
        enabled: false,
        accessKey: '',
        secretKey: '',
        bucket: '',
        region: 'us-central1',
      },
    ] as StorageProvider[],
  });

  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    // Load saved database configuration
    const savedProvider = secureStorage.get(StorageKey.DATABASE_PROVIDER);
    if (savedProvider === 'supabase') {
      const url = secureStorage.get(StorageKey.SUPABASE_URL);
      const anonKey = secureStorage.get(StorageKey.SUPABASE_ANON_KEY);
      const serviceRoleKey = secureStorage.get(StorageKey.SUPABASE_SERVICE_ROLE_KEY);
      
      if (url || anonKey || serviceRoleKey) {
        setFormData(prev => ({
          ...prev,
          database: {
            ...prev.database,
            provider: 'supabase',
            supabase: {
              url: url || '',
              anonKey: anonKey || '',
              serviceRoleKey: serviceRoleKey || '',
            },
          },
        }));
      }
    }
  }, []);

  const handleDatabaseChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      database: {
        ...prev.database,
        [prev.database.provider]: {
          ...prev.database[prev.database.provider],
          [field]: value,
        },
      },
    }));
  };

  const handleProviderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProvider = event.target.value as DatabaseConfig['provider'];
    setFormData(prev => ({
      ...prev,
      database: {
        ...prev.database,
        provider: newProvider,
      },
    }));
  };

  const handlePaymentGatewayChange = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      paymentGateways: prev.paymentGateways.map(gateway =>
        gateway.id === id ? { ...gateway, [field]: value } : gateway
      ),
    }));
  };

  const handleStorageProviderChange = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      storageProviders: prev.storageProviders.map(provider =>
        provider.id === id ? { ...provider, [field]: value } : provider
      ),
    }));
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);

    try {
      const { provider } = formData.database;
      const config = formData.database[provider];

      if (provider === 'supabase' && config) {
        const { url, anonKey } = config;
        if (!url || !anonKey) {
          throw new Error('Please fill in all required fields');
        }

        // Test the connection by attempting to initialize the database
        await setProvider('supabase', { url, anonKey });
        setTestResult({
          success: true,
          message: 'Successfully connected to Supabase!',
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to connect to database',
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveDatabase = async () => {
    const { provider } = formData.database;
    const config = formData.database[provider];

    if (provider === 'supabase' && config) {
      const { url, anonKey, serviceRoleKey } = config;
      
      try {
        // Save to secure storage
        secureStorage.set(StorageKey.DATABASE_PROVIDER, provider);
        secureStorage.set(StorageKey.SUPABASE_URL, url);
        secureStorage.set(StorageKey.SUPABASE_ANON_KEY, anonKey);
        if (serviceRoleKey) {
          secureStorage.set(StorageKey.SUPABASE_SERVICE_ROLE_KEY, serviceRoleKey);
        }

        // Initialize the database with new credentials
        await setProvider('supabase', { url, anonKey });
        
        setTestResult({
          success: true,
          message: 'Database configuration saved successfully!',
        });
      } catch (error) {
        console.error('Error saving database configuration:', error);
        setTestResult({
          success: false,
          message: 'Failed to save database configuration. Please check your credentials.',
        });
      }
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Database Configuration */}
        <Accordion defaultExpanded>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Database Provider
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Choose and configure your database provider
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControl component="fieldset">
                <RadioGroup
                  value={formData.database.provider}
                  onChange={handleProviderChange}
                >
                  <FormControlLabel 
                    value="supabase" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>Supabase</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Open source Firebase alternative with PostgreSQL database
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel 
                    value="firebase" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>Firebase</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Google's mobile and web application development platform
                        </Typography>
                      </Box>
                    }
                    disabled
                  />
                  <FormControlLabel 
                    value="mysql" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>MySQL</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Traditional relational database with robust features
                        </Typography>
                      </Box>
                    }
                    disabled
                  />
                </RadioGroup>
              </FormControl>

              {formData.database.provider === 'supabase' && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                    Supabase Configuration
                  </Typography>
                  <Stack spacing={3}>
                    <TextField
                      label="Project URL"
                      value={formData.database.supabase?.url || ''}
                      onChange={(e) => handleDatabaseChange('url', e.target.value)}
                      fullWidth
                      helperText="Your Supabase project URL (e.g., https://xxx.supabase.co)"
                    />
                    <TextField
                      label="Anon Public Key"
                      value={formData.database.supabase?.anonKey || ''}
                      onChange={(e) => handleDatabaseChange('anonKey', e.target.value)}
                      fullWidth
                      helperText="Your project's anon/public key"
                    />
                    <TextField
                      label="Service Role Key"
                      value={formData.database.supabase?.serviceRoleKey || ''}
                      onChange={(e) => handleDatabaseChange('serviceRoleKey', e.target.value)}
                      fullWidth
                      type="password"
                      helperText="Your project's service_role key (keep this secret!)"
                    />

                    {testResult && (
                      <Alert 
                        severity={testResult.success ? "success" : "error"}
                        sx={{ mt: 2 }}
                      >
                        {testResult.message}
                      </Alert>
                    )}

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={handleTestConnection}
                        disabled={testingConnection}
                        sx={{
                          borderColor: '#D0D5DD',
                          color: '#344054',
                          '&:hover': {
                            borderColor: '#98A2B3',
                            backgroundColor: '#F9FAFB',
                          }
                        }}
                      >
                        {testingConnection ? 'Testing...' : 'Test Connection'}
                      </Button>
                      <PrimaryButton onClick={handleSaveDatabase}>
                        Save Changes
                      </PrimaryButton>
                    </Box>
                  </Stack>
                </Box>
              )}

              {formData.database.provider === 'firebase' && (
                <Alert severity="info">
                  Firebase integration coming soon!
                </Alert>
              )}

              {formData.database.provider === 'mysql' && (
                <Alert severity="info">
                  MySQL integration coming soon!
                </Alert>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Payment Gateways */}
        <Accordion>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Payment Gateways
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure payment gateway integrations
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              {formData.paymentGateways.map((gateway) => (
                <Box key={gateway.id}>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#101828',
                      mb: 2
                    }}
                  >
                    {gateway.name}
                  </Typography>
                  
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={gateway.enabled}
                          onChange={(e) => handlePaymentGatewayChange(gateway.id, 'enabled', e.target.checked)}
                        />
                      }
                      label="Enable Integration"
                    />
                    
                    {gateway.enabled && (
                      <>
                        <TextField
                          label="API Key"
                          value={gateway.apiKey}
                          onChange={(e) => handlePaymentGatewayChange(gateway.id, 'apiKey', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Secret Key"
                          type="password"
                          value={gateway.secretKey}
                          onChange={(e) => handlePaymentGatewayChange(gateway.id, 'secretKey', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Webhook URL"
                          value={gateway.webhookUrl}
                          onChange={(e) => handlePaymentGatewayChange(gateway.id, 'webhookUrl', e.target.value)}
                          fullWidth
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={gateway.testMode}
                              onChange={(e) => handlePaymentGatewayChange(gateway.id, 'testMode', e.target.checked)}
                            />
                          }
                          label="Test Mode"
                        />
                      </>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Storage Providers */}
        <Accordion>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#F9FAFB',
              '&.Mui-expanded': {
                borderBottom: '1px solid #EAECF0'
              }
            }}
          >
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Storage Providers
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure cloud storage integrations
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              {formData.storageProviders.map((provider) => (
                <Box key={provider.id}>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#101828',
                      mb: 2
                    }}
                  >
                    {provider.name}
                  </Typography>
                  
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={provider.enabled}
                          onChange={(e) => handleStorageProviderChange(provider.id, 'enabled', e.target.checked)}
                        />
                      }
                      label="Enable Integration"
                    />
                    
                    {provider.enabled && (
                      <>
                        <TextField
                          label="Access Key"
                          value={provider.accessKey}
                          onChange={(e) => handleStorageProviderChange(provider.id, 'accessKey', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Secret Key"
                          type="password"
                          value={provider.secretKey}
                          onChange={(e) => handleStorageProviderChange(provider.id, 'secretKey', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Bucket"
                          value={provider.bucket}
                          onChange={(e) => handleStorageProviderChange(provider.id, 'bucket', e.target.value)}
                          fullWidth
                        />
                        <FormControl fullWidth>
                          <InputLabel>Region</InputLabel>
                          <Select
                            value={provider.region}
                            label="Region"
                            onChange={(e) => handleStorageProviderChange(provider.id, 'region', e.target.value)}
                          >
                            <MenuItem value="us-east-1">US East (N. Virginia)</MenuItem>
                            <MenuItem value="us-west-1">US West (N. California)</MenuItem>
                            <MenuItem value="eu-west-1">EU (Ireland)</MenuItem>
                            <MenuItem value="ap-southeast-1">Asia Pacific (Singapore)</MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}
