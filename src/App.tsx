// import { useState } from 'react';
import React from 'react';
import Info from './components/info/Info';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route index element={<Page1 />}/>
//       <Route />
//     </Routes>
//   )
// );

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Info />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
