import React from 'react';
import './QuoteSummary.styles.css'; // Import external stylesheet

const QuoteSummary = ({ quote }) => {

  return (
    <div className="quote-summary">
      <div className="quote-date">Date: {new Date(quote.dateTime).toLocaleString()}</div>
      <div className="quote-year">{quote.year}</div>
      <div className="quote-make">{quote.make}</div>
      <div className="quote-model">{quote.model}</div>
      <div className="quote-glass">{quote.glass}</div>
    </div>
  );
};

export default QuoteSummary;
