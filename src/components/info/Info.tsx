import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Info.css';
import { EmptyProps, UserData, UserDataResults } from '../../types/props.types';
import Search from './search/Search';
import Pagination from './pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import CardList from './cardlist/CardList';
import {
  SearchContextType,
  SearchContext,
  UserContextType,
  UserContext,
} from '../context/Context';

const getInitSearchText = () => {
  return localStorage.getItem('searchKey') || '';
};

const Info: React.FC<EmptyProps> = () => {
  const searchValue = useContext<SearchContextType>(SearchContext);
  const { setUserData } = useContext<UserContextType>(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState(getInitSearchText());
  const [elementCount, setElementCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const limitParam = searchParams.get('limit');
  const pageParam = searchParams.get('page');

  const fetchData = useCallback(() => {
    setIsLoading(true);

    const fetchPages = async () => {
      try {
        const page = Number(pageParam) || 1;
        const limit = Number(limitParam) || 10;
        const startPage = ((page - 1) * limit) / 10 + 1;
        const endPage = (limit / 10) * page;

        const promises = [];
        for (let apiPage: number = startPage; apiPage <= endPage; apiPage++) {
          promises.push(
            fetch(
              `https://swapi.dev/api/vehicles/?page=${apiPage}&search=${searchValue.searchText}`
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
          );
        }

        const results = await Promise.allSettled(promises);
        const combinedResults = results
          .filter((result) => result.status === 'fulfilled')
          .map(
            (result) =>
              (result as PromiseFulfilledResult<UserDataResults[]>).value
          )
          .flat()
          .map((value) => {
            const splittedUrl = value.url.split('/');
            const id = splittedUrl[splittedUrl.length - 2];
            return { ...value, id };
          });
        setUserData(combinedResults);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [limitParam, pageParam, searchValue.searchText, setUserData]);

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
    setInputText(text);
  };

  const handleSearchClick = (): void => {
    searchValue.setSearchText(inputText);
    handleSearchParams('search', inputText);
  };

  return (
    <div>
      <Search
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        inputText={inputText}
      />
      <Pagination
        elementCount={elementCount}
        page={searchParams.get('page')}
        limitParam={searchParams.get('limit')}
        onPageChange={handleSearchParams}
        onLimitChange={handleSearchParams}
      />
      <CardList isLoading={isLoading} onSearchParams={searchParams} />
    </div>
  );
};

export default Info;
