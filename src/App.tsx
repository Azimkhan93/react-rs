// import { useState } from 'react';
import React, { useState, createContext } from 'react';
import Info from './components/info/Info';
import './App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Details from './components/details/Details';

export type SearchContextType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const searchContextState = {
  searchText: localStorage.getItem('searchKey') || '',
  setSearchText: () => '',
};

export const SearchContext =
  createContext<SearchContextType>(searchContextState);

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>(
    searchContextState.searchText
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <SearchContext.Provider value={{ searchText, setSearchText }}>
            <Info />
          </SearchContext.Provider>
        }
      >
        <Route path=":id" element={<Details />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
