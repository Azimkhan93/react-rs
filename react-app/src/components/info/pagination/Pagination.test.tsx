import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { renderWithProviders } from '../../../test-helpers/utils/test-utils';

describe('Pagination Component', () => {
  test('updates URL query parameter when page changes', () => {
    // Arrange
    const mockOnPageChange = jest.fn();
    const mockOnLimitChange = jest.fn();

    renderWithProviders(
      <Pagination
        page="1"
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
        elementCount={30}
      />
    );

    //Assert
    fireEvent.click(screen.getByTestId('page-button-2'));
    expect(mockOnPageChange).toHaveBeenCalledWith('page', '2');
  });
});
