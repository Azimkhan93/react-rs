import React, { ChangeEvent, useState } from 'react';
import './search.css';

interface InputCaptureProps {
  onSaveText: (text: string) => void;
}

const Search: React.FC<InputCaptureProps> = ({
  onSaveText,
}: InputCaptureProps) => {
  const [inputText, setInputText] = useState(' ');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    console.log(event.target.value);
    setInputText(event.target.value);
  };
  const handleButtonClick = (): void => {
    onSaveText(inputText);
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
      />
      <button className="search-btn" onClick={handleButtonClick}>
        Go
      </button>
    </div>
  );
};

export default Search;
