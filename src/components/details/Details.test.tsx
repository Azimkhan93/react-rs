import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mswServer } from '../../test/msw-server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

test('displays loading indicator while fetching data', async () => {
  render(
    <MemoryRouter initialEntries={['/4']}>
      <Routes>
        <Route path="/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  // Ensure that the loading indicator is initially displayed
  expect(screen.getByTestId('loader')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
  // Ensure that the loading indicator is no longer displayed
  expect(screen.getByTestId('detail-card')).toBeInTheDocument();

  // Continue with your assertions for the loaded data
  // For example, you can assert that specific elements are rendered with the fetched data
});
