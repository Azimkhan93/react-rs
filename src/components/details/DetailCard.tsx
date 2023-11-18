import React from 'react';
import { UserDataResults } from '../../types/props.types';

type Props = {
  cardDetail: UserDataResults;
  onCloseClick: () => void;
};
const DetailCard = ({ cardDetail, onCloseClick }: Props) => {
  return (
    <div className="details-subcontainer">
      <div className="detail-wrapper">
        <div data-testid="detail-card">
          <b>Brand:</b>{' '}
          <span data-testid="detail-card-name">{cardDetail?.brand}</span>
        </div>
        <div>
          <b>Title:</b>{' '}
          <span data-testid="detail-card-model">{cardDetail?.title}</span>
        </div>
        <div>
          <b>Category:</b>{' '}
          <span data-testid="detail-card-manufacturer">
            {cardDetail?.category}
          </span>
        </div>
        <div>
          <b>Price:</b>{' '}
          <span data-testid="detail-card-cost">{cardDetail?.price}</span>
        </div>
        <div>
          <b>Discount percentage:</b>{' '}
          <span data-testid="detail-card-max_atmosphering_speed">
            {cardDetail?.discountPercentage} %
          </span>
        </div>
        <div>
          <b>Stock:</b>{' '}
          <span data-testid="detail-card-crew">{cardDetail?.stock}</span>
        </div>
        <div>
          <b>Rating:</b>{' '}
          <span data-testid="detail-card-passengers">{cardDetail?.rating}</span>
        </div>
        <div>
          <b>Description:</b>{' '}
          <span data-testid="detail-card-vehicle_class">
            {cardDetail?.description}
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
