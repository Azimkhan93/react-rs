export type EmptyProps = Record<string, never>;

export type UserDataResults = {
  id?: number;
  name: string;
  manufacturer: string;
  vehicle_class: string;
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
};
