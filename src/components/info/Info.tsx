import React from 'react';
import Card from './Card';

import { EmptyProps } from '../../types/props.types';

interface Employment {
  key_skill: string;
  title: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: Coordinates;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  employment: Employment;
  address: Address;
}

interface State {
  output: UserData[] | Record<string, never>;
}

class Info extends React.Component<EmptyProps, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      output: [],
    } as State;
  }

  componentDidMount() {
    fetch('https://random-data-api.com/api/v2/users?size=12')
      .then((response) => response.json())
      .then((data: UserData[]) => {
        this.setState({ output: data });
        console.log(this.state.output);
      });
  }

  render() {
    const infoComponents = this.state.output.map((user) => (
      <Card
        key={user.id}
        first_name={user.first_name}
        last_name={user.last_name}
        employment={user.employment}
        address={user.address}
      />
    ));
    return <div>{infoComponents}</div>;
  }
}

export default Info;
