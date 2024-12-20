import React from 'react';

interface QuickActionButtonProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  title,
  onClick
}) => (
  <button className="quick-action-button" onClick={onClick}>
    <span className="icon">{icon}</span>
    <span className="title">{title}</span>
  </button>
);

export const DashboardRSS: React.FC = () => {
  return (
    <div className="dashboard-rss">
      <h2>Quick Actions</h2>
      <div className="quick-actions-grid">
        <QuickActionButton
          icon="+"
          title="New Project"
          onClick={() => console.log('New Project')}
        />
        <QuickActionButton
          icon="🎫"
          title="Create Ticket"
          onClick={() => console.log('Create Ticket')}
        />
        <QuickActionButton
          icon="📄"
          title="New Invoice"
          onClick={() => console.log('New Invoice')}
        />
      </div>
    </div>
  );
};
