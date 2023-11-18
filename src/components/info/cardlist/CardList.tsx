import React from 'react';
import { Outlet, generatePath, useNavigate } from 'react-router-dom';
import Card from './card/Card';
import { UserDataResults } from '../../../types/props.types';
type Props = {
  onSearchParams: URLSearchParams;
  products: UserDataResults[];
};

const CardList = ({ onSearchParams, products }: Props) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    const path = generatePath('/:id', { id });
    const entries = onSearchParams.entries();
    const searchArray: string[] = [];
    for (const entry of entries) {
      searchArray.push(entry.join('='));
    }
    navigate({
      pathname: path,
      search: searchArray.join('&'),
    });
  };
  const infoComponents =
    products.length === 0 ? (
      <h1>Nothing was found</h1>
    ) : (
      products.map(
        (user: UserDataResults, index: React.Key | null | undefined) => (
          <Card
            onCardClick={() => handleCardClick(String(user.id))}
            key={index}
            brand={user.brand}
            title={user.title}
            category={user.category}
          />
        )
      )
    );

  return (
    <div>
      <div className="general-container">
        <div className="info-container">{infoComponents}</div>
        <Outlet />
      </div>
    </div>
  );
};

export default CardList;
