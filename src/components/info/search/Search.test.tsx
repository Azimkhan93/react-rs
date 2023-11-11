import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

describe('Search component', () => {
  test('clicking the Search button saves the entered value to local storage', () => {
    // Arrange
    const handleSearchChange = jest.fn();
    const handleSearchClick = jest.fn();
    const inputText = 'Test Query';
    render(
      <Search
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        inputText={inputText}
      />
    );
    const input = screen.getByPlaceholderText(
      'Search by name'
    ) as HTMLInputElement;
    const searchButton = screen.getByText('Go');

    // Act
    fireEvent.change(input, { target: { value: 'Test Query' } });
    fireEvent.click(searchButton);

    // Assert
    expect(localStorage.getItem('searchKey')).toBe('Test Query');
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('retrieves value from local storage upon mounting', () => {
    // Arrange

    const handleSearchClick = jest.fn();
    const inputText = 'Test Query';

    localStorage.setItem('searchKey', inputText);
    const onSearchChangeMock = jest.fn();

    // Act
    render(
      <Search
        onSearchChange={onSearchChangeMock}
        onSearchClick={handleSearchClick}
        inputText={inputText}
      />
    );

    // Assert
    const input = screen.getByPlaceholderText(
      'Search by name'
    ) as HTMLInputElement;
    expect(input.value).toBe(inputText);
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(onSearchChangeMock).toHaveBeenCalledWith('New Value');
  });
});
