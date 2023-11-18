import React, { useContext } from 'react';
import { Outlet, generatePath, useNavigate } from 'react-router-dom';
import Card from './card/Card';
import Loader from '../loader/Loader';
import { UserContext, UserContextType } from '../../context/Context';

type Props = {
  isLoading: boolean;
  onSearchParams: URLSearchParams;
};

const CardList = ({ isLoading, onSearchParams }: Props) => {
  const navigate = useNavigate();
  const userValue = useContext<UserContextType>(UserContext);
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

  const infoComponents = isLoading ? (
    <Loader />
  ) : userValue.userData.length === 0 ? (
    <h1>Nothing was found</h1>
  ) : (
    userValue.userData.map((user, index) => (
      <Card
        onCardClick={() => handleCardClick(String(user.id))}
        key={index}
        brand={user.brand}
        title={user.title}
        category={user.category}
      />
    ))
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
