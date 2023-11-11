import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  test('updates URL query parameter when page changes', () => {
    // Arrange
    const mockOnPageChange = jest.fn();
    const mockOnLimitChange = jest.fn();

    const renderPagination = (props: {
      page: string | null;
      limitParam: string | null;
      elementCount: number;
    }) => {
      // Act
      return render(
        <Pagination
          page={props.page}
          limitParam={props.limitParam}
          elementCount={props.elementCount}
          onPageChange={mockOnPageChange}
          onLimitChange={mockOnLimitChange}
        />
      );
    };

    //Assert
    const { getByTestId } = renderPagination({
      page: '1',
      limitParam: '10',
      elementCount: 39,
    });
    fireEvent.click(getByTestId('page-button-2'));
    expect(mockOnPageChange).toHaveBeenCalledWith('page', '2');
  });
});
