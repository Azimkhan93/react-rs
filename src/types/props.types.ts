export type EmptyProps = Record<string, never>;

type Employment = {
  key_skill: string;
  title: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type Address = {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: Coordinates;
};

export type UserData = {
  id?: number;
  avatar?: string;
  first_name: string;
  last_name: string;
  employment: Employment;
  address: Address;
};

export type State = {
  output: UserData | Record<string, never>;
};

export type StateArr = {
  output: UserData[] | Record<string, never>;
  isLoading: boolean;
};
