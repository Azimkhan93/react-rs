import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Info.css';
import { EmptyProps, UserDataResults } from '../../types/props.types';
import Search from './search/Search';
import Pagination from './pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import CardList from './cardlist/CardList';
import { UserContextType, UserContext } from '../context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../store/searchSlice';
import { AppDispatch, RootState } from '../../store/store';

const getInitSearchText = () => {
  return localStorage.getItem('searchKey') || '';
};

const Info: React.FC<EmptyProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.search.searchText);
  const { setUserData } = useContext<UserContextType>(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState(getInitSearchText());
  const [elementCount, setElementCount] = useState(100);
  const [searchParams, setSearchParams] = useSearchParams();
  const limitParam = searchParams.get('limit');
  const pageParam = searchParams.get('page');

  const fetchData = useCallback(() => {
    setIsLoading(true);

    const fetchPages = async () => {
      try {
        const page = Number(pageParam) || 1;
        const limit = Number(limitParam) || 10;
        const skip = page * limit - limit;
        console.log('page', page);
        const promises = [];
        promises.push(
          fetch(
            `https://dummyjson.com/products/search?q=${searchText}&limit=${limit}&skip=${skip}`
          )
            .then((response) => {
              if (!response.ok) {
                throw Error(`Status = ${response.status}`);
              }

              return response.json();
            })
            .then((data) => {
              setElementCount(100);
              console.log('data.products search', data.products.length);
              return data.products;
            })
        );
        const results = await Promise.allSettled(promises);
        console.log(results);
        const combinedResults = results
          .filter((result) => result.status === 'fulfilled')
          .map(
            (result) =>
              (result as PromiseFulfilledResult<UserDataResults[]>).value
          )[0];

        setUserData(combinedResults);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [limitParam, pageParam, searchText, setUserData]);

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
    dispatch(setSearchText(inputText));
    handleSearchParams('search', inputText);
    handleSearchParams('page', '1');
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
