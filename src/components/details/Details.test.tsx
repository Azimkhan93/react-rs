import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mswServer } from '../../test-helpers/msw-server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';
import { renderWithProviders } from '../../test-helpers/utils/test-utils';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('Detailed Card Component', () => {
  test('displays loading indicator while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId('detail-card')).toBeInTheDocument()
    );
    expect(screen.getByTestId('detail-card')).toBeInTheDocument();
  });

  test('correctly displays the detailed card data', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
    expect(screen.getByTestId('detail-card-title')).toHaveTextContent(
      'iPhone 9'
    );
    expect(screen.getByTestId('detail-card-brand')).toHaveTextContent('Apple');
    expect(screen.getByTestId('detail-card-category')).toHaveTextContent(
      'smartphones'
    );
    expect(screen.getByTestId('detail-card-price')).toHaveTextContent('549');
    expect(
      screen.getByTestId('detail-card-discount_percentage')
    ).toHaveTextContent('12.96');
    expect(screen.getByTestId('detail-card-stock')).toHaveTextContent('94');
    expect(screen.getByTestId('detail-card-rating')).toHaveTextContent('4.69');
    expect(screen.getByTestId('detail-card-desciption')).toHaveTextContent(
      'An apple mobile which is nothing like apple'
    );
  });

  test('hides component on clicking close button', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
    fireEvent.click(screen.getByTestId('close-button'));
    await waitFor(() => expect(screen.queryByTestId('detail-card')).toBeNull());
  });
});
