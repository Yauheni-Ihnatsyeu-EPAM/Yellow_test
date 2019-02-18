import React, { Component } from 'react'
import icon from '../../../assets/images/icon.svg'
import moment from 'moment';
import Label from './label';

export default class ListItem extends Component {
  render() {
      const {id, distance, time,date } = this.props;
    return (
      <div className="item" onClick={this.props.onClick}>
        <img src={icon} className="icon" alt="logo" />
        <div className="column_label">
          <span>{moment(date).format('DDDD MMMM YYYY')}</span>
          <Label title="Speed: " value={Math.floor(distance/time)} />
          <Label title="Distance: " value={distance} />
          <Label title="Time: " value={moment(time).format('h:mm:ss')} />
        </div>
      </div>
    )
  }
}

