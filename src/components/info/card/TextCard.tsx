import React from 'react';
import { State, UserDataResults } from '../../../types/props.types';
import './TextCard.css';

class TextCard extends React.Component<UserDataResults, State> {
  constructor(props: UserDataResults) {
    super(props);
  }

  render() {
    return (
      <div className="textcard">
        <span>
          <b>Name: </b>
        </span>
        {this.props.name}
        <br />
        <span>
          <b>Manufacturer: </b>
        </span>
        {this.props.manufacturer}
        <br />
        <span>
          <b>Vehicle Class: </b>
        </span>
        {this.props.vehicle_class}
      </div>
    );
  }
}

export default TextCard;
