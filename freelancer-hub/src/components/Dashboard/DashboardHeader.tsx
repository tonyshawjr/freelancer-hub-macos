import React from 'react';
import { useUserSettings } from '../../stores/userSettings';

export const DashboardHeader: React.FC = () => {
  const { firstName } = useUserSettings();

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = firstName || 'there';
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  return (
    <div className="dashboard-header">
      <h1>{getGreeting()}</h1>
      <p>{new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
      <p className="summary">
        You're currently juggling 1 active project with $8,206.40 in pending 
        payments waiting to be processed. There are 5 urgent tickets requiring 
        your attention. Consider following up on these payments to maintain 
        healthy cash flow.
      </p>
    </div>
  );
};
