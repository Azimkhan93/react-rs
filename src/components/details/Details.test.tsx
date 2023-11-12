import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mswServer } from '../../test/msw-server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('Detailed Card Component', () => {
  test('displays loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/4']}>
        <Routes>
          <Route path="/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
    expect(screen.getByTestId('detail-card')).toBeInTheDocument();
  });

  test('displays loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/4']}>
        <Routes>
          <Route path="/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
    expect(screen.getByTestId('detail-card-name')).toHaveTextContent(
      'Sand Crawler'
    );
    expect(screen.getByTestId('detail-card-model')).toHaveTextContent(
      'Digger Crawler'
    );
    expect(screen.getByTestId('detail-card-manufacturer')).toHaveTextContent(
      'Corellia Mining Corporation'
    );
    expect(screen.getByTestId('detail-card-cost')).toHaveTextContent('150000');
    expect(
      screen.getByTestId('detail-card-max_atmosphering_speed')
    ).toHaveTextContent('30');
    expect(screen.getByTestId('detail-card-crew')).toHaveTextContent('46');
    expect(screen.getByTestId('detail-card-passengers')).toHaveTextContent(
      '30'
    );
    expect(screen.getByTestId('detail-card-cargo_capacity')).toHaveTextContent(
      '50000'
    );
    expect(screen.getByTestId('detail-card-consumables')).toHaveTextContent(
      '2 months'
    );
    expect(screen.getByTestId('detail-card-vehicle_class')).toHaveTextContent(
      'wheeled'
    );
  });
});
