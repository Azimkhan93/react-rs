import React, { useEffect, useState } from 'react';
// import './Info.css';
import { EmptyProps } from '@/types/props.types';
import Search from './search/Search';
import Pagination from './pagination/Pagination';
import { useSearchParams } from 'next/navigation';
import CardList from './cardlist/CardList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../store/searchSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useFetchPagesQuery } from '@/store/productsApi';
import Loader from './loader/Loader';
import { useRouter } from 'next/router';

export type MyRouter = {
  page: string,
  search: string, 
  limit: string
}

const getInitSearchText = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('searchKey') || '': '';
};

const Info: React.FC<EmptyProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.search.searchText);
  const itemsPerPage = useSelector(
    (state: RootState) => state.items.itemsPerPage
  );
  console.log('itemsperPage', itemsPerPage);
  const [inputText, setInputText] = useState(getInitSearchText());
  const router = useRouter();
  const { page, search, limit } = router.query as MyRouter;
  console.log('query', router.query)
  // const [searchParams, setSearchParams] = useSearchParams();
  // const pageParam = searchParams.get('page');
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * itemsPerPage;
  const { data, error, isLoading } = useFetchPagesQuery({
    searchText,
    itemsPerPage,
    skip,
  });

  console.log('dataizusefetchquery', data)
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: currentPage.toString(),
        search: searchText,
        limit: itemsPerPage,
      },
    });
  }, [currentPage, searchText, itemsPerPage]);

  // const handleSearchParams = (key: string, value: string) => {
  //   setSearchParams((prevParams) => {
  //     prevParams.set(key, value);

  //     return prevParams;
  //   });
  // };

  const handleSearchChange = (text: string): void => {
    setInputText(text);
  };

  const handleSearchClick = (): void => {
    dispatch(setSearchText(inputText));
    // handleSearchParams('search', inputText);
    // handleSearchParams('page', '1');
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, search: inputText, page: '1', limit:skip },
    });
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
        page={currentPage.toString()}
        // page={searchParams.get('page')}
        onPageChange={(key, value) => {
          router.replace({
            pathname: router.pathname,
            query: { ...router.query, [key]: value.toString() },
          });
        }}
        // onPageChange={handleSearchParams}
        onLimitChange={(key, value) => {
          router.replace({
            pathname: router.pathname,
            query: { ...router.query, [key]: value.toString(), page: '1' },
          });
        }}
        // onLimitChange={handleSearchParams}
        elementCount={data.total}
      />
      <CardList router={router} products={data.products} />
      {/* <CardList onSearchParams={searchParams} products={data.products} /> */}
    </div>
  ) : null;
  return <div>{cards}</div>;
};

export default Info;
