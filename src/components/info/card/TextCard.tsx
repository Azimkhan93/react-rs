import React from 'react';
import { UserDataResults } from '../../../types/props.types';
import './TextCard.css';

const TextCard: React.FC<UserDataResults> = ({
  name,
  manufacturer,
  vehicle_class,
}: UserDataResults) => {
  return (
    <div className="textcard">
      <span>
        <b>Name: </b>
      </span>
      {name}
      <br />
      <span>
        <b>Manufacturer: </b>
      </span>
      {manufacturer}
      <br />
      <span>
        <b>Vehicle Class: </b>
      </span>
      {vehicle_class}
    </div>
  );
};

export default TextCard;
