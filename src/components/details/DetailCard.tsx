import React from 'react';
import { CardDetail } from './Details';

type Props = {
  cardDetail: CardDetail;
  onCloseClick: () => void;
};
const DetailCard = ({ cardDetail, onCloseClick }: Props) => {
  return (
    <div>
      <button onClick={onCloseClick}>Close</button>
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

export default DetailCard;
