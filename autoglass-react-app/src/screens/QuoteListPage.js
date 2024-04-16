import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getQuotes } from '../reducers/quoteSlice';
import { Link } from 'react-router-dom';
import QuoteSummary from '../components/QuoteSummary';
import './QuoteListPage.styles.css'; // Import external stylesheet

const QuoteListPage = ({ quotes, getQuotes }) => {
  useEffect(() => {
    getQuotes();
  }, [getQuotes]);

  return (
    <div className="container">
      <h1>All Quotes</h1>
      <div className="navigation">
        <Link to="/" className="button">Go to List View</Link>
        <Link to="/new-quote" className="button">Go to New Quote</Link>
      </div>
      <div className="quotes-list">
        {quotes.map(quote => (
          <QuoteSummary key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quotes: state.quote.quotes,
});

const mapDispatchToProps = (dispatch) => ({
  getQuotes: () => dispatch(getQuotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuoteListPage);
