import React from 'react';
// import { EmptyProps } from '../../types/props.types';

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
  first_name: string;
  last_name: string;
  employment: Employment;
  address: Address;
}

interface State {
  output: UserData | Record<string, never>;
}

class Card extends React.Component<UserData, State> {
  constructor(props: UserData) {
    super(props);
    // this.state = {
    //   output: {},
    // } as State;
  }

  // componentDidMount() {
  //   fetch('https://random-data-api.com/api/v2/users?size=2')
  //     .then((response) => response.json())
  //     .then((data: UserData) => {
  //       this.setState({ output: data });
  //       console.log(this.state.output);
  //     });
  // }

  render() {
    return (
      <div>
        <span>
          <b>Name: </b>
        </span>
        {this.props.first_name}
        &nbsp;
        {this.props.last_name}
        <br />
        <span>
          <b>Title: </b>
        </span>
        {this.props.employment?.title}
        <br />
        <span>
          <b>City: </b>
        </span>
        {this.props.address?.city}
        &nbsp;
      </div>
    );
  }
}

export default Card;
