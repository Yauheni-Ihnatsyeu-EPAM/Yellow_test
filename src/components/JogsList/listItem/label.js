import React, { Component } from 'react'
import './style.css';

export default class Label extends Component {
  render() {
      const {title, value} = this.props;
    return (
      <span>
         <strong className="value-title">{title}</strong>
         <label>{value}</label>
      </span>
    )
  }
}
