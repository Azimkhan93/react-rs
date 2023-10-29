// import { useState } from 'react';
import React from 'react';
import Info from './components/info/Info';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Info />
      </div>
    );
  }
}

export default App;
