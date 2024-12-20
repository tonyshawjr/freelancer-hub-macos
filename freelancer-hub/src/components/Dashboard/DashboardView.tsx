import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { DashboardRSS } from './DashboardRSS';

export const DashboardView: React.FC = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardStats />
      <DashboardRSS />
    </div>
  );
};
