import { useState } from 'react';
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
        id: '1',
        name: 'Stripe',
        enabled: true,
        apiKey: '',
        secretKey: '',
        webhookUrl: '',
        testMode: true,
      },
      {
        id: '2',
        name: 'PayPal',
        enabled: false,
        apiKey: '',
        secretKey: '',
        webhookUrl: '',
        testMode: true,
      },
    ] as PaymentGateway[],
    
    storage: [
      {
        id: '1',
        name: 'AWS S3',
        enabled: true,
        accessKey: '',
        secretKey: '',
        bucket: '',
        region: 'us-east-1',
      },
      {
        id: '2',
        name: 'Google Cloud Storage',
        enabled: false,
        accessKey: '',
        secretKey: '',
        bucket: '',
        region: 'us-central1',
      },
    ] as StorageProvider[],
  });

  const handleChange = (section: string, subsection: string | null, field: string, value: any) => {
    if (subsection) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [subsection]: {
            ...prev[section as keyof typeof prev][subsection],
            [field]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    }
  };

  const handleDatabaseProviderChange = (provider: 'supabase' | 'firebase' | 'mysql') => {
    setFormData(prev => ({
      ...prev,
      database: {
        ...prev.database,
        provider
      }
    }));
  };

  const handleTestConnection = async () => {
    // TODO: Implement connection test logic
    console.log('Testing connection...');
  };

  return (
    <Box>
      <Stack spacing={3}>
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
                  onChange={(e) => handleDatabaseProviderChange(e.target.value as 'supabase' | 'firebase' | 'mysql')}
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
                  />
                </RadioGroup>
              </FormControl>

              {formData.database.provider === 'supabase' ? (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>Supabase Configuration</Typography>
                  <Stack spacing={3}>
                    <TextField
                      label="Project URL"
                      value={formData.database.supabase?.url}
                      onChange={(e) => handleChange('database', 'supabase', 'url', e.target.value)}
                      fullWidth
                      helperText="Your Supabase project URL (e.g., https://xxx.supabase.co)"
                    />
                    <TextField
                      label="Anon Public Key"
                      value={formData.database.supabase?.anonKey}
                      onChange={(e) => handleChange('database', 'supabase', 'anonKey', e.target.value)}
                      fullWidth
                      helperText="Your project's anon/public key"
                    />
                    <TextField
                      label="Service Role Key"
                      value={formData.database.supabase?.serviceRoleKey}
                      onChange={(e) => handleChange('database', 'supabase', 'serviceRoleKey', e.target.value)}
                      fullWidth
                      type="password"
                      helperText="Your project's service_role key (keep this secret!)"
                    />
                  </Stack>
                </Box>
              ) : formData.database.provider === 'firebase' ? (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>Firebase Configuration</Typography>
                  <Stack spacing={3}>
                    <TextField
                      label="API Key"
                      value={formData.database.firebase?.apiKey}
                      onChange={(e) => handleChange('database', 'firebase', 'apiKey', e.target.value)}
                      fullWidth
                      helperText="Your Firebase API key"
                    />
                    <TextField
                      label="Auth Domain"
                      value={formData.database.firebase?.authDomain}
                      onChange={(e) => handleChange('database', 'firebase', 'authDomain', e.target.value)}
                      fullWidth
                      helperText="Your Firebase auth domain"
                    />
                    <TextField
                      label="Project ID"
                      value={formData.database.firebase?.projectId}
                      onChange={(e) => handleChange('database', 'firebase', 'projectId', e.target.value)}
                      fullWidth
                      helperText="Your Firebase project ID"
                    />
                    <TextField
                      label="Storage Bucket"
                      value={formData.database.firebase?.storageBucket}
                      onChange={(e) => handleChange('database', 'firebase', 'storageBucket', e.target.value)}
                      fullWidth
                      helperText="Your Firebase storage bucket"
                    />
                    <TextField
                      label="Messaging Sender ID"
                      value={formData.database.firebase?.messagingSenderId}
                      onChange={(e) => handleChange('database', 'firebase', 'messagingSenderId', e.target.value)}
                      fullWidth
                      helperText="Your Firebase messaging sender ID"
                    />
                    <TextField
                      label="App ID"
                      value={formData.database.firebase?.appId}
                      onChange={(e) => handleChange('database', 'firebase', 'appId', e.target.value)}
                      fullWidth
                      helperText="Your Firebase app ID"
                    />
                  </Stack>
                </Box>
              ) : (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>MySQL Configuration</Typography>
                  <Stack spacing={3}>
                    <TextField
                      label="Host"
                      value={formData.database.mysql?.host}
                      onChange={(e) => handleChange('database', 'mysql', 'host', e.target.value)}
                      fullWidth
                      helperText="Database host (e.g., localhost or IP address)"
                    />
                    <TextField
                      label="Port"
                      type="number"
                      value={formData.database.mysql?.port}
                      onChange={(e) => handleChange('database', 'mysql', 'port', parseInt(e.target.value))}
                      fullWidth
                      helperText="Database port (default: 3306)"
                    />
                    <TextField
                      label="Database Name"
                      value={formData.database.mysql?.database}
                      onChange={(e) => handleChange('database', 'mysql', 'database', e.target.value)}
                      fullWidth
                      helperText="Name of the database to connect to"
                    />
                    <TextField
                      label="Username"
                      value={formData.database.mysql?.username}
                      onChange={(e) => handleChange('database', 'mysql', 'username', e.target.value)}
                      fullWidth
                      helperText="Database user username"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={formData.database.mysql?.password}
                      onChange={(e) => handleChange('database', 'mysql', 'password', e.target.value)}
                      fullWidth
                      helperText="Database user password"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.database.mysql?.ssl || false}
                          onChange={(e) => handleChange('database', 'mysql', 'ssl', e.target.checked)}
                        />
                      }
                      label="Enable SSL/TLS Connection"
                    />
                  </Stack>
                </Box>
              )}

              <Alert severity="info" sx={{ mt: 2 }}>
                {formData.database.provider === 'supabase' ? (
                  <>
                    You can find these credentials in your Supabase project settings under Project Settings → API.
                    Make sure to keep your service role key secret and never expose it in client-side code.
                  </>
                ) : formData.database.provider === 'firebase' ? (
                  <>
                    You can find these credentials in your Firebase console under Project Settings → General.
                    Download your Firebase configuration object and copy the values here.
                  </>
                ) : (
                  <>
                    Make sure your MySQL server is properly configured and accessible from your application.
                    We recommend using SSL/TLS for secure connections and storing credentials securely.
                  </>
                )}
              </Alert>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleTestConnection}
                  sx={{
                    borderColor: '#D0D5DD',
                    color: '#344054',
                    '&:hover': {
                      borderColor: '#98A2B3',
                      backgroundColor: '#F9FAFB',
                    }
                  }}
                >
                  Test Connection
                </Button>
                <PrimaryButton>
                  Save Changes
                </PrimaryButton>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

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
              {formData.paymentGateways.map((gateway, index) => (
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
                          onChange={(e) => {
                            const newGateways = [...formData.paymentGateways];
                            newGateways[index].enabled = e.target.checked;
                            setFormData(prev => ({
                              ...prev,
                              paymentGateways: newGateways
                            }));
                          }}
                        />
                      }
                      label="Enable Integration"
                    />
                    
                    {gateway.enabled && (
                      <>
                        <TextField
                          label="API Key"
                          value={gateway.apiKey}
                          onChange={(e) => {
                            const newGateways = [...formData.paymentGateways];
                            newGateways[index].apiKey = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              paymentGateways: newGateways
                            }));
                          }}
                          fullWidth
                        />
                        
                        <TextField
                          label="Secret Key"
                          type="password"
                          value={gateway.secretKey}
                          onChange={(e) => {
                            const newGateways = [...formData.paymentGateways];
                            newGateways[index].secretKey = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              paymentGateways: newGateways
                            }));
                          }}
                          fullWidth
                        />
                        
                        <TextField
                          label="Webhook URL"
                          value={gateway.webhookUrl}
                          onChange={(e) => {
                            const newGateways = [...formData.paymentGateways];
                            newGateways[index].webhookUrl = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              paymentGateways: newGateways
                            }));
                          }}
                          fullWidth
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              checked={gateway.testMode}
                              onChange={(e) => {
                                const newGateways = [...formData.paymentGateways];
                                newGateways[index].testMode = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  paymentGateways: newGateways
                                }));
                              }}
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
              {formData.storage.map((provider, index) => (
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
                          onChange={(e) => {
                            const newProviders = [...formData.storage];
                            newProviders[index].enabled = e.target.checked;
                            setFormData(prev => ({
                              ...prev,
                              storage: newProviders
                            }));
                          }}
                        />
                      }
                      label="Enable Integration"
                    />
                    
                    {provider.enabled && (
                      <>
                        <TextField
                          label="Access Key"
                          value={provider.accessKey}
                          onChange={(e) => {
                            const newProviders = [...formData.storage];
                            newProviders[index].accessKey = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              storage: newProviders
                            }));
                          }}
                          fullWidth
                        />
                        
                        <TextField
                          label="Secret Key"
                          type="password"
                          value={provider.secretKey}
                          onChange={(e) => {
                            const newProviders = [...formData.storage];
                            newProviders[index].secretKey = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              storage: newProviders
                            }));
                          }}
                          fullWidth
                        />
                        
                        <TextField
                          label="Bucket Name"
                          value={provider.bucket}
                          onChange={(e) => {
                            const newProviders = [...formData.storage];
                            newProviders[index].bucket = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              storage: newProviders
                            }));
                          }}
                          fullWidth
                        />
                        
                        <FormControl fullWidth>
                          <InputLabel>Region</InputLabel>
                          <Select
                            value={provider.region}
                            label="Region"
                            onChange={(e) => {
                              const newProviders = [...formData.storage];
                              newProviders[index].region = e.target.value;
                              setFormData(prev => ({
                                ...prev,
                                storage: newProviders
                              }));
                            }}
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <PrimaryButton type="submit">
            Save Changes
          </PrimaryButton>
        </Box>
      </Stack>
    </Box>
  );
}
