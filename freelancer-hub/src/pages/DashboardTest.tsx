import React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { useMockDataContext } from '../context/MockDataContext';
import { formatCurrency } from '../utils/invoiceUtils';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const DashboardTest: React.FC = () => {
  const { invoices, projects } = useMockDataContext();
  const currentTime = new Date();

  // Calculate financial metrics
  const unpaidInvoicesYTD = invoices
    .filter(inv => !inv.paid && new Date(inv.date).getFullYear() === currentTime.getFullYear())
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidInvoicesMTD = invoices
    .filter(inv => inv.paid && 
      new Date(inv.date).getMonth() === currentTime.getMonth() &&
      new Date(inv.date).getFullYear() === currentTime.getFullYear())
    .reduce((sum, inv) => sum + inv.amount, 0);

  const outstandingProposals = projects
    .filter(p => p.status === 'proposal')
    .reduce((sum, p) => sum + p.budget, 0);

  return (
    <Box sx={{ 
      bgcolor: '#FFFFFF',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 3,
          mb: 6
        }}>
          <Typography sx={{ 
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#4B5563'
          }}>
            CardboardWM
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}>
              <NotificationsIcon sx={{ 
                fontSize: '1.75rem', 
                color: '#6B7280',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#4B5563'
                }
              }} />
              <Box sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                bgcolor: '#EF4444',
                color: 'white',
                borderRadius: '50%',
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                6
              </Box>
            </Box>
            <IconButton>
              <MenuIcon sx={{ fontSize: '1.75rem', color: '#6B7280' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ pt: 2, pb: 20 }}>
          {/* Date and Quote */}
          <Typography variant="h1" sx={{ 
            fontSize: '2rem',
            fontWeight: 600,
            mb: 2,
            color: '#1F2937'
          }}>
            {format(currentTime, 'EEEE, MMMM do')}
          </Typography>

          <Typography sx={{ 
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: '#4B5563',
            mb: 1,
            maxWidth: '600px',
            lineHeight: 1.4
          }}>
            "Things may come to those who wait,
            but only the things left by those who hustle."
          </Typography>

          <Typography sx={{ 
            fontSize: '1.25rem',
            color: '#6B7280'
          }}>
            Abraham Lincoln
          </Typography>

          {/* Chart Section - Placeholder */}
          <Box sx={{ 
            mt: 8,
            height: 300,
            position: 'relative',
            bgcolor: '#F9FAFB',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography sx={{ color: '#6B7280' }}>
              Chart will be added once we install the charting library
            </Typography>
          </Box>

          {/* Financial Metrics */}
          <Box sx={{ 
            position: 'absolute',
            right: { xs: '24px', md: '80px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              bgcolor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
              minWidth: '300px'
            }}>
              <Box>
                <Typography sx={{ 
                  color: '#6B7280', 
                  mb: 1,
                  fontSize: '1.125rem'
                }}>
                  Unpaid Invoices YTD
                </Typography>
                <Typography sx={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {formatCurrency(unpaidInvoicesYTD)}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ 
                  color: '#6B7280', 
                  mb: 1,
                  fontSize: '1.125rem'
                }}>
                  Paid Invoices MTD
                </Typography>
                <Typography sx={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {formatCurrency(paidInvoicesMTD)}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ 
                  color: '#6B7280', 
                  mb: 1,
                  fontSize: '1.125rem'
                }}>
                  Outstanding Proposals
                </Typography>
                <Typography sx={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {formatCurrency(outstandingProposals)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Wave Background */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          bgcolor: '#60A5FA',
          borderTopLeftRadius: '100% 40%',
          borderTopRightRadius: '100% 40%',
          transform: 'scale(1.5)',
          transformOrigin: 'bottom',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit'
          }
        }}
      >
        <Typography variant="h2" sx={{ 
          color: 'white',
          pt: 6,
          pl: { xs: 4, md: 8 },
          fontSize: '2rem',
          fontWeight: 600
        }}>
          Financial Snapshot
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardTest;
