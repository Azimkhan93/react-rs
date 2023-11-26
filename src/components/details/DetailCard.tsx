import React from 'react';
import { UserDataResults } from '../../types/props.types';
import styles from './DetailCard.module.css'

type Props = {
  cardDetail: UserDataResults;
  onCloseClick: () => void;
};
const DetailCard = ({ cardDetail, onCloseClick }: Props) => {
  return (
    <div className={styles.details_subcontainer}>
      <div className={styles.details_wrapper}>
        <div>
          <b>Title:</b>{' '}
          <span data-testid="detail-card-title">{cardDetail?.title}</span>
        </div>
        <div data-testid="detail-card">
          <b>Brand:</b>{' '}
          <span data-testid="detail-card-brand">{cardDetail?.brand}</span>
        </div>
        <div>
          <b>Category:</b>{' '}
          <span data-testid="detail-card-category">{cardDetail?.category}</span>
        </div>
        <div>
          <b>Price:</b>{' '}
          <span data-testid="detail-card-price">{cardDetail?.price}</span>
        </div>
        <div>
          <b>Discount percentage:</b>{' '}
          <span data-testid="detail-card-discount_percentage">
            {cardDetail?.discountPercentage} %
          </span>
        </div>
        <div>
          <b>Stock:</b>{' '}
          <span data-testid="detail-card-stock">{cardDetail?.stock}</span>
        </div>
        <div>
          <b>Rating:</b>{' '}
          <span data-testid="detail-card-rating">{cardDetail?.rating}</span>
        </div>
        <div>
          <b>Description:</b>{' '}
          <span data-testid="detail-card-desciption">
            {cardDetail?.description}
          </span>
        </div>
      </div>
      <div className={styles.close_btn_wrapper}>
        <button
          className={styles.close_btn}
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
