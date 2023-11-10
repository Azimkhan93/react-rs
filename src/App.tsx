import {
  searchContextState,
  SearchContext,
} from './components/context/Context';
import React, { useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Info from './components/info/Info';
import Details from './components/details/Details';
import './App.css';

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
