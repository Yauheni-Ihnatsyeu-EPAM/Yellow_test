import React, { Component } from 'react'
import Header from '../../components/header/header';
import bear from '../../assets/images/bear-face.svg'
import './style.css';
import api from '../../services/http/api';

export default class EditForm extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {time: props.time, distance: props.distance, date:props.date}
  }

  addItem = () =>{
    const {time, distance, date, id, user_id} = this.state;
    api.put('data/postV1DataJog', {time, distance, date, id, user_id} );
  }
  editItem = () =>{
    const {time, distance, date, id, user_id} = this.state;
    api.put('data/putV1DataJog', {time, distance, date, id, user_id} );
  }

  handleSubmit = (event) => {
    this.props.id ? this.addItem(): this.editItem();
    event.preventDefault();
  }


  render() {
    const { time, date, distance} =  this.state
    return (
      <div>
        <Header></Header>
        <body className='body'>
          <form className="Reactangle" onSubmit={()=>{this.props.changeScreen()}}>
          <span className='cancel' onClick={()=>{ this.props.changeScreen("edit", {});}}>x</span>
          
          First name:
        <input type="text" name="distance" value={distance} onChange={(event)=>this.setState({time: event.target.value})}/>
        <br/>
        Last name:
        <input type="text" name="lastname" value={time} onChange={(event)=>this.setState({time: event.target.value})}/>
        <br/><br/>

        Date:
        <input type="text" name="lastname" value={date} onChange={(event)=>this.setState({time: event.target.value})}/>
        <br/><br/>

        <input type="submit" value="Submit"/>

          </form>
        </body>
        <footer/>
      </div>
    )
  }
}
