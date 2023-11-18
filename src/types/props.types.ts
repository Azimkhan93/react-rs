export type EmptyProps = Record<string, never>;

export type UserDataResults = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type UserData = {
  results: UserDataResults[];
};

export type State = {
  output: UserDataResults[] | Record<string, never>;
};

export type StateArr = {
  output: UserDataResults[] | Record<string, never>;
  isLoading: boolean;
  searchText: string;
};

export type SearchComponent = {
  inputText: string;
};

export type QueryParams = {
  limit?: string;
  page?: string;
  search?: string;
};
