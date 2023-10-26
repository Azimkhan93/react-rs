import React from 'react';
import Button from './Button';
import './search.css';

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <input
          type="search"
          className="input-area"
          name="search"
          placeholder="Search"
        />
        <Button />
      </div>
    );
  }
}

export default Search;
