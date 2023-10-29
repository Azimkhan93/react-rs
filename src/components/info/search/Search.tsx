import React, { ChangeEvent } from 'react';
import './search.css';
import { SearchComponent } from '../../../types/props.types';

interface InputCaptureProps {
  onSaveText: (text: string) => void;
}

class Search extends React.Component<InputCaptureProps, SearchComponent> {
  constructor(props: InputCaptureProps) {
    super(props);
    this.state = {
      inputText: ' ',
    } as SearchComponent;
  }
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ inputText: event.target.value as string });
  };
  handleButtonClick = () => {
    const { inputText } = this.state;
    this.props.onSaveText(inputText);
    localStorage.setItem('searchKey', inputText);
  };

  render() {
    return (
      <div className="search">
        <input
          type="search"
          className="input-area"
          name="search"
          placeholder="Search by name"
          onChange={this.handleInputChange}
        />
        <button className="search-btn" onClick={this.handleButtonClick}>
          Go
        </button>
      </div>
    );
  }
}

export default Search;
