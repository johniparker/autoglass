import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import the CSS file

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <Link to="/" className="nav-button">Home</Link>
      <Link to="/create-post" className="nav-button">Create Post</Link>
    </div>
  );
}

export default NavigationBar;