import React from 'react';
import { Box, Typography, Container } from '@mui/material';
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
    <Container maxWidth="lg">
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
    </Container>
  );
};

export default DashboardTest;
