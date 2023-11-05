import React, { useCallback, useEffect, useState } from 'react';
import Card from './card/Card';
import './Info.css';
import { EmptyProps, UserData, UserDataResults } from '../../types/props.types';
import Loader from './loader/Loader';
import Search from './search/Search';
import ErrorTestButton from '../errorBoundary/errorTestButton';
import Pagination from './pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

const getInitSearchText = () => {
  return localStorage.getItem('searchKey') || '';
};

const Info: React.FC<EmptyProps> = () => {
  const [output, setOutput] = useState([] as UserDataResults[]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState(getInitSearchText());
  const [searchText, setSearchText] = useState(getInitSearchText());
  const [elementCount, setElementCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = useCallback(() => {
    setIsLoading(true);

    const fetchPages = async () => {
      try {
        console.log('searchParams', searchParams);
        const page = Number(searchParams.get('page')) || 1;
        // console.log('page', page);
        const limit = Number(searchParams.get('limit')) || 10;
        const startPage = ((page - 1) * limit) / 10 + 1;
        const endPage = (limit / 10) * page;

        const promises = [];
        for (let apiPage: number = startPage; apiPage <= endPage; apiPage++) {
          promises.push(
            fetch(
              `https://swapi.dev/api/vehicles/?page=${apiPage}&search=${searchText}`
            )
              .then((response) => {
                if (!response.ok) {
                  throw Error(`Status = ${response.status}`);
                }

                return response.json();
              })
              .then((data: UserData) => {
                setElementCount(data.count);
                return data.results;
              })
              .catch((e: string | Record<string, unknown>) => {
                console.error('Error fetching data:', e);
                throw e;
              })
          );
        }

        const results = await Promise.allSettled(promises);
        // console.log('results', results);
        const combinedResults = results
          .filter((result) => result.status === 'fulfilled')
          .map(
            (result) =>
              (result as PromiseFulfilledResult<UserDataResults[]>).value
          )
          .flat();
        setOutput(combinedResults);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [searchParams, searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchParams = (key: string, value: string) => {
    setSearchParams((prevParams) => {
      prevParams.set(key, value);

      return prevParams;
    });
  };

  const handleSearchChange = (text: string): void => {
    // console.log('Saved text in parent:', text);
    setInputText(text);
  };

  const handleSearchClick = (): void => {
    // console.log('Saved text in parent:', text);
    setSearchText(inputText);
    handleSearchParams('search', inputText);
  };

  // console.log('output', output);
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
      <Search
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        searchText={searchText}
        inputText={inputText}
      />
      <Pagination
        elementCount={elementCount}
        page={searchParams.get('page')}
        onPageChange={handleSearchParams}
        onLimitChange={handleSearchParams}
      />
      <ErrorTestButton>Error</ErrorTestButton>
      <div className="info-container">{infoComponents}</div>
    </div>
  );
};

export default Info;
