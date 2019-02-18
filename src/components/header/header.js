import React, { Component } from 'react'
import './style.css'
import logo from '../../assets/images/logo.svg';
import filter from '../../assets/images/filter-active.svg'

export default class Header extends Component {
    constructor(props){
      super(props);
        this.props = props;
    }
  render() {
      const {showButtons, children} = this.props;
    return (
      <div>
      <header>
        <img src={logo} className="logo" alt="logo" />
          {/* <svg src=logo className="logo"/> */}
          {showButtons ? (
            <span className='buttons'>
              <button className='button'>JOGS</button>
              <button className='button'>INFO</button>
              <button className='button'>CONTACT US</button>
              <img src={filter} className="filter" alt="logo" />
            </span>
          ):''}
      
      </header>
      
      {children? (<children/>):''}
</div>
    )
  }
}


