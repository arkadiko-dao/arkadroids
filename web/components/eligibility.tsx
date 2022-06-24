import React from 'react';

export const Eligibility = () => {
  return (
    <div className="container mx-auto md:px-20 px-10 pt-28 items-center">
      
      <p className="syne-mono text-base text-almost-white text-center">Are you eligible for an arkadroid?</p>
      <button
        type="button"
        className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
      >
        Check
      </button>
    </div>
  );
};