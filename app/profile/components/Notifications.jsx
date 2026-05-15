import React from 'react';

const Notifications = () => {
  // Dummy data for notifications
  const notifications = [
    { id: 1, message: '3 new travelers match your upcoming trip to Airport' },
    { id: 2, message: 'Your trip to Mountain View is in 2 days - 5 potential matches found' },
  ];

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;