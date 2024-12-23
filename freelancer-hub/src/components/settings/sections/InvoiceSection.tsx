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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PrimaryButton } from '../../common/buttons';

interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  instructions: string;
}

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  default: boolean;
}

export default function InvoiceSection() {
  const [formData, setFormData] = useState({
    template: {
      logoPosition: 'top-left',
      color: '#6C5DD3',
      font: 'Inter',
      showDueDate: true,
      showProjectDetails: true,
      showPaymentInstructions: true,
    },
    
    terms: {
      defaultDueDays: 30,
      defaultTerms: 'Payment is due within 30 days of invoice date.',
      lateFeeEnabled: true,
      lateFeePercentage: 5,
      gracePeriodDays: 7,
    },
    
    paymentMethods: [
      {
        id: '1',
        name: 'Bank Transfer',
        enabled: true,
        instructions: 'Please transfer to:\nBank: Example Bank\nAccount: 1234567890',
      },
      {
        id: '2',
        name: 'PayPal',
        enabled: true,
        instructions: 'Send payment to: payment@example.com',
      },
    ] as PaymentMethod[],
    
    lateFees: {
      enabled: true,
      percentage: 5,
      fixedAmount: 0,
      gracePeriod: 7,
      maximumFee: 100,
      compoundInterest: false,
    },
    
    taxes: {
      rates: [
        { id: '1', name: 'Standard Rate', rate: 20, default: true },
        { id: '2', name: 'Reduced Rate', rate: 5, default: false },
      ] as TaxRate[],
      showTaxNumber: true,
      taxNumber: '',
    },
    
    currency: {
      default: 'USD',
      symbol: '$',
      position: 'before',
      showCode: true,
    },
    
    numbering: {
      prefix: 'INV',
      startingNumber: 1000,
      includeDate: true,
      dateFormat: 'YYYYMM',
      separator: '-',
      yearlyReset: true,
    },
    
    defaultNotes: {
      header: 'Thank you for your business!',
      footer: 'Please include the invoice number in your payment reference.',
      terms: 'Payment is due within 30 days of invoice date.',
    },
  });

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
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
                Invoice Template Design
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Customize the appearance of your invoices
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Logo Position</InputLabel>
                <Select
                  value={formData.template.logoPosition}
                  label="Logo Position"
                  onChange={(e) => handleChange('template', 'logoPosition', e.target.value)}
                >
                  <MenuItem value="top-left">Top Left</MenuItem>
                  <MenuItem value="top-center">Top Center</MenuItem>
                  <MenuItem value="top-right">Top Right</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Accent Color"
                type="color"
                value={formData.template.color}
                onChange={(e) => handleChange('template', 'color', e.target.value)}
                fullWidth
              />
              
              <FormControl fullWidth>
                <InputLabel>Font Family</InputLabel>
                <Select
                  value={formData.template.font}
                  label="Font Family"
                  onChange={(e) => handleChange('template', 'font', e.target.value)}
                >
                  <MenuItem value="Inter">Inter</MenuItem>
                  <MenuItem value="Roboto">Roboto</MenuItem>
                  <MenuItem value="Open Sans">Open Sans</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.template.showDueDate}
                    onChange={(e) => handleChange('template', 'showDueDate', e.target.checked)}
                  />
                }
                label="Show Due Date"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.template.showProjectDetails}
                    onChange={(e) => handleChange('template', 'showProjectDetails', e.target.checked)}
                  />
                }
                label="Show Project Details"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.template.showPaymentInstructions}
                    onChange={(e) => handleChange('template', 'showPaymentInstructions', e.target.checked)}
                  />
                }
                label="Show Payment Instructions"
              />
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
                Default Terms
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Set default payment terms and conditions
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField
                label="Default Due Days"
                type="number"
                value={formData.terms.defaultDueDays}
                onChange={(e) => handleChange('terms', 'defaultDueDays', parseInt(e.target.value))}
                fullWidth
              />
              
              <TextField
                label="Default Terms"
                multiline
                rows={4}
                value={formData.terms.defaultTerms}
                onChange={(e) => handleChange('terms', 'defaultTerms', e.target.value)}
                fullWidth
              />
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
                Payment Methods
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure accepted payment methods
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {formData.paymentMethods.map((method, index) => (
                <Box key={index}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={method.enabled}
                        onChange={(e) => {
                          const newMethods = [...formData.paymentMethods];
                          newMethods[index].enabled = e.target.checked;
                          setFormData(prev => ({
                            ...prev,
                            paymentMethods: newMethods
                          }));
                        }}
                      />
                    }
                    label={method.name}
                  />
                  {method.enabled && (
                    <TextField
                      label="Payment Instructions"
                      multiline
                      rows={3}
                      value={method.instructions}
                      onChange={(e) => {
                        const newMethods = [...formData.paymentMethods];
                        newMethods[index].instructions = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          paymentMethods: newMethods
                        }));
                      }}
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  )}
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
                Late Fee Rules
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure late payment fees and rules
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.lateFees.enabled}
                    onChange={(e) => handleChange('lateFees', 'enabled', e.target.checked)}
                  />
                }
                label="Enable Late Fees"
              />
              
              {formData.lateFees.enabled && (
                <>
                  <TextField
                    label="Late Fee Percentage"
                    type="number"
                    value={formData.lateFees.percentage}
                    onChange={(e) => handleChange('lateFees', 'percentage', parseFloat(e.target.value))}
                    fullWidth
                  />
                  
                  <TextField
                    label="Fixed Amount"
                    type="number"
                    value={formData.lateFees.fixedAmount}
                    onChange={(e) => handleChange('lateFees', 'fixedAmount', parseFloat(e.target.value))}
                    fullWidth
                  />
                  
                  <TextField
                    label="Grace Period (days)"
                    type="number"
                    value={formData.lateFees.gracePeriod}
                    onChange={(e) => handleChange('lateFees', 'gracePeriod', parseInt(e.target.value))}
                    fullWidth
                  />
                  
                  <TextField
                    label="Maximum Fee"
                    type="number"
                    value={formData.lateFees.maximumFee}
                    onChange={(e) => handleChange('lateFees', 'maximumFee', parseFloat(e.target.value))}
                    fullWidth
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.lateFees.compoundInterest}
                        onChange={(e) => handleChange('lateFees', 'compoundInterest', e.target.checked)}
                      />
                    }
                    label="Apply Compound Interest"
                  />
                </>
              )}
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
                Tax Settings
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure tax rates and settings
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {formData.taxes.rates.map((rate, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    label="Tax Name"
                    value={rate.name}
                    onChange={(e) => {
                      const newRates = [...formData.taxes.rates];
                      newRates[index].name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        taxes: {
                          ...prev.taxes,
                          rates: newRates
                        }
                      }));
                    }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Rate (%)"
                    type="number"
                    value={rate.rate}
                    onChange={(e) => {
                      const newRates = [...formData.taxes.rates];
                      newRates[index].rate = parseFloat(e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        taxes: {
                          ...prev.taxes,
                          rates: newRates
                        }
                      }));
                    }}
                    sx={{ width: 120 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={rate.default}
                        onChange={(e) => {
                          const newRates = [...formData.taxes.rates];
                          newRates[index].default = e.target.checked;
                          setFormData(prev => ({
                            ...prev,
                            taxes: {
                              ...prev.taxes,
                              rates: newRates
                            }
                          }));
                        }}
                      />
                    }
                    label="Default"
                  />
                </Box>
              ))}
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.taxes.showTaxNumber}
                    onChange={(e) => handleChange('taxes', 'showTaxNumber', e.target.checked)}
                  />
                }
                label="Show Tax Number on Invoices"
              />
              
              {formData.taxes.showTaxNumber && (
                <TextField
                  label="Tax Number"
                  value={formData.taxes.taxNumber}
                  onChange={(e) => handleChange('taxes', 'taxNumber', e.target.value)}
                  fullWidth
                />
              )}
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
                Currency Options
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Set default currency and display options
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Default Currency</InputLabel>
                <Select
                  value={formData.currency.default}
                  label="Default Currency"
                  onChange={(e) => handleChange('currency', 'default', e.target.value)}
                >
                  <MenuItem value="USD">USD - US Dollar</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                  <MenuItem value="GBP">GBP - British Pound</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Currency Symbol"
                value={formData.currency.symbol}
                onChange={(e) => handleChange('currency', 'symbol', e.target.value)}
                fullWidth
              />
              
              <FormControl fullWidth>
                <InputLabel>Symbol Position</InputLabel>
                <Select
                  value={formData.currency.position}
                  label="Symbol Position"
                  onChange={(e) => handleChange('currency', 'position', e.target.value)}
                >
                  <MenuItem value="before">Before Amount</MenuItem>
                  <MenuItem value="after">After Amount</MenuItem>
                </Select>
              </FormControl>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.currency.showCode}
                    onChange={(e) => handleChange('currency', 'showCode', e.target.checked)}
                  />
                }
                label="Show Currency Code"
              />
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
                Numbering Sequence
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure invoice number format
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField
                label="Prefix"
                value={formData.numbering.prefix}
                onChange={(e) => handleChange('numbering', 'prefix', e.target.value)}
                fullWidth
              />
              
              <TextField
                label="Starting Number"
                type="number"
                value={formData.numbering.startingNumber}
                onChange={(e) => handleChange('numbering', 'startingNumber', parseInt(e.target.value))}
                fullWidth
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.numbering.includeDate}
                    onChange={(e) => handleChange('numbering', 'includeDate', e.target.checked)}
                  />
                }
                label="Include Date"
              />
              
              {formData.numbering.includeDate && (
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={formData.numbering.dateFormat}
                    label="Date Format"
                    onChange={(e) => handleChange('numbering', 'dateFormat', e.target.value)}
                  >
                    <MenuItem value="YYYYMM">YYYYMM</MenuItem>
                    <MenuItem value="YYYYMMDD">YYYYMMDD</MenuItem>
                    <MenuItem value="MMYYYY">MMYYYY</MenuItem>
                  </Select>
                </FormControl>
              )}
              
              <TextField
                label="Separator"
                value={formData.numbering.separator}
                onChange={(e) => handleChange('numbering', 'separator', e.target.value)}
                fullWidth
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.numbering.yearlyReset}
                    onChange={(e) => handleChange('numbering', 'yearlyReset', e.target.checked)}
                  />
                }
                label="Reset Number Yearly"
              />
              
              <Typography variant="caption" color="textSecondary">
                Preview: {formData.numbering.prefix}
                {formData.numbering.separator}
                {formData.numbering.includeDate ? '202312' : ''}
                {formData.numbering.separator}
                {formData.numbering.startingNumber}
              </Typography>
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
                Default Notes
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Set default header and footer notes
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField
                label="Header Note"
                multiline
                rows={2}
                value={formData.defaultNotes.header}
                onChange={(e) => handleChange('defaultNotes', 'header', e.target.value)}
                fullWidth
              />
              
              <TextField
                label="Footer Note"
                multiline
                rows={2}
                value={formData.defaultNotes.footer}
                onChange={(e) => handleChange('defaultNotes', 'footer', e.target.value)}
                fullWidth
              />
              
              <TextField
                label="Terms and Conditions"
                multiline
                rows={4}
                value={formData.defaultNotes.terms}
                onChange={(e) => handleChange('defaultNotes', 'terms', e.target.value)}
                fullWidth
              />
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
