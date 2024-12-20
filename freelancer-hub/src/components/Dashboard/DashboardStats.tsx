import React from 'react';

interface StatCardProps {
  percentage: string;
  title: string;
  trend: 'up' | 'down';
  subtitle: string;
  detail: string;
}

const StatCard: React.FC<StatCardProps> = ({
  percentage,
  title,
  trend,
  subtitle,
  detail
}) => (
  <div className="stat-card">
    <div className="stat-header">
      <span className={`percentage ${trend}`}>{percentage}</span>
      <span className={`trend-icon ${trend}`}>
        {trend === 'up' ? '↗' : '↘'}
      </span>
    </div>
    <h3>{title}</h3>
    <div className="stat-details">
      <p className="subtitle">{subtitle}</p>
      <p className="detail">{detail}</p>
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  return (
    <div className="dashboard-stats">
      <h2>Your Monthly Stats</h2>
      <div className="stats-grid">
        <StatCard
          percentage="28%"
          title="Revenue Growth"
          trend="up"
          subtitle="$12,486.20"
          detail="Total revenue this month"
        />
        <StatCard
          percentage="12%"
          title="Project Completion"
          trend="down"
          subtitle="8/12"
          detail="Projects completed this month"
        />
        <StatCard
          percentage="5%"
          title="Client Satisfaction"
          trend="up"
          subtitle="4.8/5.0"
          detail="Average rating this month"
        />
      </div>
    </div>
  );
};
