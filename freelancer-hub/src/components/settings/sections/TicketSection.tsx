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
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PrimaryButton } from '../../common/buttons';

interface TicketCategory {
  id: string;
  name: string;
  color: string;
}

interface PriorityLevel {
  id: string;
  name: string;
  color: string;
  sla: number; // in hours
}

interface ResponseTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export default function TicketSection() {
  const [formData, setFormData] = useState({
    categories: [
      { id: '1', name: 'Technical Support', color: '#6C5DD3' },
      { id: '2', name: 'Bug Report', color: '#EF4444' },
      { id: '3', name: 'Feature Request', color: '#10B981' },
    ] as TicketCategory[],
    
    priorityLevels: [
      { id: '1', name: 'Critical', color: '#EF4444', sla: 2 },
      { id: '2', name: 'High', color: '#F59E0B', sla: 4 },
      { id: '3', name: 'Medium', color: '#3B82F6', sla: 8 },
      { id: '4', name: 'Low', color: '#10B981', sla: 24 },
    ] as PriorityLevel[],
    
    responseTemplates: [
      {
        id: '1',
        name: 'Initial Response',
        subject: 'RE: {{ticket.subject}}',
        content: 'Thank you for reaching out. We have received your ticket and will get back to you shortly.',
      },
    ] as ResponseTemplate[],
    
    slaSettings: {
      enabled: true,
      defaultResponseTime: 4, // hours
      escalationEnabled: true,
      escalationTime: 2, // hours
      notifyManager: true,
    },
    
    autoAssignment: {
      enabled: true,
      roundRobin: true,
      loadBalancing: false,
      skillBased: false,
    },
    
    clientCommunication: {
      autoReplyEnabled: true,
      sendUpdates: true,
      allowClientReplies: true,
      requireApproval: false,
    },
    
    ticketNumbering: {
      prefix: 'TKT',
      startingNumber: 1000,
      includeDate: true,
      dateFormat: 'YYYYMMDD',
      separator: '-',
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
                Category Management
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Manage ticket categories and labels
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {formData.categories.map((category, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      backgroundColor: category.color
                    }}
                  />
                  <TextField
                    value={category.name}
                    onChange={(e) => {
                      const newCategories = [...formData.categories];
                      newCategories[index].name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        categories: newCategories
                      }));
                    }}
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
              ))}
              <PrimaryButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    categories: [
                      ...prev.categories,
                      { id: Date.now().toString(), name: '', color: '#6C5DD3' }
                    ]
                  }));
                }}
              >
                Add Category
              </PrimaryButton>
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
                Priority Levels
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure priority levels and SLA times
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {formData.priorityLevels.map((priority, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      backgroundColor: priority.color
                    }}
                  />
                  <TextField
                    value={priority.name}
                    onChange={(e) => {
                      const newPriorities = [...formData.priorityLevels];
                      newPriorities[index].name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        priorityLevels: newPriorities
                      }));
                    }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="number"
                    label="SLA (hours)"
                    value={priority.sla}
                    onChange={(e) => {
                      const newPriorities = [...formData.priorityLevels];
                      newPriorities[index].sla = parseInt(e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        priorityLevels: newPriorities
                      }));
                    }}
                    sx={{ width: 150 }}
                  />
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
                Response Templates
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Manage pre-defined response templates
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {formData.responseTemplates.map((template, index) => (
                <Box key={index}>
                  <TextField
                    label="Template Name"
                    value={template.name}
                    onChange={(e) => {
                      const newTemplates = [...formData.responseTemplates];
                      newTemplates[index].name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        responseTemplates: newTemplates
                      }));
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Subject"
                    value={template.subject}
                    onChange={(e) => {
                      const newTemplates = [...formData.responseTemplates];
                      newTemplates[index].subject = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        responseTemplates: newTemplates
                      }));
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Content"
                    value={template.content}
                    onChange={(e) => {
                      const newTemplates = [...formData.responseTemplates];
                      newTemplates[index].content = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        responseTemplates: newTemplates
                      }));
                    }}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Box>
              ))}
              <PrimaryButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    responseTemplates: [
                      ...prev.responseTemplates,
                      {
                        id: Date.now().toString(),
                        name: '',
                        subject: '',
                        content: ''
                      }
                    ]
                  }));
                }}
              >
                Add Template
              </PrimaryButton>
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
                SLA Settings
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure Service Level Agreement settings
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.slaSettings.enabled}
                    onChange={(e) => handleChange('slaSettings', 'enabled', e.target.checked)}
                  />
                }
                label="Enable SLA Tracking"
              />
              <TextField
                label="Default Response Time (hours)"
                type="number"
                value={formData.slaSettings.defaultResponseTime}
                onChange={(e) => handleChange('slaSettings', 'defaultResponseTime', parseInt(e.target.value))}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.slaSettings.escalationEnabled}
                    onChange={(e) => handleChange('slaSettings', 'escalationEnabled', e.target.checked)}
                  />
                }
                label="Enable Escalations"
              />
              {formData.slaSettings.escalationEnabled && (
                <TextField
                  label="Escalation Time (hours)"
                  type="number"
                  value={formData.slaSettings.escalationTime}
                  onChange={(e) => handleChange('slaSettings', 'escalationTime', parseInt(e.target.value))}
                  fullWidth
                />
              )}
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.slaSettings.notifyManager}
                    onChange={(e) => handleChange('slaSettings', 'notifyManager', e.target.checked)}
                  />
                }
                label="Notify Manager on SLA Breach"
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
                Auto-Assignment Rules
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure automatic ticket assignment
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.autoAssignment.enabled}
                    onChange={(e) => handleChange('autoAssignment', 'enabled', e.target.checked)}
                  />
                }
                label="Enable Auto-Assignment"
              />
              {formData.autoAssignment.enabled && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoAssignment.roundRobin}
                        onChange={(e) => handleChange('autoAssignment', 'roundRobin', e.target.checked)}
                      />
                    }
                    label="Round Robin Assignment"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoAssignment.loadBalancing}
                        onChange={(e) => handleChange('autoAssignment', 'loadBalancing', e.target.checked)}
                      />
                    }
                    label="Load Balancing"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoAssignment.skillBased}
                        onChange={(e) => handleChange('autoAssignment', 'skillBased', e.target.checked)}
                      />
                    }
                    label="Skill-Based Assignment"
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
                Client Communication Rules
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure client communication settings
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientCommunication.autoReplyEnabled}
                    onChange={(e) => handleChange('clientCommunication', 'autoReplyEnabled', e.target.checked)}
                  />
                }
                label="Send Auto-Reply"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientCommunication.sendUpdates}
                    onChange={(e) => handleChange('clientCommunication', 'sendUpdates', e.target.checked)}
                  />
                }
                label="Send Status Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientCommunication.allowClientReplies}
                    onChange={(e) => handleChange('clientCommunication', 'allowClientReplies', e.target.checked)}
                  />
                }
                label="Allow Client Replies"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.clientCommunication.requireApproval}
                    onChange={(e) => handleChange('clientCommunication', 'requireApproval', e.target.checked)}
                  />
                }
                label="Require Approval for Outgoing Messages"
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
                Ticket Numbering Format
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#667085',
                  mt: 0.5
                }}
              >
                Configure ticket number format
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField
                label="Prefix"
                value={formData.ticketNumbering.prefix}
                onChange={(e) => handleChange('ticketNumbering', 'prefix', e.target.value)}
                fullWidth
              />
              <TextField
                label="Starting Number"
                type="number"
                value={formData.ticketNumbering.startingNumber}
                onChange={(e) => handleChange('ticketNumbering', 'startingNumber', parseInt(e.target.value))}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.ticketNumbering.includeDate}
                    onChange={(e) => handleChange('ticketNumbering', 'includeDate', e.target.checked)}
                  />
                }
                label="Include Date"
              />
              {formData.ticketNumbering.includeDate && (
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={formData.ticketNumbering.dateFormat}
                    label="Date Format"
                    onChange={(e) => handleChange('ticketNumbering', 'dateFormat', e.target.value)}
                  >
                    <MenuItem value="YYYYMMDD">YYYYMMDD</MenuItem>
                    <MenuItem value="DDMMYYYY">DDMMYYYY</MenuItem>
                    <MenuItem value="MMDDYYYY">MMDDYYYY</MenuItem>
                  </Select>
                </FormControl>
              )}
              <TextField
                label="Separator"
                value={formData.ticketNumbering.separator}
                onChange={(e) => handleChange('ticketNumbering', 'separator', e.target.value)}
                fullWidth
              />
              <Typography variant="caption" color="textSecondary">
                Preview: {formData.ticketNumbering.prefix}
                {formData.ticketNumbering.separator}
                {formData.ticketNumbering.includeDate ? '20231223' : ''}
                {formData.ticketNumbering.separator}
                {formData.ticketNumbering.startingNumber}
              </Typography>
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
