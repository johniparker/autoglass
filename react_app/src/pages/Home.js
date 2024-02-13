import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>This is the home page of our React application.</p>
      <Link to="/profile">Go to Profile</Link> {/* Link to navigate to Profile */}
    </div>
  );
};

export default Home;
