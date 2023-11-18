import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import './Details.css';
import Loader from '../info/loader/Loader';
import DetailCard from './DetailCard';
import { UserDataResults } from '../../types/props.types';

const Details = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetail, setCardDetail] = useState<UserDataResults>();
  const params = useParams<{ id: string }>();

  const fetchDetail = useCallback(() => {
    setIsLoading(true);

    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`Status = ${response.status}`);
        }

        return response.json();
      })
      .then((data: UserDataResults) => {
        setCardDetail(data);
        setIsLoading(false);
        return data;
      });
  }, [params.id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleCloseClick = () => {
    const path = generatePath('/');
    navigate({
      pathname: path,
    });
  };

  const detailComponent = isLoading ? (
    <Loader />
  ) : (
    <DetailCard
      cardDetail={cardDetail as UserDataResults}
      onCloseClick={handleCloseClick}
    />
  );
  return <div className="details-container">{detailComponent}</div>;
};

export default Details;
