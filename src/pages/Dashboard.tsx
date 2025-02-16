import React from 'react';
import CurrentDateTime from '../components/common/CurrentDateTime';
import { useDateTime } from '../hooks/useDateTime';

const Dashboard: React.FC = () => {
  const { formattedDateTime, refresh } = useDateTime({
    updateInterval: 1000,
    format: 'UTC',
  });

  const handleRefresh = async () => {
    // اینجا می‌توانید عملیات به‌روزرسانی را انجام دهید
    await new Promise(resolve => setTimeout(resolve, 1000));
    refresh();
  };

  return (
    <div>
      <CurrentDateTime
        username="Mojim47"
        showUTC
        updateInterval={1000}
        onRefresh={handleRefresh}
      />
      
      {/* یا استفاده مستقیم از هوک */}
      <div>
        Current Time: {formattedDateTime}
      </div>
    </div>
  );
};

export default Dashboard;