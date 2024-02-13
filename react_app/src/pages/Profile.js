import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to your profile.</p>
      <Link to="/">Go to Home</Link> {/* Link to navigate back to Home */}
    </div>
  );
};

export default Profile;
