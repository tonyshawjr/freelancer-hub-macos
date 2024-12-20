import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { MockDataProvider } from './context/MockDataContext';
import { RSSProvider } from './context/RSSContext';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import DashboardTest from './pages/DashboardTest';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import Clients from './pages/Clients';
import CreateClient from './pages/CreateClient';
import ClientDetail from './pages/ClientDetail';
import Invoices from './pages/Invoices';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceDetail from './pages/InvoiceDetail';
import Settings from './pages/Settings';
import Tickets from './pages/Tickets';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import CreateTicket from './pages/CreateTicket';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RSSProvider>
        <CssBaseline />
        <MockDataProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="/test" element={<DashboardTest />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/new" element={<CreateProject />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/create" element={<CreateTicket />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/new" element={<CreateClient />} />
                <Route path="/clients/:id" element={<ClientDetail />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/new" element={<CreateInvoice />} />
                <Route path="/invoices/:id" element={<InvoiceDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </Router>
        </MockDataProvider>
      </RSSProvider>
    </ThemeProvider>
  );
}

export default App;
