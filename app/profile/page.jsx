
import React from 'react';
import Dashboard from './components/Dashboard';
import TripMap from './components/TripMap';
import Notifications from './components/Notifications';

const ProfilePage = () => {
  return (
    <div>
      <h1>User Profile</h1>
      <Dashboard />
      <TripMap />
      <Notifications />
    </div>
  );
};

export default ProfilePage;
