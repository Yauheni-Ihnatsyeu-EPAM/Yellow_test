import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import AppContainer from './services/navigation';
import Dashboard from './screens/dashboard';
import LoginScreen from './screens/login/login';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {screen: 'login'};
  }
  changeScreen = (screen, param) => {
    this.setState({screen, param})
  }
  render() {
    let Component;
    if(this.state.screen === 'login'){
      Component = (<LoginScreen changeScreen={this.changeScreen}/>);
    }
    else if(this.state.screen === 'dash')
    {Component = (<Dashboard changeScreen={this.changeScreen}/>);}
    else if(this.state.screen === 'edit')
    {Component = (<Dashboard item={this.state.param} changeScreen={this.changeScreen}/>);}
    else{
      Component = (<LoginScreen changeScreen={this.changeScreen}/>);
    }
    return (
      <div className="App">
       {Component}
      </div>
    );
  }
}

export default App;
