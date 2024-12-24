import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
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
import Login from './pages/Login';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optional: Add a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if no user is authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Router: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login />} 
      />

      {/* Protected routes */}
      <Route 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
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

      {/* Redirect any unknown routes */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>
  );
};

export default Router;
