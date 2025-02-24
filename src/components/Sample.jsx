import React from 'react';

const Sample = ({ heading, bodyText, buttonText }) => {
  return (
    <div className='container'>
      <h1>{heading}</h1>
      <p className='text-center'>{bodyText}</p>
      <button>{buttonText}</button>
    </div>
  );
};

export default Sample;
