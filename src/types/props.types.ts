export type EmptyProps = Record<string, never>;

export type UserDataResults = {
  id?: number;
  name: string;
  manufacturer: string;
  vehicle_class: string;
};

export type UserData = {
  count: number;
  previous: string | null;
  next: string | null;
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
