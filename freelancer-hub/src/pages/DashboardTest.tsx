import React from 'react';
import { Box, Typography } from '@mui/material';
import { mockInvoices } from '../data/mockInvoices';
import { mockProjects } from '../data/mockProjects';
import { formatCurrency } from '../utils/invoiceUtils';

const DashboardTest: React.FC = () => {
  const currentTime = new Date();

  // Calculate yearly unpaid invoices
  const unpaidInvoicesYTD = mockInvoices
    .filter(inv => !inv.paid && new Date(inv.date).getFullYear() === currentTime.getFullYear())
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate monthly paid invoices
  const paidInvoicesMTD = mockInvoices
    .filter(inv => 
      inv.paid && 
      new Date(inv.date).getMonth() === currentTime.getMonth() &&
      new Date(inv.date).getFullYear() === currentTime.getFullYear())
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate total value of proposals
  const outstandingProposals = mockProjects
    .filter(p => p.status === 'proposal')
    .reduce((sum, p) => sum + p.budget, 0);

  return (
    <Box sx={{ bgcolor: '#FFFFFF', width: '100%' }}>
      <Box sx={{ 
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Financial Overview
            </Typography>
            <Typography>
              Unpaid Invoices (YTD): {formatCurrency(unpaidInvoicesYTD)}
            </Typography>
            <Typography>
              Paid Invoices (MTD): {formatCurrency(paidInvoicesMTD)}
            </Typography>
            <Typography>
              Outstanding Proposals: {formatCurrency(outstandingProposals)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTest;
