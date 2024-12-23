import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PrimaryButton } from '../../common/buttons';

interface EmailServerConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  useSSL: boolean;
}

interface EmailConfig {
  email: string;
  displayName: string;
  imap: EmailServerConfig;
  smtp: EmailServerConfig;
  signature: string;
  autoReply: {
    enabled: boolean;
    subject: string;
    message: string;
  };
  forwarding: {
    enabled: boolean;
    email: string;
  };
}

export default function EmailSection() {
  const [formData, setFormData] = useState({
    primaryEmail: {
      email: '',
      displayName: '',
      imap: {
        host: '',
        port: '',
        username: '',
        password: '',
        useSSL: true,
      },
      smtp: {
        host: '',
        port: '',
        username: '',
        password: '',
        useSSL: true,
      },
      signature: '',
      autoReply: {
        enabled: false,
        subject: '',
        message: '',
      },
      forwarding: {
        enabled: false,
        email: '',
      },
    } as EmailConfig,
    supportEmail: {
      email: '',
      displayName: '',
      imap: {
        host: '',
        port: '',
        username: '',
        password: '',
        useSSL: true,
      },
      smtp: {
        host: '',
        port: '',
        username: '',
        password: '',
        useSSL: true,
      },
      signature: '',
      autoReply: {
        enabled: false,
        subject: '',
        message: '',
      },
      forwarding: {
        enabled: false,
        email: '',
      },
    } as EmailConfig,
    billingEmail: {
      email: '',
      displayName: '',
      imap: {
        host: '',
        port: '',
        username: '',
        password: '',
        useSSL: true,
      },
      smtp: {
        host: '',
        port: '',
        username: '',
        password: '',
        useSSL: true,
      },
      signature: '',
      autoReply: {
        enabled: false,
        subject: '',
        message: '',
      },
      forwarding: {
        enabled: false,
        email: '',
      },
    } as EmailConfig,
  });

  const handleEmailChange = (emailType: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [emailType]: {
        ...prev[emailType as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleServerChange = (emailType: string, serverType: 'imap' | 'smtp', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [emailType]: {
        ...prev[emailType as keyof typeof prev],
        [serverType]: {
          ...prev[emailType as keyof typeof prev][serverType],
          [field]: value
        }
      }
    }));
  };

  const renderEmailConfig = (title: string, description: string, emailType: string, config: EmailConfig) => (
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
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: '#667085',
              mt: 0.5
            }}
          >
            {description}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 4 }}>
        <Stack spacing={4}>
          <Box>
            <Typography 
              sx={{ 
                fontSize: '14px',
                fontWeight: 600,
                color: '#344054',
                mb: 2
              }}
            >
              Email Details
            </Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  label="Email Address"
                  value={config.email}
                  onChange={(e) => handleEmailChange(emailType, 'email', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
                <TextField
                  label="Display Name"
                  value={config.displayName}
                  onChange={(e) => handleEmailChange(emailType, 'displayName', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography 
              sx={{ 
                fontSize: '14px',
                fontWeight: 600,
                color: '#344054',
                mb: 2
              }}
            >
              IMAP Settings
            </Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  label="Host"
                  value={config.imap.host}
                  onChange={(e) => handleServerChange(emailType, 'imap', 'host', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
                <TextField
                  label="Port"
                  value={config.imap.port}
                  onChange={(e) => handleServerChange(emailType, 'imap', 'port', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  label="Username"
                  value={config.imap.username}
                  onChange={(e) => handleServerChange(emailType, 'imap', 'username', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={config.imap.password}
                  onChange={(e) => handleServerChange(emailType, 'imap', 'password', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.imap.useSSL}
                    onChange={(e) => handleServerChange(emailType, 'imap', 'useSSL', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#6C5DD3',
                        '&:hover': {
                          backgroundColor: 'rgba(108, 93, 211, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#6C5DD3',
                      },
                    }}
                  />
                }
                label="Use SSL/TLS"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#344054',
                  }
                }}
              />
            </Stack>
          </Box>

          <Box>
            <Typography 
              sx={{ 
                fontSize: '14px',
                fontWeight: 600,
                color: '#344054',
                mb: 2
              }}
            >
              SMTP Settings
            </Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  label="Host"
                  value={config.smtp.host}
                  onChange={(e) => handleServerChange(emailType, 'smtp', 'host', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
                <TextField
                  label="Port"
                  value={config.smtp.port}
                  onChange={(e) => handleServerChange(emailType, 'smtp', 'port', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  label="Username"
                  value={config.smtp.username}
                  onChange={(e) => handleServerChange(emailType, 'smtp', 'username', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={config.smtp.password}
                  onChange={(e) => handleServerChange(emailType, 'smtp', 'password', e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.smtp.useSSL}
                    onChange={(e) => handleServerChange(emailType, 'smtp', 'useSSL', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#6C5DD3',
                        '&:hover': {
                          backgroundColor: 'rgba(108, 93, 211, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#6C5DD3',
                      },
                    }}
                  />
                }
                label="Use SSL/TLS"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#344054',
                  }
                }}
              />
            </Stack>
          </Box>

          <Box>
            <Typography 
              sx={{ 
                fontSize: '14px',
                fontWeight: 600,
                color: '#344054',
                mb: 2
              }}
            >
              Additional Settings
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Email Signature"
                value={config.signature}
                onChange={(e) => handleEmailChange(emailType, 'signature', e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }
                }}
              />

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.autoReply.enabled}
                      onChange={(e) => handleEmailChange(emailType, 'autoReply', {
                        ...config.autoReply,
                        enabled: e.target.checked
                      })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#6C5DD3',
                          '&:hover': {
                            backgroundColor: 'rgba(108, 93, 211, 0.08)',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#6C5DD3',
                        },
                      }}
                    />
                  }
                  label="Enable Auto-Reply"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '14px',
                      color: '#344054',
                    }
                  }}
                />
                {config.autoReply.enabled && (
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField
                      label="Auto-Reply Subject"
                      value={config.autoReply.subject}
                      onChange={(e) => handleEmailChange(emailType, 'autoReply', {
                        ...config.autoReply,
                        subject: e.target.value
                      })}
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#fff',
                        }
                      }}
                    />
                    <TextField
                      label="Auto-Reply Message"
                      value={config.autoReply.message}
                      onChange={(e) => handleEmailChange(emailType, 'autoReply', {
                        ...config.autoReply,
                        message: e.target.value
                      })}
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#fff',
                        }
                      }}
                    />
                  </Stack>
                )}
              </Box>

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.forwarding.enabled}
                      onChange={(e) => handleEmailChange(emailType, 'forwarding', {
                        ...config.forwarding,
                        enabled: e.target.checked
                      })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#6C5DD3',
                          '&:hover': {
                            backgroundColor: 'rgba(108, 93, 211, 0.08)',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#6C5DD3',
                        },
                      }}
                    />
                  }
                  label="Enable Email Forwarding"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '14px',
                      color: '#344054',
                    }
                  }}
                />
                {config.forwarding.enabled && (
                  <TextField
                    label="Forward to Email"
                    value={config.forwarding.email}
                    onChange={(e) => handleEmailChange(emailType, 'forwarding', {
                      ...config.forwarding,
                      email: e.target.value
                    })}
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }
                    }}
                  />
                )}
              </Box>
            </Stack>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box>
      <Stack spacing={2}>
        {renderEmailConfig(
          'Primary Email',
          'Used for direct messages and general communication',
          'primaryEmail',
          formData.primaryEmail
        )}
        {renderEmailConfig(
          'Support Email',
          'Used for ticket management and customer support',
          'supportEmail',
          formData.supportEmail
        )}
        {renderEmailConfig(
          'Billing Email',
          'Used for invoices and financial communications',
          'billingEmail',
          formData.billingEmail
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <PrimaryButton type="submit">
            Save Changes
          </PrimaryButton>
        </Box>
      </Stack>
    </Box>
  );
}
