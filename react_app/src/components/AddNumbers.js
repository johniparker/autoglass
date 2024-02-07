import React, { useState } from 'react';
import TextInputField from './TextInputField'; // Import TextInputField component

function AddNumbers() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);

  const handleAddition = async () => {
    try {
      // Construct the URL with query parameters
      const url = new URL(
          'https://2b4480bbe38d4679b45db49c332b7df1.vfs.cloud9.us-east-1.amazonaws.com/api/add/'
      );
      url.searchParams.append('number1', number1);
      url.searchParams.append('number2', number2);
      console.log('NUM', number1, number2)
      // Make the fetch request
      const response = await fetch(url);
      const data = await response.json();

      // Set the result
      setResult(data.result);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResult('Error performing the calculation');
    }
  };

  const handleNumber1Change = (value) => {
    setNumber1(value);
  };

  const handleNumber2Change = (value) => {
    setNumber2(value);
  };

  return (
    <div>
      <TextInputField
        default_text={String(number1)}
        onChange={handleNumber1Change}
        placeholder="Enter first number"
        maxLength={4}
      />
      <TextInputField
        default_text={String(number2)}
        onChange={handleNumber2Change}
        placeholder="Enter second number"
        maxLength={4}
      />
      <button onClick={handleAddition}>Add Numbers</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}

export default AddNumbers;
