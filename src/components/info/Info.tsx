import React from 'react';
import Card from './card/Card';
import './Info.css';
import { EmptyProps, StateArr, UserData } from '../../types/props.types';
import Loader from './loader/Loader';

class Info extends React.Component<EmptyProps, StateArr> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      output: [],
      isLoading: false,
    } as StateArr;
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://random-data-api.com/api/v2/users?response_type=json&size=32')
      .then((response) => response.json())
      .then((data: UserData[]) => {
        this.setState({
          isLoading: false,
          output: data,
        });
        console.log(this.state.output);
      });
  }

  render() {
    const infoComponents = this.state.isLoading ? (
      <Loader />
    ) : (
      this.state.output.map((user) => (
        <Card
          key={user.id}
          avatar={user.avatar}
          first_name={user.first_name}
          last_name={user.last_name}
          employment={user.employment}
          address={user.address}
        />
      ))
    );
    return <div className="info-container">{infoComponents}</div>;
  }
}

export default Info;
