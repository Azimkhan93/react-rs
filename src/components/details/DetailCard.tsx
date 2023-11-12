import React from 'react';
import { CardDetail } from './Details';

type Props = {
  cardDetail: CardDetail;
  onCloseClick: () => void;
};
const DetailCard = ({ cardDetail, onCloseClick }: Props) => {
  return (
    <div className="details-subcontainer">
      <div className="detail-wrapper">
        <div data-testid="detail-card">
          <b>Name:</b>{' '}
          <span data-testid="detail-card-name">{cardDetail?.name}</span>
        </div>
        <div>
          <b>Model:</b>{' '}
          <span data-testid="detail-card-model">{cardDetail?.model}</span>
        </div>
        <div>
          <b>Manufacturer:</b>{' '}
          <span data-testid="detail-card-manufacturer">
            {cardDetail?.manufacturer}
          </span>
        </div>
        <div>
          <b>Cost:</b>{' '}
          <span data-testid="detail-card-cost">
            {cardDetail?.cost_in_credits}
          </span>
        </div>
        <div>
          <b>Max Atmosphering speed:</b>{' '}
          <span data-testid="detail-card-max_atmosphering_speed">
            {cardDetail?.max_atmosphering_speed}
          </span>
        </div>
        <div>
          <b>Crew:</b>{' '}
          <span data-testid="detail-card-crew">{cardDetail?.crew}</span>
        </div>
        <div>
          <b>Passengers:</b>{' '}
          <span data-testid="detail-card-passengers">
            {cardDetail?.passengers}
          </span>
        </div>
        <div>
          <b>Cargo Capacity:</b>{' '}
          <span data-testid="detail-card-cargo_capacity">
            {cardDetail?.cargo_capacity}
          </span>
        </div>
        <div>
          <b>Consumables:</b>{' '}
          <span data-testid="detail-card-consumables">
            {cardDetail?.consumables}
          </span>
        </div>
        <div>
          <b>Vehicle Class:</b>{' '}
          <span data-testid="detail-card-vehicle_class">
            {cardDetail?.vehicle_class}
          </span>
        </div>
      </div>
      <div className="close-btn-wrapper">
        <button
          className="close-btn"
          data-testid="close-button"
          onClick={onCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailCard;
