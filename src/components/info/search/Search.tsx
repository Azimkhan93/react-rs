import React, { ChangeEvent } from 'react';
import styles from './Search.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface InputCaptureProps {
  onSearchChange: (text: string) => void;
  onSearchClick: (text: string) => void;
  inputText: string;
}

const Search = ({
  onSearchChange,
  onSearchClick,
  inputText,
}: InputCaptureProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(event.target.value);
  };
  const searchText: string = useSelector(
    (state: RootState) => state.search.searchText
  );
  const handleButtonClick = (): void => {
    onSearchClick(searchText);
    localStorage.setItem('searchKey', inputText);
  };

  return (
    <div className={styles.search}>
      <input
        type="search"
        className={styles.input_area}
        name="search"
        placeholder="Search by name"
        onChange={handleInputChange}
        value={inputText}
      />
      <button className={styles.search_btn} onClick={handleButtonClick}>
        Go
      </button>
    </div>
  );
};

export default Search;
