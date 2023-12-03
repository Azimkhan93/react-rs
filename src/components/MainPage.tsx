import React from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import './MainPage.css';
import { Card } from './cards/Card';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
// import UncontrolledForm from './uncontrolled/UncontrolledForm'
// import ControlledForm from './controlled/ControlledForm'

export const Main = () => {
  const items = useSelector((state: RootState) => state.form.formData);
  const cards = items.map((item, index) => (
    <Card
      key={index}
      name={item.name}
      age={item.age}
      email={item.email}
      password={item.passwordname}
      gender={item.gender}
      country={item.country}
      image={item.image}
    ></Card>
  ));

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
      <div className="main-container">{cards}</div>
      <Outlet />
    </div>
  );
};
