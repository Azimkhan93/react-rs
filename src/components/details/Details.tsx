import React from 'react';
import styles from './Details.module.css';
// import { useParams, useNavigate, generatePath } from 'react-router-dom';
import { useRouter } from 'next/router';
import Loader from '../info/loader/Loader';
import DetailCard from './DetailCard';
import { UserDataResults } from '../../types/props.types';
import { useFetchProductByIdQuery } from '../../store/productsApi';
import { skipToken } from '@reduxjs/toolkit/query';
const Details = () => {
  // const navigate = useNavigate();
  // const params = useParams<{ id: string }>();
  const router = useRouter();
  // console.log(router.query);
  const { id } = router.query;

  // const { data, error, isLoading } = useFetchProductByIdQuery(
  //   params.id as string
  // );

  const { data, error, isLoading } = useFetchProductByIdQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );

  // console.log('myIsLoading', isLoading);
  // console.log('data', data);

  const handleCloseClick = () => {
    // const path = generatePath('/');
    // navigate({
    //   pathname: path,
    // });
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
