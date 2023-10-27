import React from 'react';
import './Loader.css';
class Loader extends React.Component {
  render() {
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
  }
}

export default Loader;
