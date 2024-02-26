import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'; // Ensure NavigationBar is imported
import './CreatePost.css'; // Adjust the path as necessary
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postSlice'; // Import the action creator

function CreatePost() {
  // State for form inputs
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch(); // Use the useDispatch hook to dispatch actions

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the addPost action with the form data as payload
    dispatch(addPost({ title, paragraph, date }));
    // Clear the form fields
    setTitle('');
    setParagraph('');
    setDate('');
  };

  return (
    <div>
      <NavigationBar /> {/* Include NavigationBar at the top */}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle">Title</label>
          <input
            type="text"
            id="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postParagraph">Paragraph</label>
          <textarea
            id="postParagraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="postDate">Date</label>
          <input
            type="date"
            id="postDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
