// import React from 'react';
// import { useParams, useNavigate, generatePath } from 'react-router-dom';
// import './Details.css';
// import Loader from '../info/loader/Loader';
// import DetailCard from './DetailCard';
// import { UserDataResults } from '../../types/props.types';
// import { useFetchProductByIdQuery } from '../../store/productsApi';

// const Details = () => {
//   const navigate = useNavigate();
//   const params = useParams<{ id: string }>();

//   const { data, error, isLoading } = useFetchProductByIdQuery(
//     params.id as string
//   );
//   console.log('myIsLoading', isLoading);
//   console.log(data);

//   const handleCloseClick = () => {
//     const path = generatePath('/');
//     navigate({
//       pathname: path,
//     });
//   };

//   const detailComponent = error ? (
//     <>Oh no, there was an error</>
//   ) : isLoading ? (
//     <Loader />
//   ) : data ? (
//     <DetailCard
//       cardDetail={data as UserDataResults}
//       onCloseClick={handleCloseClick}
//     />
//   ) : null;
//   return <div className="details-container">{detailComponent}</div>;
// };

// export default Details;
