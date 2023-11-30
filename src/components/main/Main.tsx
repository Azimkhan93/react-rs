import React from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import './Main.css';
// import UncontrolledForm from './uncontrolled/UncontrolledForm'
// import ControlledForm from './controlled/ControlledForm'

export const Main = () => {
  return (
    <div>
      <h1>Main Form</h1>
      <nav className="navbar">
        <NavLink
          to="/uncontrolled"
          className={({ isActive, isPending }) =>
            `uncontrolled ${isPending ? 'pending' : isActive ? 'active' : ''}`
          }
        >
          Uncontrolled
        </NavLink>
        <NavLink
          to="controlled"
          className={({ isActive, isPending }) =>
            `controlled ${isPending ? 'pending' : isActive ? 'active' : ''}`
          }
        >
          Controlled
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
