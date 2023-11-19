import { screen, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mswServer } from '../../../test-helpers/msw-server';
import Info from '../Info';
import { UserContext, userContextState } from '../../context/Context';
import { UserDataResults } from '../../../types/props.types';
import { renderWithProviders } from '../../../test-helpers/utils/test-utils';

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

const ContextComponent = () => {
  const [userData, setUserData] = useState<UserDataResults[]>(
    userContextState.userData
  );
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Info />
    </UserContext.Provider>
  );
};

describe('Card List component', () => {
  test('renders the specified number of cards', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?limit=10&page=2']}>
        <Routes>
          <Route path="/" element={<ContextComponent />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          items: { itemsPerPage: 10 },
        },
      }
    );
    // };
    //Assert
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
      const cards = screen.queryAllByTestId('card');
      expect(cards).toHaveLength(10);
    });
  });

  test('message is displayed if no cards are present', async () => {
    localStorage.setItem('searchKey', 'asdalsdjafdlah');
    renderWithProviders(
      <MemoryRouter initialEntries={['/?search=asdalsdjafdlah']}>
        <Routes>
          <Route path="/" element={<ContextComponent />} />
        </Routes>
      </MemoryRouter>
    );
    // };
    //Assert
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
      expect(screen.getByText(/Nothing was found/)).toBeInTheDocument();
    });
  });
});
