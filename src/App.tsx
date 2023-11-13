import {
  searchContextState,
  SearchContext,
  userContextState,
  UserContext,
} from './components/context/Context';
import { UserDataResults } from './types/props.types';
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

  const [userData, setUserData] = useState<UserDataResults[]>(
    userContextState.userData
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <SearchContext.Provider value={{ searchText, setSearchText }}>
            <UserContext.Provider value={{ userData, setUserData }}>
              <Info />
            </UserContext.Provider>
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
