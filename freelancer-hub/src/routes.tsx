import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tickets from './pages/Tickets';
import CreateTicket from './pages/CreateTicket';
import TicketDetail from './pages/TicketDetail';
import Clients from './pages/Clients';
import Invoices from './pages/Invoices';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Core routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        
        {/* Ticket routes */}
        <Route path="/tickets">
          <Route index element={<Tickets />} />
          <Route path="create" element={<CreateTicket />} />
          <Route path=":id" element={<TicketDetail />} />
        </Route>
        
        {/* Other routes */}
        <Route path="/clients" element={<Clients />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default Router;
