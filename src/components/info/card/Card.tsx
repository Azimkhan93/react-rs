import React from 'react';
import TextCard from './TextCard';
import { UserData, State } from '../../../types/props.types';
import './Card.css';

class Card extends React.Component<UserData, State> {
  constructor(props: UserData) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <img className="avatar" src={this.props.avatar} />
        <TextCard
          first_name={this.props.first_name}
          last_name={this.props.last_name}
          employment={this.props.employment}
          address={this.props.address}
        />
      </div>
    );
  }
}

export default Card;
