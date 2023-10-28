// import { useState } from 'react';
import React from 'react';
import Search from './components/search/Search';
import Info from './components/info/Info';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Search />
        <Info />
      </div>
    );
  }
}

export default App;
