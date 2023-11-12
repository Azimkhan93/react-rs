import React, { MouseEventHandler } from 'react';
import TextCard from './TextCard';
import './Card.css';

type Props = {
  onCardClick: MouseEventHandler<HTMLDivElement>;
  name: string;
  manufacturer: string;
  vehicle_class: string;
};

const Card = ({ onCardClick, name, manufacturer, vehicle_class }: Props) => {
  return (
    <div onClick={onCardClick} className="card" data-testid="card">
      <TextCard
        name={name}
        manufacturer={manufacturer}
        vehicle_class={vehicle_class}
      />
    </div>
  );
};

export default Card;
