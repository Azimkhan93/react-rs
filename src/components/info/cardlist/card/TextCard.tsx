import React from 'react';
import './TextCard.css';

type Props = {
  name: string;
  manufacturer: string;
  vehicle_class: string;
};
const TextCard = ({ name, manufacturer, vehicle_class }: Props) => {
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
