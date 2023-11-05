import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type CardDetail = {
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
  // const [isLoading, setIsLoading] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardDetail>();
  const params = useParams<{ id: string }>();

  const fetchDetail = useCallback(() => {
    console.log(params.id);

    fetch(`https://swapi.dev/api/vehicles/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`Status = ${response.status}`);
        }

        return response.json();
      })
      .then((data: CardDetail) => {
        console.log(data);
        setCardDetail(data);
        return data;
      });
  }, [params.id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return (
    <div>
      <div>
        <b>Name:</b> {cardDetail?.name}
      </div>
      <div>
        <b>Model:</b> {cardDetail?.model}
      </div>
      <div>
        <b>Manufacturer:</b> {cardDetail?.manufacturer}
      </div>
      <div>
        <b>Cost:</b> {cardDetail?.cost_in_credits}
      </div>
      <div>
        <b>Max Atmosphering speed:</b> {cardDetail?.max_atmosphering_speed}
      </div>
      <div>
        <b>Crew:</b> {cardDetail?.crew}
      </div>
      <div>
        <b>Passengers:</b> {cardDetail?.passengers}
      </div>
      <div>
        <b>Cargo Capacity:</b> {cardDetail?.cargo_capacity}
      </div>
      <div>
        <b>Consumables:</b> {cardDetail?.consumables}
      </div>
      <div>
        <b>Vehicle Class:</b> {cardDetail?.vehicle_class}
      </div>
    </div>
  );
};

export default Details;
