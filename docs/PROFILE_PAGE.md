# Profile Page Feature

## Overview
The Profile Page feature allows users to view and manage their travel history, including both trips and trains. It provides a comprehensive dashboard with statistics, upcoming and past journeys, and the ability to delete entries.

## Features

### 1. User Information Display
- Full name
- Email address
- Roll number
- Phone number
- Institute code

### 2. Statistics Dashboard
Three key statistics cards showing:
- **Total Trips**: Total number of trips with upcoming count
- **Total Trains**: Total number of trains with upcoming count
- **Completed Journeys**: Combined count of past trips and trains

### 3. Tab Navigation
- **Upcoming Tab**: Shows all future trips and trains
- **Past Tab**: Shows all completed trips and trains

### 4. Trip Management
Each trip card displays:
- Route (Source → Destination)
- Date (formatted as "DD MMM YYYY")
- Time (formatted as "HH:MM AM/PM")
- Trip ID
- Delete button

### 5. Train Management
Each train card displays:
- Train number
- Date (formatted as "DD MMM YYYY")
- Train ID
- Delete button

### 6. Quick Actions
- **Add New Trip**: Redirects to trips page
- **Add New Train**: Redirects to trains page

## API Endpoints

### GET /api/profile
Fetches complete user profile with trips and trains.

**Authentication**: Required (JWT cookie)

**Response**:
```json
{
  "message": "Profile fetched successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "roll": "12345",
    "number": "9876543210",
    "instituteCode": "IITKGP"
  },
  "trips": {
    "upcoming": [...],
    "past": [...]
  },
  "trains": {
    "upcoming": [...],
    "past": [...]
  },
  "stats": {
    "totalTrips": 10,
    "upcomingTrips": 3,
    "pastTrips": 7,
    "totalTrains": 5,
    "upcomingTrains": 2,
    "pastTrains": 3
  }
}
```

**Error Responses**:
- `401 Unauthorized`: User not authenticated
- `404 Not Found`: User not found in database
- `500 Internal Server Error`: Server error

## File Structure

```
app/
├── api/
│   └── profile/
│       └── route.js          # Profile API endpoint
├── profile/
│   ├── page.jsx              # Profile page component
│   └── profile.module.css    # Profile page styles
└── lib/
    ├── Navbar.jsx            # Navigation bar component
    └── Navbar.module.css     # Navigation bar styles
```

## Components

### ProfilePage Component (`app/profile/page.jsx`)
Main profile page component with:
- State management for profile data, loading, and errors
- Tab switching between upcoming and past
- Delete functionality for trips and trains
- Responsive design
- Authentication redirect

### Navbar Component (`app/lib/Navbar.jsx`)
Navigation bar with:
- Logo and navigation links
- Authentication state detection
- Active link highlighting
- Mobile responsive menu
- Logout functionality

## Styling

### Design System
- **Primary Color**: `#667eea` (Purple)
- **Secondary Color**: `#764ba2` (Dark Purple)
- **Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Border Radius**: `12px` for cards, `8px` for buttons
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)` for cards

### Responsive Breakpoints
- **Mobile**: `max-width: 768px`
  - Single column layout
  - Full-width buttons
  - Hamburger menu

## Usage

### Accessing the Profile Page
1. User must be authenticated
2. Navigate to `/profile`
3. If not authenticated, redirects to `/authenticate?redirect_url=/profile`

### Deleting a Trip
```javascript
const handleDeleteTrip = async (tripID) => {
  const response = await fetch(`/api/trips/${tripID}`, {
    method: "DELETE",
  });
  // Refresh profile data
};
```

### Deleting a Train
```javascript
const handleDeleteTrain = async (trainID) => {
  const response = await fetch(`/api/trains/${trainID}`, {
    method: "DELETE",
  });
  // Refresh profile data
};
```

## Integration with Existing Features

### Authentication
- Uses existing `checkAuth()` utility from `app/utils/auth.js`
- Leverages JWT cookie-based authentication
- Redirects to authenticate page if not logged in

### Database Models
- **User Model**: `app/models/User.js`
- **Trip Model**: `app/models/Trip.js`
- **Train Model**: `app/models/Train.js`

### Date Utilities
- Uses `today()` function from `app/utils/date.js`
- Separates upcoming and past based on current date

## Testing

### Manual Testing Checklist
- [ ] Profile page loads with user data
- [ ] Statistics display correctly
- [ ] Tab switching works (upcoming/past)
- [ ] Trip cards display all information
- [ ] Train cards display all information
- [ ] Delete trip functionality works
- [ ] Delete train functionality works
- [ ] Add new trip button redirects correctly
- [ ] Add new train button redirects correctly
- [ ] Responsive design works on mobile
- [ ] Authentication redirect works
- [ ] Error handling displays properly

### Test Scenarios

#### Scenario 1: New User
- User has no trips or trains
- Should display empty state messages
- Statistics should show zeros

#### Scenario 2: User with Upcoming Trips
- Upcoming tab should show future trips
- Past tab should be empty or show old trips
- Statistics should reflect correct counts

#### Scenario 3: User with Past Trips
- Past tab should show completed trips
- Upcoming tab should show future trips
- Statistics should reflect correct counts

#### Scenario 4: Delete Functionality
- Clicking delete should show confirmation
- After deletion, profile should refresh
- Deleted item should no longer appear

## Future Enhancements

### Potential Improvements
1. **Search and Filter**: Add search functionality for trips/trains
2. **Sorting Options**: Sort by date, destination, etc.
3. **Export Data**: Export trip history as CSV/PDF
4. **Edit Functionality**: Edit trip/train details inline
5. **Share Profile**: Share travel history with friends
6. **Travel Analytics**: Show travel patterns and insights
7. **Notifications**: Notify about upcoming trips
8. **Social Features**: Connect with other travelers

### Performance Optimizations
1. **Pagination**: Implement pagination for large datasets
2. **Caching**: Cache profile data to reduce API calls
3. **Lazy Loading**: Load past trips only when tab is clicked
4. **Optimistic Updates**: Update UI before API response

## Troubleshooting

### Common Issues

#### Profile Page Not Loading
- Check if user is authenticated
- Verify MongoDB connection
- Check browser console for errors

#### Delete Not Working
- Ensure DELETE endpoints exist for trips/trains
- Check authentication token
- Verify tripID/trainID is correct

#### Styling Issues
- Clear browser cache
- Check if CSS module is imported correctly
- Verify Tailwind CSS is configured

## Contributing

When contributing to this feature:
1. Follow existing code style
2. Add comments for complex logic
3. Test on both desktop and mobile
4. Update this documentation if needed
5. Ensure backward compatibility

## Related Issues
- Issue #10: Profile Page implementation

## License
This feature is part of the Travel Buddy project and follows the same license.
