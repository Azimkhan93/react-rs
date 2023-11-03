import React, { useCallback, useEffect, useState } from 'react';
import Card from './card/Card';
import './Info.css';
import { EmptyProps, UserData, UserDataResults } from '../../types/props.types';
import Loader from './loader/Loader';
import Search from './search/Search';
import ErrorTestButton from '../errorBoundary/errorTestButton';

const Info: React.FC<EmptyProps> = () => {
  const [output, setOutput] = useState([] as UserDataResults[]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchData = useCallback(() => {
    setIsLoading(true);
    const searchItem: string | null =
      searchText || localStorage.getItem('searchKey');

    const fetchPages = async () => {
      try {
        const promises = [];
        for (let page: number = 1; page <= 4; page++) {
          promises.push(
            fetch(
              `https://swapi.dev/api/vehicles/?page=${page}&search=${searchItem}`
            )
              .then((response) => response.json())
              .then((data: UserData) => {
                return data.results;
              })
              .catch((e: string | Record<string, unknown>) => {
                console.error('Error fetching data:', e);
                return [];
              })
          );
        }

        const results = await Promise.all(promises);
        const combinedResults = results.flat();
        setOutput(combinedResults);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = (text: string): void => {
    console.log('Saved text in parent:', text);
    setSearchText(text);
  };

  const infoComponents = isLoading ? (
    <Loader />
  ) : output.length === 0 ? (
    <h1>Nothing was found</h1>
  ) : (
    output.map((user, index) => (
      <Card
        key={index}
        name={user.name}
        manufacturer={user.manufacturer}
        vehicle_class={user.vehicle_class}
      />
    ))
  );

  return (
    <div>
      <Search onSaveText={handleSave} />
      <ErrorTestButton>Error</ErrorTestButton>
      <div className="info-container">{infoComponents}</div>
    </div>
  );
};

export default Info;
