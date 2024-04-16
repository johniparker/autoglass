import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addQuote } from '../reducers/quoteSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import './NewQuotePage.styles.css'; // Import external stylesheet

const NewQuotePage = ({ addQuote }) => {
  const location = useLocation(); // Initialize useLocation hook to access location object
  const navigate = useNavigate();// Initialize useHistory hook to access history object
  // Function to format a Date object to "YYYY-MM-DDTHH:MM"
  const formatDateToDateTimeLocal = (inputDate) => {
    // Create a new Date object from the input date
    const date = new Date(inputDate);

    // Adjust for time zone
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset); // Add offset for time zones ahead of UTC

    // Format the adjusted date to "YYYY-MM-DDTHH:MM"
    return `${adjustedDate.getFullYear()}-${String(adjustedDate.getMonth() + 1).padStart(2, '0')}-${String(adjustedDate.getDate()).padStart(2, '0')}T00:00`;
  };

  // Check if there's a date passed in location state and initialize dateTime with it
  const initialDateTime = location.state?.date
    ? formatDateToDateTimeLocal(new Date(location.state.date))
    : new Date().toISOString().slice(0, 16); // format: YYYY-MM-DDTHH:MM

  const [dateTime, setDateTime] = useState(initialDateTime);
  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [glass, setGlass] = useState('');
  
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };
  
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleVinChange = (e) => {
    setVin(e.target.value);
  };
  
  const handleBodyTypeChange = (e) => {
    setBodyType(e.target.value);
  };
  
  
  const handleGlassChange = (e) => {
    setGlass(e.target.value);
  };


  const handleSubmit = () => {
    // Call Redux action to add quote
    addQuote({
      dateTime: dateTime,
      vin: vin,
      year: year,
      make: make,
      model: model,
      bodyType: bodyType,
      glass: glass
    });

    // Reset fields after submission
    setDateTime(new Date().toISOString().slice(0, 16));
    setYear('');
    setVin('');
    setMake('');
    setModel('');
    setBodyType('');
    setGlass('');
    
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Request A Quote</h1>
      <div className="navigation">
        <Link to="/" className="button">Go to List View</Link>
        <Link to="/new-quote" className="button">Request A Quote</Link>
      </div>
      <div className="form-group">
        <label className="label">VIN:</label>
        <input
          type="text"
          placeholder="Enter vin"
          value={vin}
          onChange={handleVinChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Year:</label>
        <input
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleYearChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Make:</label>
        <input
          type="text"
          placeholder="Enter make"
          value={make}
          onChange={handleMakeChange}
          rows={6}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Model:</label>
        <input
          type="text"
          placeholder="Enter model"
          value={model}
          onChange={handleModelChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Body Type: </label>
        <input
          type="text"
          placeholder="Enter bodyType"
          value={bodyType}
          onChange={handleBodyTypeChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Which glass would you like replaced?</label>
        <input
          type="text"
          placeholder="Enter glass"
          value={glass}
          onChange={handleGlassChange}
          className="input"
        />
      </div>
      <button onClick={handleSubmit} className="button">Submit quote</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addQuote: (quote) => dispatch(addQuote(quote)),
});

export default connect(null, mapDispatchToProps)(NewQuotePage);
