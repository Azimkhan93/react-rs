import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { mswServer } from '../../../test-helpers/msw-server';
import Info from '../Info';
import { renderWithProviders } from '../../../test-helpers/utils/test-utils';

jest.mock('next/router', () => require('next-router-mock'));

class LocalStorageMock implements Storage {
  private store: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return index < keys.length ? keys[index] : null;
  }

  get length(): number {
    return Object.keys(this.store).length;
  }
}
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
  });

  mswServer.listen();
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('Card List component', () => {
  test('renders the specified number of cards', async () => {
    renderWithProviders(<Info />);
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
    const cards = screen.queryAllByTestId('card');
    expect(cards).toHaveLength(10);
  });

  test('message is displayed if no cards are present', async () => {
    renderWithProviders(<Info />);
    // };
    //Assert
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
    const cards = screen.queryAllByTestId('card');
    expect(cards).toHaveLength(0);
  });
});
