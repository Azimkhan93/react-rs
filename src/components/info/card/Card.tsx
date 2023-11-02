import React from 'react';
import TextCard from './TextCard';
import { UserDataResults } from '../../../types/props.types';
import './Card.css';

const Card: React.FC<UserDataResults> = ({
  name,
  manufacturer,
  vehicle_class,
}: UserDataResults) => {
  return (
    <div className="card">
      <TextCard
        name={name}
        manufacturer={manufacturer}
        vehicle_class={vehicle_class}
      />
    </div>
  );
};

export default Card;
