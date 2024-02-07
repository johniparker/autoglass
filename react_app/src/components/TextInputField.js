import React, { useState } from 'react';
import './TextInputField.css'; // Import the external stylesheet

function TextInputField({ default_text = '', placeholder = 'Enter text here...', maxLength = 255, onChange }) {
  const [inputValue, setInputValue] = useState(default_text);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length > maxLength) {
      setIsError(true);
    } else {
      setIsError(false);
      setInputValue(value);
      onChange && onChange(value); // Call the passed onChange function with the new value
    }
  };

  // Determine the CSS class for the input based on the error state
  const inputClass = isError ? 'text-input error' : 'text-input';

  return (
    <div>
      <input
        type="text"
        className={inputClass}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isError && <p className="error-message">Input exceeds maximum length of {maxLength} characters.</p>}
    </div>
  );
}

export default TextInputField;
