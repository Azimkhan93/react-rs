import { createContext } from 'react';

export type SearchContextType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export const searchContextState = {
  searchText: localStorage.getItem('searchKey') || '',
  setSearchText: () => '',
};

export const SearchContext =
  createContext<SearchContextType>(searchContextState);
