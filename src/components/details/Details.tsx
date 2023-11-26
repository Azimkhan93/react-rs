import React from 'react';
import styles from './Details.module.css';
import { useRouter } from 'next/router';
import Loader from '../info/loader/Loader';
import DetailCard from './DetailCard';
import { UserDataResults } from '../../types/props.types';
import { useFetchProductByIdQuery } from '../../store/productsApi';
import { skipToken } from '@reduxjs/toolkit/query';
const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useFetchProductByIdQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );

  const handleCloseClick = () => {
    router.push('/');
  };

  const detailComponent = error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <Loader />
  ) : data ? (
    <DetailCard
      cardDetail={data as UserDataResults}
      onCloseClick={handleCloseClick}
    />
  ) : null;
  return <div className={styles.details_container}>{detailComponent}</div>;
};

export default Details;
