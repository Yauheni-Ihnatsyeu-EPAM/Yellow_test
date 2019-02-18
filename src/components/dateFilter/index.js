import React, { Component } from 'react'
import './style.css'

export default class DateFilter extends Component {
  render() {
    return (
      <div className='filter-wrapper'>
        <form>
          Date from <input type="text" name="fname" onChange={(event)=>this.props.changeMin(event.target.value)}/>
          Date to <input type="text" name="lname" onChange={(event)=> this.props.changeMax(event.target.value)}/>
        </form>
      </div>
    )
  }
}
