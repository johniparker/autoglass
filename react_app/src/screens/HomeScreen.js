import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import state from '../store/postSlice'; // Import the action creator

const HomeScreen = ({ posts }) => {
  return (
    <div>
      <NavigationBar />
      <h1>Home Screen</h1>
      <h2>Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>{post.paragraph}</p>
            <small>{post.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => ({
  posts: state.posts.posts, // Access the posts array from the posts slice
});


// Connect the component to the Redux store
export default connect(mapStateToProps)(HomeScreen);
