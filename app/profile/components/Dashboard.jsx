import React from 'react';

const Dashboard = () => {
  // Dummy data for trips
  const trips = [
    { id: 1, type: 'road', destination: 'Airport', matches: 3, status: 'matches' },
    { id: 2, type: 'train', destination: 'City Center', matches: 0, status: 'no-matches' },
    { id: 3, type: 'road', destination: 'Mountain View', matches: 5, status: 'matches' },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {trips.map(trip => (
          <div key={trip.id} style={{ border: `2px solid ${trip.status === 'matches' ? 'green' : 'gray'}`, margin: '10px', padding: '10px', width: '200px' }}>
            <h3>{trip.destination}</h3>
            <p>Type: {trip.type}</p>
            <p>Matches: {trip.matches}</p>
            <button>View Matches</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;