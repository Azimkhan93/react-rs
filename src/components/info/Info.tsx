import React, { useState } from 'react';
import './Info.css';
import { EmptyProps } from '../../types/props.types';
import Search from './search/Search';
import Pagination from './pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import CardList from './cardlist/CardList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../store/searchSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useFetchPagesQuery } from '../../store/productsApi';
import Loader from './loader/Loader';

const getInitSearchText = () => {
  return localStorage.getItem('searchKey') || '';
};

const Info: React.FC<EmptyProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.search.searchText);

  const [inputText, setInputText] = useState(getInitSearchText());
  const [searchParams, setSearchParams] = useSearchParams();
  const limitParam = searchParams.get('limit');
  const pageParam = searchParams.get('page');
  const page = Number(pageParam) || 1;
  const limit = Number(limitParam) || 10;
  const skip = page * limit - limit;

  const { data, error, isLoading } = useFetchPagesQuery({
    searchText,
    limit,
    skip,
  });

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

  const cards = error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <Loader />
  ) : data ? (
    <div>
      <Search
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        inputText={inputText}
      />
      <Pagination
        page={searchParams.get('page')}
        limitParam={searchParams.get('limit')}
        onPageChange={handleSearchParams}
        onLimitChange={handleSearchParams}
        elementCount={data.total}
      />
      <CardList onSearchParams={searchParams} products={data.products} />
    </div>
  ) : null;
  return <div>{cards}</div>;
};

export default Info;
