import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import './Details.css';
import Loader from '../info/loader/Loader';
import DetailCard from './DetailCard';

export type CardDetail = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
};
const Details = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardDetail>();
  const params = useParams<{ id: string }>();

  const fetchDetail = useCallback(() => {
    setIsLoading(true);
    // console.log(params.id);

    fetch(`https://swapi.dev/api/vehicles/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`Status = ${response.status}`);
        }

        return response.json();
      })
      .then((data: CardDetail) => {
        // console.log(data);
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
      cardDetail={cardDetail as CardDetail}
      onCloseClick={handleCloseClick}
    />
  );
  return <div className="details-container">{detailComponent}</div>;
};

export default Details;
