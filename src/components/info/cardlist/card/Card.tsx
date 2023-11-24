import React, { MouseEventHandler } from 'react';
import TextCard from './TextCard';
// import './Card.css';

type Props = {
  onCardClick: MouseEventHandler<HTMLDivElement>;
  brand: string;
  title: string;
  category: string;
};

const Card = ({ onCardClick, brand, title, category }: Props) => {
  return (
    <div onClick={onCardClick} className="card" data-testid="card">
      <TextCard brand={brand} title={title} category={category} />
    </div>
  );
};

export default Card;
