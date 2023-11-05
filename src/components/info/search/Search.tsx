import React, { ChangeEvent } from 'react';
import './search.css';

interface InputCaptureProps {
  onSearchChange: (text: string) => void;
  onSearchClick: (text: string) => void;
  searchText: string;
  inputText: string;
}

const Search = ({
  onSearchChange,
  onSearchClick,
  searchText,
  inputText,
}: InputCaptureProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log('event-target-value', event.target.value);
    onSearchChange(event.target.value);
  };

  const handleButtonClick = (): void => {
    onSearchClick(searchText);
    localStorage.setItem('searchKey', inputText);
  };

  return (
    <div className="search">
      <input
        type="search"
        className="input-area"
        name="search"
        placeholder="Search by name"
        onChange={handleInputChange}
        value={inputText}
      />
      <button className="search-btn" onClick={handleButtonClick}>
        Go
      </button>
    </div>
  );
};

export default Search;
