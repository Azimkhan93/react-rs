import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loader__container">
      <div className="loader">
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
