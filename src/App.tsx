// import { useState } from 'react';
import React from 'react';
import Info from './components/info/Info';
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Details from './components/details/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <div className="container">
          <Info />
        </div>
      }
    >
      <Route path=":id" element={<Details />}></Route>
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
