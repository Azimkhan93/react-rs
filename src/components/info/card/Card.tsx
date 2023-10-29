import React from 'react';
import TextCard from './TextCard';
import { State, UserDataResults } from '../../../types/props.types';
import './Card.css';

class Card extends React.Component<UserDataResults, State> {
  constructor(props: UserDataResults) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <TextCard
          name={this.props.name}
          manufacturer={this.props.manufacturer}
          vehicle_class={this.props.vehicle_class}
        />
      </div>
    );
  }
}

export default Card;
