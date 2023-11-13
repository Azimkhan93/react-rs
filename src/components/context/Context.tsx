import { createContext } from 'react';
import { UserDataResults } from '../../types/props.types';

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

export type UserContextType = {
  userData: UserDataResults[];
  setUserData: React.Dispatch<React.SetStateAction<UserDataResults[]>>;
};

export const userContextState = {
  userData: [],
  setUserData: () => '',
};

export const UserContext = createContext<UserContextType>(userContextState);
