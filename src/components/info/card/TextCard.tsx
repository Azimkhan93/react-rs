import React from 'react';
import { UserData, State } from '../../../types/props.types';
import './TextCard.css';

class TextCard extends React.Component<UserData, State> {
  constructor(props: UserData) {
    super(props);
  }

  render() {
    return (
      <div className="textcard">
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
      </div>
    );
  }
}

export default TextCard;
