import React, { Component } from 'react'
import Header from '../../components/header/header';
import bear from '../../assets/images/bear-face.svg'
import './style.css';
import api from '../../services/http/api';

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  getAuthToken = () => {
    let token
    api.post('auth/uuidLogin',{uuid: 'hello'})
    .then((response)=>
    {
      sessionStorage.setItem('token', `${response.response.token_type} ${response.response.access_token}`);
      this.props.changeScreen("dash");
    })
  }

  render() {
    return (
      <div>
        <Header></Header>
        <body className='body'>
          <div className="Reactangle">
          <img src={bear} className="logo" alt="logo" />
          <button className='login-button' onClick={()=> {this.getAuthToken()}}>
              Let me in
          </button>
          </div>
        </body>
        <footer/>
      </div>
    )
  }
}
