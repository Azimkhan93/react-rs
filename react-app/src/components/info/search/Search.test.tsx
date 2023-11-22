import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';
import { renderWithProviders } from '../../../test-helpers/utils/test-utils';

describe('Search component', () => {
  test('clicking the Search button saves the entered value to local storage', () => {
    // Arrange
    const handleSearchChange = jest.fn();
    const handleSearchClick = jest.fn();
    const inputText = 'Test Query';
    renderWithProviders(
      <Search
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        inputText={inputText}
      />,
      {
        preloadedState: {
          search: {
            searchText: 'iphone',
          },
        },
      }
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
    const handleSearchChange = jest.fn();
    const handleSearchClick = jest.fn();
    const inputText = 'Test Query';

    localStorage.setItem('searchKey', inputText);

    // Act
    renderWithProviders(
      <Search
        onSearchChange={handleSearchChange}
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

    expect(handleSearchChange).toHaveBeenCalledWith('New Value');
  });
});
